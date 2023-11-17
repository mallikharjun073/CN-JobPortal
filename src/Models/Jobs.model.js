export default class jobsModel{
    constructor(jobId,jobcategory,jobdesignation,location,companyname,salary,applyby,skillsrequired,numberofopenings,jobposted){
        this.id = jobId;
        this.jobcategory = jobcategory;
        this.jobdesignation = jobdesignation;
        this.location = location;
        this.companyname = companyname;
        this.salary = salary;
        this.applyby = applyby;
        this.skillsrequired  = skillsrequired;
        this.numberofopenings = numberofopenings;
        this.jobposted = jobposted;
        this.applicants = [];    
    }

    static add(jobObj){
        let currentDate = new Date(Date.now());
        let formattedDate = currentDate.toLocaleString();
        if (jobObj && typeof jobObj === 'object') {
            let insertjobObj = new jobsModel(
                jobslist.length+1,
                jobObj.job_category,
                jobObj.job_designation,
                jobObj.job_location,
                jobObj.company_name,
                jobObj.salary,
                jobObj.apply_by,
                jobObj.skills_required,
                jobObj.number_of_openings,
                formattedDate,
                );
                jobslist.push(insertjobObj); 
            }else{
                console.error("Invalid job object. Unable to add.");
            }
    }
    static get(){
        return jobslist;
    }

    static getJobById(id){
        let JobDetails = jobslist.find((job)=>{
            return job.id == id;
        });
        return JobDetails;
    }

    static updateJobById(id,updatedValues){

        let jobToUpdate = jobslist.find((job)=>{
                return job.id == id;
            });
        if(jobToUpdate){
            jobToUpdate.jobcategory = updatedValues.job_category || jobToUpdate.jobcategory;
            jobToUpdate.jobdesignation = updatedValues.job_designation || jobToUpdate.jobdesignation;
            jobToUpdate.location = updatedValues.job_location || jobToUpdate.location;
            jobToUpdate.companyname = updatedValues.company_name || jobToUpdate.companyname;
            jobToUpdate.salary = updatedValues.salary || jobToUpdate.salary;
            jobToUpdate.applyby = updatedValues.apply_by || jobToUpdate.applyby;
            jobToUpdate.skillsrequired = updatedValues.skills_required || jobToUpdate.skillsrequired;
            jobToUpdate.numberofopenings = updatedValues.number_of_openings || jobToUpdate.numberofopenings;
        }
        return true;
  
    }
    static deleteJobById(id) {
        const indexToRemove = jobslist.findIndex((job) =>{ return  job.id == id });
    
        if (indexToRemove !== -1) {
          jobslist.splice(indexToRemove, 1); 
        } 
      }

      
    static updateAplicant(appData,id){
        let jobToUpdate = jobslist.find((job)=>{
            return job.id == id;
        });

        if(jobToUpdate){
            jobToUpdate.applicants.push(appData);
        }

        return true;
    }

    static getapplicantByJobId(jobId, applicantId){
        let JobIndex = jobslist.findIndex((job)=>{
            return job.id == jobId;
        });
        let applicantIndex = jobslist[JobIndex].applicants.findIndex((applicant)=>{
            return applicant.applicantid == applicantId
        });
           
        if(applicantIndex != -1){
           jobslist[JobIndex].applicants.splice(applicantIndex,1);
        }
        return true;
    }
}


const jobslist = [];