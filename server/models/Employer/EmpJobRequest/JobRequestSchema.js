const mongoose=require('mongoose')

const schema=mongoose.Schema({
    jobid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "empjobpost",
        required: true,
      },
      workerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workers",
        required: true,
      },
      empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employers",
      },
      approvalstatus: {
        type: String,
        default: "pending",
      },
      date:{
        type:Date,
        default:new Date()
      }
})

module.exports=mongoose.model("empjobrequest",schema)