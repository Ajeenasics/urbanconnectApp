const Interview = require('./interviewSchema.js'); // Update the path to your Interview schema
const JobRequest = require('../Employer/EmpJobRequest/JobRequestSchema'); // Update the path to your JobRequest schema
const emppostjob=require('../Employer/EmpPostJob/EmpPostJobSchema.js')
// Create an Interview
const createInterview = async (req, res) => {
    try {
        const {  jobRequestId, interview_date, interview_location, city, state } = req.body;

        // Check if the Job Request exists
        const jobRequest = await JobRequest.findById(jobRequestId);
      

        const interview = new Interview({
            workerId:req.params.id,
            jobRequestId,
            empId:jobRequest.empId,
            jobid:jobRequest.jobid,
            interview_date,
            interview_location,
            city,
            state
        });
        const exInterview = await Interview.findOne({jobRequestId:jobRequestId,workerId:req.params.id});

if(exInterview){
    return res.json({
         status: 400,
         msg: 'Interview Already  Scheduled',
     });
 }      await JobRequest.findByIdAndUpdate({_id:jobRequest._id},{approvalstatus:'accepted'})
        await emppostjob.findByIdAndUpdate({_id:jobRequest.jobid},{approveStatus:'accepted'})
        const data = await interview.save();
        res.json({
            status: 200,
            msg: 'Interview Created Successfully',
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: 500,
            msg:'Data not Inserted',
            err: err
        });
    }
};

// View Interviews by Worker ID
const viewInterviewsByWorkerId = (req, res) => {
    Interview.find({ workerId: req.params.id })
        .populate("workerId")
        .populate("jobRequestId")
        .populate("empId")
        .populate("jobid")
        .exec()
        .then((data) => {
            res.json({
                status: 200,
                msg: "Interviews Obtained Successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 500,
                err: err
            });
        });
};

// View Interviews by Employer ID
const viewInterviewsByEmpId = (req, res) => {
    Interview.find({ empId: req.params.id,status:'pending' })
        .populate("workerId")
        .populate("jobRequestId")
        .populate("empId")
        .populate("jobid")
        .exec()
        .then((data) => {
           res.json({
                status: 200,
                msg: "Interviews Obtained Successfully",
                data: data,
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                err: err
            });
        });
};

// View Interview by Job Request ID
const viewInterviewByJobRequestId = async(req, res) => {
    Interview.find({ jobRequestId: req.params.id })
        .populate("workerId")
        .populate("jobRequestId")
        .populate("empId")
        .exec()
        .then((data) => {
            res.json({
                status: 200,
                msg: "Interview Obtained Successfully",
                data: data,
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                err: err
            });
        });
};

// View Interview by Job Request ID
const viewInterviewById = (req, res) => {
    Interview.findById({_id:req.params.id})
        .populate("workerId")
        .populate("jobRequestId")
        .populate("empId")
        .populate("jobid")
        .exec()
        .then((data) => {
            res.json({
                status: 200,
                msg: "Interview Obtained Successfully",
                data: data,
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                err: err
            });
        });
};

// update interview status 

const updateinterviewStatusSelected= async (req, res) => {
    Interview.findByIdAndUpdate({ _id:req.params.id},{
      status:'Selected'
    })
    .exec()
    .then(data=>{
        console.log("data",data);
        res.json({
        status: 200,
        msg: "Updated Successfully"
           
         });
    })
   .catch((err) => {
     console.log(err);
        res.json({
        status: 500,
         msg: "Internal Error !!"
     })
   })
  
  }

  // delete interview status 

const updateinterviewStatusRejected= async (req, res) => {
    Interview.findByIdAndUpdate({ _id:req.params.id},{
        status:'Rejected'
    })
    .then(data=>{
  
  console.log("data",data);
       return  res.json({
           status: 200,
           msg: "Rejected Successfully"
           
         });
    })
   .catch((err) => {
     console.log(err);
     res.json({
       status: 500,
         msg: "Internal Error !!"
     })
   })
  
  }

  // View Selected Cand by Employer ID
const viewSelectedCandByEmpId = (req, res) => {
    Interview.find({ empId: req.params.id ,status:'Selected'})
        .populate("workerId")
        .populate("jobRequestId")
        .populate("empId")
        .populate("jobid")
        .exec()
        .then((data) => {
           res.json({
                status: 200,
                msg: "Interviews Obtained Successfully",
                data: data,
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                err: err
            });
        });
};

// View Rejected Cand by Employer ID

const viewRejectedCandByEmpId = (req, res) => {
    Interview.find({ empId: req.params.id , status:'Rejected'})
        .populate("workerId")
        .populate("jobRequestId")
        .populate("empId")
        .populate("jobid")
        .exec()
        .then((data) => {
           res.json({
                status: 200,
                msg: "Interviews Obtained Successfully",
                data: data,
            });
        })
        .catch((err) => {
            res.json({
                status: 500,
                err: err
            });
        });
};


module.exports = {
    createInterview,
    viewInterviewsByWorkerId,
    viewInterviewsByEmpId,
    viewInterviewByJobRequestId,
    viewInterviewById,
    updateinterviewStatusSelected,
    updateinterviewStatusRejected,
    viewSelectedCandByEmpId,
    viewRejectedCandByEmpId,

};
