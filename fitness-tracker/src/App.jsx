import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<ExercisesPage />} />
      </Routes>
    </div>
  );
}

export default App;