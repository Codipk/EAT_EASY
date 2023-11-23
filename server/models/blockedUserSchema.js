const mongoose = require('mongoose');

const blockedUser = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  }
}, { timestamps: true });


module.exports = mongoose.model("BlockedUser", blockedUser);