export default class validate_user{

    checkuserExist(req,res,next){
        if(req.session.UserEmail){
            next();
           
        }else{
            res.redirect('/404')
        }
    }

}