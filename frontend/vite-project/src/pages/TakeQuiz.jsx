import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function TakeQuiz({ user }) {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [startTime] = useState(new Date().toISOString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/questions/quiz/${quizId}`)
      .then((res) => {
        setQuestions(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [quizId]);

  const handleSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = async () => {
    const formattedResponses = Object.keys(answers).map((qId) => ({
      questionId: qId,
      selectedOption: answers[qId]
    }));

    try {
      const res = await API.post('/questions/submit', {
        studentId: user.id,
        quizId,
        startTime,
        responses: formattedResponses
      });
      navigate('/result', { state: { result: res.data.result } });
    } catch (err) {
      alert('Error submitting quiz: ' + err.message);
    }
  };

  if (loading) return <div className="container">Loading questions...</div>;
  if (questions.length === 0) return <div className="container">No questions available in this quiz.</div>;

  return (
    <div className="container">
      <h2>Attempt Quiz</h2>
      {questions.map((q, index) => (
        <div key={q._id} className="card">
          <h4>Q{index + 1}. {q.questionText}</h4>
          <br />
          {q.options.map((opt, optIndex) => (
            <div
              key={optIndex}
              className={`option-item ${answers[q._id] === optIndex ? 'selected' : ''}`}
              onClick={() => handleSelect(q._id, optIndex)}
            >
              {opt}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="btn btn-success">Submit Quiz</button>
    </div>
  );
}