import express from "express";
import EjsLayouts from "express-ejs-layouts";
import session from "express-session";
import UserController from "./src/Controllers/User.controller.js";
import jobController from "./src/Controllers/Jobs.controller.js"
import {upload} from './src/middleware/fileUploadmiddleware.js'
import path from "path";
import validate_user from "./src/middleware/sessionmiddleware.js";

import methodOverride from 'method-override';
const IsValidUser = new validate_user();
const userController = new UserController();
const jobControllers = new jobController();
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(path.resolve(),'src','public')))
app.use(EjsLayouts);
app.use(methodOverride('_method'));
app.use(session({
    secret:'tested',
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}));

// app.use(SessionMiddleWare);

app.set('view engine', 'ejs'); 
app.set('views',path.join(path.resolve(),'src','views'))


// routers
app.get('/',userController.getHome);
app.post('/register',userController.addUser);
app.get('/login',userController.getLoginPage);
app.post('/login',userController.loginUser);
app.post('/logout',userController.logOutUser);

//jobs
app.get('/jobs',jobControllers.getjobslist);
app.get('/jobs/:id',jobControllers.viewjob);
app.put('/jobs/:id',IsValidUser.checkuserExist,jobControllers.updatejob);
app.get('/jobs/update/:id',IsValidUser.checkuserExist,jobControllers.editjob);
app.delete('/jobs/:id',IsValidUser.checkuserExist,jobControllers.deleteJobById);

app.post('/jobs',IsValidUser.checkuserExist,jobControllers.addJob);
app.get('/postjobs',IsValidUser.checkuserExist,jobControllers.getpostNewjobPage);

//applicants
app.get('/jobs/:id/applicants',IsValidUser.checkuserExist,jobControllers.applicantpage);
// app.get('/jobs/:id/applicants/:id',IsValidUser.checkuserExist,jobControllers.getApplicantById);
// app.put('/jobs/:id/applicants/:id',IsValidUser.checkuserExist,jobControllers.deleteJobById);
 app.delete('/jobs/:id/applicants/:applicantId',IsValidUser.checkuserExist,jobControllers.deleteApplicantById);


app.post('/apply/:id',IsValidUser.checkuserExist, upload.single('file'), jobControllers.applyjob);

//404 page
app.get('/404', jobControllers.errorPage);

app.listen(7200);
console.log('server running at 7200')