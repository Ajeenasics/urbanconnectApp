const jobreqschema = require("./PostjobSchema");


const registerjobreq = (req, res) => {
  const work = new jobreqschema({
    custid:req.body.custid,
    date:new Date(),
    category:req.body.category,
    jobname:req.body.jobname,
    workdetails:req.body.workdetails,

  });
  work
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted Successfully",
        data: data,
      });
    })
    .catch((err) => {
        res.json({
            status:500,
            err:err
        })
    });
};

const viewjobreqs=((req,res)=>{
  jobreqschema.find({jobacceptstatus:"pending",category:req.params.category})
  .populate("custid")
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

const viewalljobreqs=((req,res)=>{
  jobreqschema.find({custid:req.params.id})
  .populate("custid")
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

const viewjobreqsbyid=((req,res)=>{
  jobreqschema.findById({_id:req.params.id})
  .populate("custid")
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

const viewalljobpost=((req,res)=>{
  jobreqschema.find()
  .populate("custid")
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

const acceptJobReqsById=async(req,res)=>{
  await jobreqschema.findByIdAndUpdate({_id:req.params.id},{jobacceptstatus:'accepted'})
  .exec()
  .then((data) => {
      res.json({
        status: 200,
        msg: "Work Accepted",
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


// const workeracceptjob=((req,res)=>{
//   jobreqschema.findByIdAndUpdate({_id:req.params.id},{
//     workerid:req.body.workerid,
//     workdate:req.body.workdate,
//     jobreqstatus:"workeraccepted"
//   })
//   .populate("custid")
//   .exec()
//   .then((data) => {
//     res.json({
//       status: 200,
//       msg: "Data get Successfully",
//       data: data,
//     });
//   })
//   .catch((err) => {
//       res.json({
//           status:500,
//           err:err
//       })
//   });

// })

// const workeracceptjob = async (req, res) => {
//   try {
//     const jobRequest = await jobreqschema.findById(req.params.id);

//     if (!jobRequest) {
//       return res.status(404).json({
//         status: 404,
//         msg: "Job request not found",
//       });
//     }

//     const existingWorker = jobRequest.workers.find(
//       (worker) => worker.workerId.toString() === req.body.workerId
//     );

//     if (!existingWorker) {
//       jobRequest.workers.push({
//         workerId: req.body.workerid,
//         workDate: req.body.workDate,
//       });
//       jobRequest.jobReqStatus = "workeraccepted"; 
//     }

//     const updatedJobRequest = await jobRequest.save();
//     res.status(200).json({
//       status: 200,
//       msg: "Worker applied successfully",
//       data: updatedJobRequest,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 500,
//       err: err.message,
//     });
//   }
// };

// const workeracceptjob=((req,res)=>{
//     jobreqschema.save({workerId:req.body.workerid, workDate: req.body.workDate})


// })

const viewjobreqsbyuserid=((req,res)=>{
  jobreqschema.find({custid:req.params.id})
  // .populate("workers.workerId")
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


module.exports={
    registerjobreq,
    viewjobreqs,
    viewjobreqsbyid,
    viewjobreqsbyuserid,
    viewalljobreqs,
    viewalljobpost,
    acceptJobReqsById
}