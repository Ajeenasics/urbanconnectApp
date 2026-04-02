const mongoose=require('mongoose')

const schema= mongoose.Schema({
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
    reviews: {
        type: String,
        required: true,
    },
})

module.exports=mongoose.model("CustomerReviews",schema)