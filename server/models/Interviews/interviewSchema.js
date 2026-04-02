const mongoose = require("mongoose");

const schema = mongoose.Schema({

  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workers",
    required: true,
  },
  jobRequestId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "empjobrequest",
    required: true,
  },
  jobid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "empjobpost",
    required: true,
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employer",
  },
  interview_date:{
    type: Date,
    required: true,
  },
  interview_location:{
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  state:{
    type: String,
    required: true,
  },
  status:{
    type:String,
    default:'pending'
  }

});
module.exports = mongoose.model("interviews", schema);
