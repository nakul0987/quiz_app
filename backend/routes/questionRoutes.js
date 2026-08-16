const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const QuizAttempt = require('../models/QuizAttempt');

// 1. ADD a question to a quiz (Admin)
router.post('/add', async (req, res) => {
  try {
    const { quizId, questionText, options, correctAnswer, explanation, marks, difficulty } = req.body;

    const newQuestion = new Question({
      quizId,
      questionText,
      options,
      correctAnswer,
      explanation,
      marks,
      difficulty
    });

    await newQuestion.save();
    res.status(201).json({ success: true, message: 'Question added successfully', data: newQuestion });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 2. GET all questions for a specific quiz (Admin / System)
router.get('/quiz/:quizId', async (req, res) => {
  try {
    const questions = await Question.find({ quizId: req.params.quizId });
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. DELETE a question (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. SUBMIT QUIZ & EVALUATE (Student)
router.post('/submit', async (req, res) => {
  try {
    const { studentId, quizId, startTime, responses, passingPercentage = 60 } = req.body;
    // responses format: [{ questionId: "...", selectedOption: 1 }]

    const questions = await Question.find({ quizId });

    let totalMarks = 0;
    let obtainedMarks = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const evaluatedAnswers = questions.map((q) => {
      totalMarks += q.marks;

      const userAns = responses.find((r) => r.questionId.toString() === q._id.toString());
      const selected = userAns && userAns.selectedOption !== undefined ? userAns.selectedOption : null;

      let isCorrect = false;
      let marksEarned = 0;

      if (selected === null) {
        unansweredCount++;
      } else if (selected === q.correctAnswer) {
        isCorrect = true;
        correctCount++;
        marksEarned = q.marks;
        obtainedMarks += q.marks;
      } else {
        incorrectCount++;
      }

      return {
        questionId: q._id,
        selectedOption: selected,
        isCorrect,
        marksObtained: marksEarned
      };
    });

    const endTime = new Date();
    const start = new Date(startTime);
    const timeTakenSeconds = Math.max(0, Math.floor((endTime - start) / 1000));
    const percentage = Math.round((obtainedMarks / totalMarks) * 100) || 0;
    const status = percentage >= passingPercentage ? 'PASSED' : 'FAILED';

    const attempt = new QuizAttempt({
      studentId,
      quizId,
      startTime: start,
      endTime,
      timeTakenSeconds,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      unansweredCount,
      totalMarks,
      obtainedMarks,
      percentage,
      status,
      answers: evaluatedAnswers
    });

    await attempt.save();

    res.status(200).json({
      success: true,
      message: 'Quiz evaluated successfully',
      result: attempt
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;