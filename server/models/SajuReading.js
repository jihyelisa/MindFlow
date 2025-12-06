const mongoose = require('mongoose');

const sajuReadingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true,
  },
  type: {
    type: String,
    enum: ['today', 'month', 'life'],
    required: [true, 'Reading type is required'],
  },
  content: {
    fortuneLevel: {
      type: String,
      required: true,
    },
    fortuneDescription: {
      type: String,
      required: true,
    },
    advice: {
      type: String,
      required: true,
    },
    luckyColor: String,
    luckyNumber: Number,
    warning: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

// Create compound index for efficient queries
sajuReadingSchema.index({ userId: 1, type: 1, createdAt: -1 });

// Set expiration based on reading type
sajuReadingSchema.pre('save', function(next) {
  if (!this.expiresAt) {
    const now = new Date();
    switch (this.type) {
      case 'today':
        // Expire at end of day
        this.expiresAt = new Date(now.setHours(23, 59, 59, 999));
        break;
      case 'month':
        // Expire at end of month
        this.expiresAt = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        break;
      case 'life':
        // Life readings don't expire
        this.expiresAt = null;
        break;
    }
  }
  next();
});

const SajuReading = mongoose.model('SajuReading', sajuReadingSchema);

module.exports = SajuReading;
