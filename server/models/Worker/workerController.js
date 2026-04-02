const workerschema = require("./workerSchema")
// const multer=require ("multer")
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret_key"
const customer = require("../customer/customerSchema")
const employer = require("../Employer/employerSchema")



// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//       cb(null, "./upload");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });

//   const upload = multer({ storage: storage }).single("image");

//   const registerworker = async(req, res) => {
//     const workers = new workerschema({
//       name: req.body.name,
//       workertype:req.body.workertype,
//       address:req.body.address,
//       location:req.body.location,
//       city:req.body.city,
//       state:req.body.state,
//       district:req.body.district,
//       contact: req.body.contact,
//       email: req.body.email,
//       password: req.body.password,
//       image: req.file,
//     });
//     let existingCustomer1 = await workerschema.findOne({email:req.body.email});
//     let existingCustomer2 = await customer.findOne({email:req.body.email});
//     let existingCustomer3 = await employer.findOne({email:req.body.email})

//     if(existingCustomer1||existingCustomer2 || existingCustomer3){
//         return res.json ({
//             status : 409,
//             msg : "Email Already Registered With Us !!",
//             data : null
//         })
//     }

//     workers
//       .save()
//       .then((data) => {
//         res.json({
//           status: 200,
//           msg: "Inserted Successfully",
//           data: data,
//         });
//       })
//       .catch((err) => {
//         if (err.code === 11000) {
//           let errMsg = "Data not Inserted";
//           if (err.keyPattern.hasOwnProperty("contact")) {
//             errMsg = "Contact already in Use";
//           } else if (err.keyPattern.hasOwnProperty("email")) {
//             errMsg = "Email Id already in Use";
//           } 
//           return res.status(409).json({
//             status: 409,
//             msg: errMsg,
//             Error: err,
//           });
//         }
//         res.status(500).json({
//           status: 500,
//           msg: "Data not Inserted",
//           Error: err,
//         });
//       });
//   };
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "document", maxCount: 1 },
]);


const registerworker = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ status: 500, msg: "File upload error", error: err });
    }

    // Check if required files are present
    const imageFile = req.files?.image?.[0] || null;
    const documentFile = req.files?.document?.[0] || null;

    const workers = new workerschema({
      name: req.body.name,
      workertype: req.body.workertype,
      address: req.body.address,
      location: req.body.location,
      city: req.body.city,
      state: req.body.state,
      district: req.body.district,
      contact: req.body.contact,
      email: req.body.email,
      password: req.body.password,
      image: imageFile,
      document: documentFile,
    });

    let existingCustomer1 = await workerschema.findOne({ email: req.body.email });
    let existingCustomer2 = await customer.findOne({ email: req.body.email });
    let existingCustomer3 = await employer.findOne({ email: req.body.email });

    if (existingCustomer1 || existingCustomer2 || existingCustomer3) {
      return res.json({
        status: 409,
        msg: "Email Already Registered With Us !!",
        data: null,
      });
    }

    workers
      .save()
      .then((data) => {
        res.json({
          status: 200,
          msg: "Inserted Successfully",
          data: data,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          let errMsg = "Data not Inserted";
          if (err.keyPattern.hasOwnProperty("contact")) {
            errMsg = "Contact already in Use";
          } else if (err.keyPattern.hasOwnProperty("email")) {
            errMsg = "Email Id already in Use";
          }
          return res.status(409).json({
            status: 409,
            msg: errMsg,
            Error: err,
          });
        }
        res.status(500).json({
          status: 500,
          msg: "Data not Inserted",
          Error: err,
        });
      });
  });
};


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  console.log("t1", token);
  console.log("secret", secret);
  if (!token) {
    return res.json({ status: 401, msg: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.json({ status: 401, messagge: 'Unauthorized', err: err });
    }

    req.user = decodedToken.userId;
    next();
    return res.json({ status: 200, msg: 'ok', user: decodedToken.userId });
  });
  console.log(req.user);
};
//token decode api

const workerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await workerschema.findOne({ email: email });

    if (user) {
      if (user.adminapprove === false || user.isactive === false) {
        return res.json({
          status: 403,
          msg: "User is not active. Please contact administrator.",
        });
      }
      else if (user.password === password) {
        const token = jwt.sign(
          { email: user.email, password: user.password },
          process.env.JWT_SECRET || "secret_key",
          { expiresIn: 86400 }
        );
        return res.json({
          status: 200,
          msg: "Login Successfully", token, id: user._id
        })
      }
      else {
        return res.json({ status: 401, message: "Password error" });
      }
    } else {
      return res.json({ status: 404, message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const workerresetpswd = ((req, res) => {
  workerschema.findByIdAndUpdate({ _id: req.params.id }, { password: req.body.password }
  )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });

})

const viewallworkersByLocation = (req, res) => {
  const { location } = req.body;

  workerschema.find({
    adminapprove: true,
    isactive: true,
    district: district // Filter by location
  })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          data: data,
          msg: "Data successfully fetched"
        });
      } else {
        res.json({
          status: 404,
          msg: "No workers found in your area"
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: err
      });
    });
};


const updateworkerprofile = (req, res) => {
  let updateData = {
    name: req.body.name,
    workertype: req.body.workertype,
    address: req.body.address,
    location: req.body.location,
    city: req.body.city,
    contact: req.body.contact,
    email: req.body.email,
  };

  if (req.body.password) {
    updateData.password = req.body.password;
  }

  if (req.files && req.files.image && req.files.image[0]) {
    updateData.image = req.files.image[0];
  } else if (req.file) {
    updateData.image = req.file;
  }

  workerschema.findByIdAndUpdate({ _id: req.params.id }, updateData, { new: true })
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        msg: "updated successfully",
        data: response
      })
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "error", err
      })
      console.log(err);
    })

}

const viewallworker = ((req, res) => {
  workerschema.find({ adminapprove: true, isactive: true })
    .exec()
    .then((data) => {
      if (data !== null) {
        res.json({
          status: 200,
          data: data,
          msg: "Data successfully get"
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: err
      })
    })
})

const viewworkerpendingreq = ((req, res) => {
  workerschema.find({ adminapprove: false })
    .exec()
    .then((data) => {
      if (data !== null) {
        res.json({
          status: 200,
          data: data,
          msg: "Data successfully get"
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: err
      })
    })
})


const viewworkerbyid = (req, res) => {
  workerschema
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "Worker not found" });
      }
      res.json({
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      console.error("Error finding Worker by ID:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

const deleteworkerById = async (req, res) => {
  await workerschema.findByIdAndDelete({ _id: req.params.id }).exec()
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: 'data deleted'
      })
    })
    .catch(err => {
      res.json({
        status: 500,
        msg: 'Error in API',
        err: err
      })
    })

}

const viewworkerreq = ((req, res) => {
  workerschema.find({ adminapprove: false })
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        data: result
      })
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 404,
        err: err
      })
    })
})
const approveworkerid = async (req, res) => {
  await workerschema.findByIdAndUpdate({ _id: req.params.id }, { adminapprove: true }).exec()
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: 'Accepted'
      })
    })
    .catch(err => {
      res.json({
        status: 500,
        msg: 'Error in API',
        err: err
      })
    })

}
const rejectworkerbyid = async (req, res) => {
  await workerschema.findByIdAndDelete({ _id: req.params.id }).exec()
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: 'Accepted'
      })
    })
    .catch(err => {
      res.json({
        status: 500,
        msg: 'Error in API',
        err: err
      })
    })

}

// False IsActive by Admin 

const removebyadminbyworkerid = async (req, res) => {
  await workerschema.findByIdAndUpdate({ _id: req.params.id }, { isactive: false }).exec()
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: 'Accepted'
      })
    })
    .catch(err => {
      res.json({
        status: 500,
        msg: 'Error in API',
        err: err
      })
    })

}

// add Ratings

const addRating = (req, res) => {
  let newRate = parseInt(req.body.rating);
  let rating = 0;
  workerschema.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      rating = data.rating;
      if (data.rating != 0) rating = (rating + newRate) / 2;
      else rating = newRate;
      workerschema.findByIdAndUpdate(
        {
          _id: req.params.id
        },
        {
          rating: rating,
        },
        {
          new: true
        }
      )
        .exec()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
          });
        });
    });
};

const topratedWorkers = (req, res) => {
  workerschema.find({ isactive: true, adminapprove: true })
    .sort({ rating: -1 })
    .limit(4)
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: "Data obtained",
        data: data
      });
    }).catch(err => {

      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });

    })

}
module.exports = {
  registerworker, upload,
  workerLogin, verifyToken,
  workerresetpswd,
  updateworkerprofile,
  viewallworker,
  viewworkerbyid,
  deleteworkerById,
  viewworkerreq,
  approveworkerid,
  rejectworkerbyid,
  viewworkerpendingreq,
  removebyadminbyworkerid,
  addRating,
  topratedWorkers,
  viewallworkersByLocation
}