const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  mealType: {
    type: String,
    enum: ["breakFast", "lunch", "snacks", "dinner"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30, // The document will be automatically deleted after 30 days of its creation time
  },
});

// ratingSchema.index({ "createdAt": 1 }, { expireAfterSeconds: 3600 * 24 * 30 });

module.exports = mongoose.model("Rating", ratingSchema);