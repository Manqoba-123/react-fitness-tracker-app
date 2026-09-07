import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Placeholder routes for next steps */}
        <Route path="/exercises" element={<div style={{ padding: '3rem', textAlign: 'center', color: '#fff' }}>Exercises Page Coming Next!</div>} />
        <Route path="/workout-planner" element={<div style={{ padding: '3rem', textAlign: 'center', color: '#fff' }}>Weekly Planner Page Coming Soon!</div>} />
      </Routes>
    </div>
  );
}

export default App;