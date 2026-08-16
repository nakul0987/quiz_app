import React, { useState } from 'react';
import API from '../api';

export default function AdminPanel() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState(10);
  const [status, setStatus] = useState('Published');
  const [createdQuizId, setCreatedQuizId] = useState(null);

  // Question Form
  const [questionText, setQuestionText] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/quizzes/create', { title, description, category, duration, status });
      setCreatedQuizId(res.data.data._id);
      alert('Quiz created! Now add questions to it below.');
    } catch (err) {
      alert('Error creating quiz: ' + err.message);
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await API.post('/questions/add', {
        quizId: createdQuizId,
        questionText,
        options: [opt1, opt2, opt3, opt4],
        correctAnswer: Number(correctAnswer)
      });
      alert('Question added!');
      setQuestionText('');
      setOpt1(''); setOpt2(''); setOpt3(''); setOpt4('');
    } catch (err) {
      alert('Error adding question: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      
      {/* 1. Create Quiz Form */}
      <div className="card">
        <h3>Step 1: Create a Quiz</h3>
        <form onSubmit={handleCreateQuiz}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Duration (minutes)</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <button type="submit" className="btn">Create Quiz</button>
        </form>
      </div>

      {/* 2. Add Questions Form */}
      {createdQuizId && (
        <div className="card">
          <h3>Step 2: Add Questions to Quiz ID: {createdQuizId}</h3>
          <form onSubmit={handleAddQuestion}>
            <div className="form-group">
              <label>Question Text</label>
              <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Option 1</label>
              <input type="text" value={opt1} onChange={(e) => setOpt1(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Option 2</label>
              <input type="text" value={opt2} onChange={(e) => setOpt2(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Option 3</label>
              <input type="text" value={opt3} onChange={(e) => setOpt3(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Option 4</label>
              <input type="text" value={opt4} onChange={(e) => setOpt4(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Correct Option Index</label>
              <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
                <option value={0}>Option 1 (Index 0)</option>
                <option value={1}>Option 2 (Index 1)</option>
                <option value={2}>Option 3 (Index 2)</option>
                <option value={3}>Option 4 (Index 3)</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">Add Question</button>
          </form>
        </div>
      )}
    </div>
  );
}