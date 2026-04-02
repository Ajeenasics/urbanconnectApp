const emppostjobschema = require("./EmpPostJobSchema");


const registerjob = (req, res) => {
  const work = new emppostjobschema({
    empId:req.body.empId,
    jobType:req.body.jobType,
    jobName:req.body.jobName,
    jobDetails:req.body.jobDetails,
    jobSalary:req.body.jobSalary,
    jobSalaryType:req.body.jobSalaryType

  });
  work
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Job Added Successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
        res.json({
            status:500,
            err:err
        })
    });
};

const viewEmpPostJobByEmpid=((req,res)=>{
  emppostjobschema.find({empId:req.params.id})
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Data get Successfully",
      data: data,
    });
  })
  .catch((err) => {
      res.json({
          status:500,
          err:err
      })
  });

})

const viewEmpPostJobById=((req,res)=>{
  emppostjobschema.findById({_id:req.params.id})
  .populate('empId')
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Data get Successfully",
      data: data,
    });
  })
  .catch((err) => {
      res.json({
          status:500,
          err:err
      })
  });

})




const viewAllEmpPostJob=((req,res)=>{
  emppostjobschema.find()
  .populate('empId')
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Data get Successfully",
      data: data,
    });
  })
  .catch((err) => {
    console.log(err);
      res.json({
          status:500,
          err:err
      })
  });

})

const acceptJobReqsById=async(req,res)=>{
  await emppostjobschema.findByIdAndUpdate({_id:req.params.id},{approveStatus:'accepted'})
  .exec()
  .then((data) => {
      res.json({
        status: 200,
        msg: "Job Accepted",
        data: data,
      });
    })
    .catch((err) => {
        res.json({
            status:500,
            err:err
        })
    });

}

module.exports={
  registerjob,
  viewEmpPostJobByEmpid,
  viewEmpPostJobById,
  viewAllEmpPostJob,
  acceptJobReqsById
}