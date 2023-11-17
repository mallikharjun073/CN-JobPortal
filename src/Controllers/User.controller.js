import Users from "../Models/User.model.js";
export default  class UserController{

    getHome(req,res){
        const UserEmail = req.session.UserEmail;
        res.render('home', {UserEmail});
    }
    getLoginPage(req,res){
        const UserEmail = req.session.UserEmail;
        if(req.session && req.session.UserEmail){
            res.redirect('/');
        }else{
            res.render('login',{UserEmail});
        }
        
    }
    addUser(req,res){
        const UserEmail = req.session.UserEmail;
        let isAuth = Users.add(req.body);
        if(isAuth){
            res.redirect('/login')
        }else{
            res.send('failed');
        }
    }
    loginUser(req,res){
        const UserEmail = req.session.UserEmail;
        const {email, password} = req.body;
        let isAuth = Users.checkUser(email,password);
        if(isAuth){
            req.session.UserEmail = email; 
            res.redirect('/')
        }else{
            res.redirect('/login')
        }
    }
    logOutUser(req,res){
        req.session.destroy((err) =>{
            if(err){
                res.redirect('/')
            }else{
                res.redirect('login')
            }
        })
    }

}