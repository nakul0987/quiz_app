const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    questionText: { type: String, required: true, trim: true },
    options: {
      type: [String],
      required: true,
      validate: [(val) => val.length >= 2, 'At least 2 options are required']
    },
    correctAnswer: { type: Number, required: true }, // Index of correct option (0, 1, 2, 3...)
    explanation: { type: String, default: '' },
    marks: { type: Number, default: 1, min: 1 },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);