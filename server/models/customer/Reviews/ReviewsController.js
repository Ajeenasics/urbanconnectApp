const ReviewsSchema = require("./ReviewsSchema");

const addReviews=(req,res)=>{
    const review=new ReviewsSchema({
        workerId:req.body.workerId,
        customerId:req.body.customerId,
        reviews:req.body.reviews
    })
    review.save()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Review Add Successfully',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:'Review Not Added',
            err:err
        })
    })
}

const viewallreviews=(req,res)=>{
    ReviewsSchema.find()
    .populate('workerId')
    .exec()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Data obtained ',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:' Not Obtained',
            err:err
        })
    })
}

const viewsortreviews=(req,res)=>{
    ReviewsSchema.find().sort(-1)
    .exec()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Data obtained ',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:' Not Obtained',
            err:err
        })
    })
}




module.exports={
    addReviews,
    viewallreviews,
    viewsortreviews
}