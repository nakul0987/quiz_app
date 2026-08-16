import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    API.get('/quizzes')
      .then((res) => setQuizzes(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Available Quizzes</h2>
      <br />
      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="card">
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <p><strong>Category:</strong> {quiz.category}</p>
            <p><strong>Duration:</strong> {quiz.duration} mins</p>
            <br />
            <Link to={`/quiz/${quiz._id}`} className="btn">Start Quiz</Link>
          </div>
        ))}
      </div>
    </div>
  );
}