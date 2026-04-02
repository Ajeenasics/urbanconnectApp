const mongoose= require("mongoose");

const schema=mongoose.Schema({
    custid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true,
    },
    jobname:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    workdetails:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    
    jobacceptstatus:{
        type:String,
        default:"pending",
        enum:["pending","accepted"]
    },

   
    });
module.exports = mongoose.model('jobrequests', schema);

