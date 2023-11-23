const mongoose = require('mongoose');

const messCommitteeSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  messMember: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
}, { timestamps: true });

module.exports = mongoose.model("MessCommittee", messCommitteeSchema);