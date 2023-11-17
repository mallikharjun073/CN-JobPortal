import jobsModel from '../Models/Jobs.model.js';
import Applicants from '../Models/Applicant.model.js';
export default class jobController{
    addJob(req,res){
        jobsModel.add(req.body);
        res.redirect('/jobs')
    }

    getjobslist(req, res){
        const UserEmail = req.session.UserEmail;
        const list = jobsModel.get();
        res.render('jobs',{list : list, UserEmail});
    }
    getpostNewjobPage(req,res){
        const UserEmail = req.session.UserEmail;
        if(req.session.UserEmail){
            res.render('postnewjobs',{UserEmail});
        }else{
            res.render('unautharized',{UserEmail})
        }
        
    }
    viewjob(req,res){ 
        const UserEmail = req.session.UserEmail;
        let job = jobsModel.getJobById(req.params.id);
        res.render('viewjob',{job,UserEmail});
    }
    editjob(req,res){
        const UserEmail = req.session.UserEmail;
        let job = jobsModel.getJobById(req.params.id); 
        res.render('updatejob',{job,UserEmail});
    }
    updatejob(req,res){
        let job = jobsModel.updateJobById(req.params.id,req.body)
        res.redirect('/jobs');
    }
    deleteJobById(req,res){
        jobsModel.deleteJobById(req.params.id);
        res.redirect('/jobs');
    }
    applyjob(req,res){
        const fileName = req.file.originalname;
        const applicantData = Applicants.addApplicant(req.body,fileName);
        jobsModel.updateAplicant(applicantData,req.params.id);
        res.redirect('/jobs');

    }

    applicantpage(req,res){ 
        const UserEmail = req.session.UserEmail;
        let applicant = jobsModel.getJobById(req.params.id); 
        res.render('applicants',{applicant,UserEmail})
    }
    deleteApplicantById(req,res){
        jobsModel.getapplicantByJobId(req.params.id,req.params.applicantId);
        res.redirect('/jobs/'+req.params.id+'/applicants');
    }

    errorPage(req,res){
        const UserEmail = req.session.UserEmail;
        res.render('error',{UserEmail});
    }
}