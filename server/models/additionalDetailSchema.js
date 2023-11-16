const mongoose = require('mongoose');

const additionalDetails = new mongoose.Schema({
  gender: {
    type: String,
  },
  DOB: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  AccountNo: {
    type: String,
    trim: true,
  },
  IFSC: {
    type: String,
    trim: true,
  },
  isMessFeePaid: {
    type: Boolean,
    trim: true,
    default: false,
  },
  roomNo: {
    type: Number,
    trim: true,
  },
  contactNo: {
    type: Number,
    trim: true,
  },
  branch: {
    type: String,
    trim: true,
  }
}, { timestamps: true }, { strictPopulate: false });



module.exports = mongoose.model("AdditionalDetails", additionalDetails);