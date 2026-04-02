const employerschema = require("./employerSchema")
const multer = require("multer")
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret_key"
const workers = require("../Worker/workerSchema")
const customer = require("../customer/customerSchema")


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const registeremp = async (req, res) => {
  const employer = new employerschema({
    name: req.body.name,
    empid: req.body.employerId,
    address: req.body.address,
    location: req.body.location,
    // city:req.body.city,
    // state:req.body.state,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
    image: req.file,
  });
  let existingCustomer1 = await employerschema.findOne({ email: req.body.email });
  let existingCustomer2 = await workers.findOne({ email: req.body.email });
  let existingCustomer3 = await customer.findOne({ email: req.body.email })

  if (existingCustomer1 || existingCustomer2 || existingCustomer3) {
    return res.json({
      status: 409,
      msg: "Email Already Registered With Us !!",
      data: null
    })
  }

  employer
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
        } else if (err.keyPattern.hasOwnProperty("empid")) {
          errMsg = "Employe id already in Use"
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

const empLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await employerschema.findOne({ email: email });

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

const employerresetpswd = ((req, res) => {
  employerschema.findByIdAndUpdate({ _id: req.params.id }, { password: req.body.password }
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


const updateempprofile = (req, res) => {
  employerschema.findByIdAndUpdate({ _id: req.params.id }, {
    name: req.body.name,
    empid: req.body.empid,
    address: req.body.address,
    location: req.body.location,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
    image: req.file,
  })
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

const viewallemployer = ((req, res) => {
  employerschema.find({ adminapprove: true, isactive: true })
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



const viewemployerpendingreq = ((req, res) => {
  employerschema.find({ adminapprove: false })
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


const viewempbyid = (req, res) => {
  employerschema
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "Employer not found" });
      }
      res.json({
        status: 200,
        data: data,
      });
    })
    .catch((err) => {
      console.error("Error finding employer by ID:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

const deleteempById = async (req, res) => {
  await employerschema.findByIdAndDelete({ _id: req.params.id }).exec()
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

const viewemployerreq = ((req, res) => {
  employerschema.find({ adminapprove: false })
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
const approveempbyid = async (req, res) => {
  await employerschema.findByIdAndUpdate({ _id: req.params.id }, { adminapprove: true }).exec()
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
const rejectempbyid = async (req, res) => {
  await employerschema.findByIdAndDelete({ _id: req.params.id }).exec()
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

const removebyadminbyempid = async (req, res) => {
  await employerschema.findByIdAndUpdate({ _id: req.params.id }, { isactive: false }).exec()
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



module.exports = {
  registeremp, upload,
  empLogin,
  employerresetpswd,
  updateempprofile,
  viewallemployer,
  viewempbyid,
  deleteempById,
  viewemployerreq,
  approveempbyid,
  rejectempbyid,
  viewemployerpendingreq,
  removebyadminbyempid
}
