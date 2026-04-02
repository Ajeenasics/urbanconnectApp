const mongoose = require("mongoose");

const schema = mongoose.Schema({
  
    empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employer",
    },
    jobType: {
        type: String,
        required: true,
    },
    jobName: {
        type: String,
        required: true,
    },
    jobDetails: {
        type: String,
        required: true,
    },
    jobSalary: {
        type: Number,
        required: true,
    },
    jobSalaryType:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date(),
        required:true
    },
    approveStatus:{
        type:String,
        default:'pending'
    }

});
module.exports = mongoose.model("empjobpost", schema);
