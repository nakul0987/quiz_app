import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) return <div className="container">No result data found.</div>;

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card result-box">
        <h2>Quiz Result</h2>
        <br />
        <h3 className={result.status === 'PASSED' ? 'badge-passed' : 'badge-failed'}>
          STATUS: {result.status}
        </h3>
        <br />
        <p><strong>Score:</strong> {result.obtainedMarks} / {result.totalMarks}</p>
        <p><strong>Percentage:</strong> {result.percentage}%</p>
        <p><strong>Correct:</strong> {result.correctCount}</p>
        <p><strong>Incorrect:</strong> {result.incorrectCount}</p>
        <p><strong>Unanswered:</strong> {result.unansweredCount}</p>
        <p><strong>Time Taken:</strong> {result.timeTakenSeconds} seconds</p>
        <br />
        <Link to="/dashboard" className="btn">Back to Dashboard</Link>
      </div>
    </div>
  );
}