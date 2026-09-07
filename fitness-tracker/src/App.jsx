import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* We will add /exercises, /workout-planner, etc. routes next */}
      </Routes>
    </div>
  );
}

export default App;