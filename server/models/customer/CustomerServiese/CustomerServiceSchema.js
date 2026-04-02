const mongoose = require("mongoose");

const schema = mongoose.Schema({
  custid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
    required: true,
  },
  workerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workers",
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
    enum:["Pending","Accept","Complete","Reject"]
  },
  date: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("servicerequests", schema);
