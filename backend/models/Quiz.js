const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Easy', 'Intermediate', 'Hard'], default: 'Easy' },
    duration: { type: Number, required: true, min: 1 }, // In minutes
    passingPercentage: { type: Number, default: 60, min: 0, max: 100 },
    status: { type: String, enum: ['Draft', 'Published', 'Unpublished'], default: 'Draft' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);