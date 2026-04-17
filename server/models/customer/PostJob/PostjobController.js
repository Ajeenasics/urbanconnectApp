const jobreqschema = require("./PostjobSchema");


const registerjobreq = async (req, res) => {
  try {
    require('dotenv').config(); // Force load latest .env
    let aiPredictedPrice = "Estimate Not Available";

    // Call Gemini API if Key is present
    if (process.env.GEMINI_API_KEY) {
      const prompt = `You are a fair market price estimator for local handymen, tasks, and workers. 
      Provide a reasonable estimated price budget (in ₹ INR) for the following job request:
      Category: ${req.body.category || 'General'}
      Job Name: ${req.body.jobname || 'Task'}
      Details: ${req.body.workdetails || 'Various works'}
      Return ONLY the estimated price range or value (e.g., '₹500 - ₹1000' or '₹800') and absolutely no other text.`;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && data.candidates && data.candidates.length > 0) {
             aiPredictedPrice = data.candidates[0].content.parts[0].text.trim();
          }
        } else {
             const errData = await response.text();
             console.error("Gemini API HTTP Error:", response.status, errData);
             aiPredictedPrice = `Estimate Not Available - API Error ${response.status}`;
        }
      } catch (err) {
         console.error("Gemini Native Fetch Error:", err);
         aiPredictedPrice = "Estimate Not Available - Network Issue To Google API";
      }
    }

    const work = new jobreqschema({
      custid: req.body.custid,
      date: new Date(),
      category: req.body.category,
      jobname: req.body.jobname,
      workdetails: req.body.workdetails,
      aiprice: aiPredictedPrice
    });

    const data = await work.save();
    res.json({
      status: 200,
      msg: "Inserted Successfully",
      data: data,
    });
  } catch (err) {
    console.error("Error in registerjobreq:", err);
    res.json({
      status: 500,
      err: err
    });
  }
};

const viewjobreqs=((req,res)=>{
  jobreqschema.find({jobacceptstatus:"pending",category:req.params.category})
  .populate("custid")
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Data get Successfully",
      data: data,
    });
  })
  .catch((err) => {
      res.json({
          status:500,
          err:err
      })
  });

})

const viewalljobreqs=((req,res)=>{
  jobreqschema.find({custid:req.params.id})
  .populate("custid")
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Data get Successfully",
      data: data,
    });
  })
  .catch((err) => {
      res.json({
          status:500,
          err:err
      })
  });

})

const viewjobreqsbyid=((req,res)=>{
  jobreqschema.findById({_id:req.params.id})
  .populate("custid")
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Data get Successfully",
      data: data,
    });
  })
  .catch((err) => {
      res.json({
          status:500,
          err:err
      })
  });

})

const viewalljobpost=((req,res)=>{
  jobreqschema.find()
  .populate("custid")
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Data get Successfully",
      data: data,
    });
  })
  .catch((err) => {
      res.json({
          status:500,
          err:err
      })
  });

})

const acceptJobReqsById=async(req,res)=>{
  await jobreqschema.findByIdAndUpdate({_id:req.params.id},{jobacceptstatus:'accepted'})
  .exec()
  .then((data) => {
      res.json({
        status: 200,
        msg: "Work Accepted",
        data: data,
      });
    })
    .catch((err) => {
        res.json({
            status:500,
            err:err
        })
    });

}


// const workeracceptjob=((req,res)=>{
//   jobreqschema.findByIdAndUpdate({_id:req.params.id},{
//     workerid:req.body.workerid,
//     workdate:req.body.workdate,
//     jobreqstatus:"workeraccepted"
//   })
//   .populate("custid")
//   .exec()
//   .then((data) => {
//     res.json({
//       status: 200,
//       msg: "Data get Successfully",
//       data: data,
//     });
//   })
//   .catch((err) => {
//       res.json({
//           status:500,
//           err:err
//       })
//   });

// })

// const workeracceptjob = async (req, res) => {
//   try {
//     const jobRequest = await jobreqschema.findById(req.params.id);

//     if (!jobRequest) {
//       return res.status(404).json({
//         status: 404,
//         msg: "Job request not found",
//       });
//     }

//     const existingWorker = jobRequest.workers.find(
//       (worker) => worker.workerId.toString() === req.body.workerId
//     );

//     if (!existingWorker) {
//       jobRequest.workers.push({
//         workerId: req.body.workerid,
//         workDate: req.body.workDate,
//       });
//       jobRequest.jobReqStatus = "workeraccepted"; 
//     }

//     const updatedJobRequest = await jobRequest.save();
//     res.status(200).json({
//       status: 200,
//       msg: "Worker applied successfully",
//       data: updatedJobRequest,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 500,
//       err: err.message,
//     });
//   }
// };

// const workeracceptjob=((req,res)=>{
//     jobreqschema.save({workerId:req.body.workerid, workDate: req.body.workDate})


// })

const viewjobreqsbyuserid=((req,res)=>{
  jobreqschema.find({custid:req.params.id})
  // .populate("workers.workerId")
  .exec()
  .then((data) => {
    res.json({
      status: 200,
      msg: "Data get Successfully",
      data: data,
    });
  })
  .catch((err) => {
      res.json({
          status:500,
          err:err
      })
  });

})


module.exports={
    registerjobreq,
    viewjobreqs,
    viewjobreqsbyid,
    viewjobreqsbyuserid,
    viewalljobreqs,
    viewalljobpost,
    acceptJobReqsById
}