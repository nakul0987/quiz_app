import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TakeQuiz from './pages/TakeQuiz';
import Result from './pages/Result';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/quiz/:quizId" element={user ? <TakeQuiz user={user} /> : <Navigate to="/login" />} />
        <Route path="/result" element={user ? <Result /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user && user.role === 'Admin' ? <AdminPanel /> : <Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}