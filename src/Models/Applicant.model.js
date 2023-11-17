export default class Applicants{
    constructor(ac_id,name,email,contact,resume){
        this.applicantid = ac_id,
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resumePath = resume
    }

    static addApplicant(appObj,filepath){ 
        if (appObj && typeof appObj === 'object') {
            let AddappArray = new Applicants(
                applicantsArray.length+1,
                appObj.name,
                appObj.email,
                appObj.contact,
                filepath,
                );
                applicantsArray.push(AddappArray);
               
                const last_inserted = applicantsArray.find((applicant)=>{
                    return applicant.applicantid == applicantsArray.length;
                });
                return last_inserted;
            }else{
                console.error("Invalid job object. Unable to add.");
            }
        // applicantsArray.push(...appObj,{applicantid:applicantsArray.length+1,resumePath : filepath});
    }
    static getApplicant(){
        return applicantsArray;
    }

    
}
var applicantsArray = [];