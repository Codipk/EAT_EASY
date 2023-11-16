const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    unique: true,
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
  },
  accountType: {
    type: String,
    enum: ["Student", "Chief-Warden", "Committee-Member", "Accountant"],
    required: true,
    default: "Student",
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdditionalDetails"
  },
  complaints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint"
    }
  ],
  img: {
    type: String,//url of image
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true }, { strictPopulate: false });

module.exports = mongoose.model("User", userSchema);
