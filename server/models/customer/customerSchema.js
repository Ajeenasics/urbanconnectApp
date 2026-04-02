const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  housename: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    // unique: true,
    required: true,

    dropDups: true,
  },
  pincode: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    // unique: true,
    required: true,

    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
  },
  isactive: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("customers", customerSchema);
