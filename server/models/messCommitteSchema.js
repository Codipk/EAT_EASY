const mongoose = require('mongoose');

const messCommitteeSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  messManager: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
  },
  messSecretary: [
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
    }
  ],
  messMember: [
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("MessCommittee", messCommitteeSchema);