const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    questionText: {
      type: String,
      required: true,
      trim: true
    },
    options: {
      type: [String],
      required: true,
      validate: [arrayMinLength, 'At least 2 options are required']
    },
    correctAnswer: {
      type: Number, // Index of correct option (0, 1, 2, 3...)
      required: true
    },
    explanation: {
      type: String,
      default: ''
    },
    marks: {
      type: Number,
      default: 1,
      min: 1
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Easy'
    }
  },
  { timestamps: true }
);

function arrayMinLength(val) {
  return val.length >= 2;
}

module.exports = mongoose.model('Question', questionSchema);