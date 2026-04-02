const workstatusschema = require("./workStatusSchema.js");
const customerSchema = require('../../customer/customerSchema.js')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'supprot.web.application@gmail.com',
    pass: 'ukyw olqq kuql jnty'
  }
});

const sendMail = (toMail, otp, payment) => {
  let email = toMail
  const mailOptions = {
    from: 'supprot.web.application@gmail.com',
    to: email,
    subject: 'OTP Verification From quick to click',
    text: `Dear Customer ,${'\n'}

Thank you for choosing our service.

To complete your work verification and proceed with the payment, please use the following One-Time Password (OTP):${'\n'}

Your OTP is:  ${otp}${'\n'}
Amount Payable : ${payment}

Please do not share this OTP with anyone for security reasons.

If you did not request this OTP, please contact our support team immediately.

Thank you for your cooperation${'\n'}
Best regards,${'\n'}
quick to click Collar Team`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}



const addworkstatus = async (req, res) => {
  let custData = await customerSchema.findById(req.body.customerId)
  const workstatus = new workstatusschema({
    jobid: req.params.id,
    workerId: req.body.workerId,
    customerId: req.body.customerId,
    status: 'pending',
    payment: req.body.payment,
    otp: req.body.otp,
    date:new Date()


  });
  let otp1= await workstatusschema.findOne({customerId:custData._id,jobid:req.params.id})
  console.log(otp1);
  if(otp1){
    return res.json({
      status:400,
      msg:'Payment Already Send'
    })
  }
  await workstatus
    .save()
    .then((data) => {
      sendMail(custData.email, req.body.otp, req.body.payment)

      res.json({
        status: 200,
        msg: "Payment Requested",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        err: err
      })
    });
};



const OTPVerification = async (req, res) => {
  console.log(req.body, "body");

  try {
    const data = await workstatusschema.findOne({
      jobid: req.body.jobid,
      customerId: req.body.customerId,
    });

    if (!data) {
      return res.json({
        status: 404,
        msg: "No matching job found",
      });
    }

    if (data.otp == req.body.otp) {
      if (data.payment == req.body.payment) {
        return res.json({
          status: 200,
          msg: "OTP and Payment is Verified",
          data: data,
        });
      } else {
        return res.json({
          status: 405,
          msg: "Payment Amount did not Match !!",
        });
      }
    } else {
      return res.json({
        status: 405,
        msg: "OTP did not Match !!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: 500,
      msg: "Internal Server Error !!",
    });
  }
};



const updatePaymentStatus= async (req, res) => {
  workstatusschema.findByIdAndUpdate({ _id:req.params.id},{
    paymentStatus:true,status:'Paid'
  })
  .then(data=>{

console.log("data",data);
     return  res.json({
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


const viewCountCompletedWorksByWorkerId= async (req, res) => {
  workstatusschema.find({workerId:req.params.id})
  .populate('jobid')
  .populate('customerId')
  .then(data=>{
    if(data.length>0){
     return  res.json({
         status: 200,
         msg: "Retrieved Successfully",
         data:data.length
         
       });
      }
      else{
        return  res.json({
          status: 200,
          msg: "Retrieved Successfully",
          data:0
          
        });
      }
     })
 .catch((err) => {
   console.log(err);
   res.json({
     status: 500,
       msg: "Internal Error !!"
   })
 })

}

const viewCompletedWorksByWorkerId= async (req, res) => {
  workstatusschema.find({workerId:req.params.id})
  .populate('jobid')
  .populate('customerId')
  .then(data=>{
     return  res.json({
         status: 200,
         msg: "Retrieved Successfully",
         data:data
         
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

const viewWorksamountById= async (req, res) => {
  workstatusschema.findById(req.params.id)
  .then(data=>{
     return  res.json({
         status: 200,
         msg: "Retrieved Successfully",
         data:data
         
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


const viewAllWorkStatus= async (req, res) => {
  workstatusschema.find()
  .populate('jobid')
  .populate('customerId')
  .populate('workerId')
  .then(data=>{
     return  res.json({
         status: 200,
         msg: "Retrieved Successfully",
         data:data
         
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


module.exports = {
  addworkstatus,
  OTPVerification,
  updatePaymentStatus,
  viewCompletedWorksByWorkerId,
  viewWorksamountById,
  viewCountCompletedWorksByWorkerId,
  viewAllWorkStatus
}