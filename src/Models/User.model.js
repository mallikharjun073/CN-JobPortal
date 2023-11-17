export default class User{
    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static add(userObj){
        let test  = typeof(userObj);
        if(userObj){
            users.push(userObj);
            return true
        }else{
            return false
        }
            
    }
    static get(){
        return users;
    }
    static checkUser(email,password){
        let isValid = users.find(function(user){
            return user.email == email && user.password == password
        });
        return isValid;
    }
} 

var users = [];
