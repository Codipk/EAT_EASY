const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userName:{
    type : String,
    required :true,
  },
  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Complaint', // Reference to the complaintId model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add more fields as needed
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;