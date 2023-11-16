const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({

  hostelName: {
    type: String,
    trim: true,
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  },
  messCommittee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MessCommittee",
  },
  warden: {
    type: String,
    trim: true,
  },
  accountant: {
    type: String,
    trim: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
}, { timestamps: true }, { strictPopulate: false });


module.exports = mongoose.model("Hostel", hostelSchema);