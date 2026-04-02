const mongoose = require("mongoose");

const schema = mongoose.Schema({
  jobid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobrequests",
    required: true,
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workers",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
    required: true,
  },
  workDate: {
    type: String,
    required: true,
  },
  approvalstatus: {
    type: String,
    default: "pending",
    enum :["pending","accepted","completed","rejected"]
  },
  complaintstatus:{
    type:Boolean,
    default:false
  }
});
module.exports = mongoose.model("workerjobapprovals", schema);
