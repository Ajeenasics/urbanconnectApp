const empjobreqschema =require('./JobRequestSchema.js')

const empjobrequest =async (req,res)=>{
    let datas =await empjobreqschema.findOne({jobid:req.params.id,workerId:req.body.workerId})

    if (datas){
        return res.json({
            status:400,
            msg:'You have already applied for this job'
        });

    }
    const work =new empjobreqschema({
        jobid:req.params.id,
        workerId:req.body.workerId,
        empId:req.body.empId,
    });
    await work
    .save()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Job Requested Successfully',
            data:data,
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            err:err
        })
    })
}

// View job req to employee

const viewReqsbyempid=(req,res)=>{
    empjobreqschema.find({empId:req.params.id},{approvalstatus:'pending'})
    .populate("jobid")
    .populate("workerId")
    .exec()
    .then((data) => {
        res.json({
          status: 200,
          msg: "Obtained Successfully",
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
  
}

// View Job req by Job id

const viewEmpJobReqsbyJobid=(req,res)=>{
    empjobreqschema.find({jobid:req.params.id})
    .populate("workerId")
    .populate("jobid")
    .exec()
    .then((data) => {
        res.json({
          status: 200,
          msg: "Obtained Successfully",
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

const viewAllEmpJobReqs=(req,res)=>{
    empjobreqschema.find()
    .populate("jobid")
    .populate("empId")
    .exec()
    .then((data) => {
        res.json({
          status: 200,
          msg: "Obtained Successfully",
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

const removeEmpJobReqById=((req,res)=>{
    empjobreqschema.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data Removed Successfully",
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


module.exports={
    empjobrequest,
    viewReqsbyempid,
    viewEmpJobReqsbyJobid,
    removeEmpJobReqById,
    viewAllEmpJobReqs
}