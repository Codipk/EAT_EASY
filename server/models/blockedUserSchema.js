const mongoose = require('mongoose');

const blockedUser = new mongoose.Schema({
  blockedUser: {
    type: String,
  }
}, { timestamps: true });


module.exports = mongoose.model("BlockedUser", blockedUser);