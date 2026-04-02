const complaintschema=require('./ComplaintSchema')
const workerJobApprovalSchema =require ('../Jobrequest/workerJobApprovalSchema.js')

// customer Add Complaints

const customerAddComplaints = async (req,res)=>{
    
    const complaints= new complaintschema({
        workerId:req.params.id,
        customerId:req.body.customerId,
        subject:req.body.subject,
        against:'worker'
    })
    await workerJobApprovalSchema.findByIdAndUpdate(
        {
            _id:req.body.jobappid
        },
        {complaintstatus:true}
    )
    complaints.save()
    .then((data)=>{
        res.json({
            status:200,
            msg:"Complaint Registered Successfully",
            data:data
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            msg:"Something went Wrong",
            err:err
        })
    });

};

// Worker Add Complaints

const workerAddComplaints=((req,res)=>{
    const complaints= new complaintschema({
        customerId:req.params.id,
        workerId:req.body.workerId,
        subject:req.body.subject,
        against:'customer'
    })
    complaints.save()
    .then((data)=>{
        res.json({
            status:200,
            msg:"Complaint Registered Successfully",
            data:data
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            msg:"Something went Wrong",
            err:err
        })
    });

});

// view Worker By  Complaint Id

const viewComplaintByWorkerId=((req,res)=>{
    complaintschema.find({workerId:req.params.id,against:'worker'})
    .populate("customerId")
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
});
const viewComplaintByCustId=((req,res)=>{
    complaintschema.find({customerId:req.params.id,against:'customer'})
    .populate("workerId")
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
});

// view   Complaint By Id

const viewcomplaintById=((req,res)=>{
    complaintschema.findById({_id:req.params.id})
    .populate("customerId workerId")
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
});

// view all worker complaints to admin

const viewallworkercomplaintsinadmin=((req,res)=>{
    complaintschema.find({against:'customer'})
    .populate("customerId")
    .populate("workerId")
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

// view all customer complaints to admin

const viewallcustomercomplaintsinadmin=((req,res)=>{
    complaintschema.find({against:'worker'})
    .populate("customerId")
    .populate("workerId")
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
    customerAddComplaints,
    workerAddComplaints,
    viewComplaintByWorkerId,
    viewallworkercomplaintsinadmin,
    viewallcustomercomplaintsinadmin,
    viewcomplaintById,
    viewComplaintByCustId
}