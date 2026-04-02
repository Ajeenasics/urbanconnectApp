const mongoose =require('mongoose')

const schema=new mongoose.Schema({
    workerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"workers",
        required:true
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customers",
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    against:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Complaints",schema)