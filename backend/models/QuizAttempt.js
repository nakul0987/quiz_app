const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      default: Date.now
    },
    timeTakenSeconds: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    correctCount: {
      type: Number,
      required: true
    },
    incorrectCount: {
      type: Number,
      required: true
    },
    unansweredCount: {
      type: Number,
      required: true
    },
    totalMarks: {
      type: Number,
      required: true
    },
    obtainedMarks: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['PASSED', 'FAILED'],
      required: true
    },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        selectedOption: { type: Number, default: null }, // Index of option chosen, null if skipped
        isCorrect: { type: Boolean, default: false },
        marksObtained: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);