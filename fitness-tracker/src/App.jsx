// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        
        {/* Route for /planner */}
        <Route path="/planner" element={<WorkoutPlannerPage />} />
        
        {/* Route for /workout-planner to fix the missing route match */}
        <Route path="/workout-planner" element={<WorkoutPlannerPage />} />
      </Routes>
    </div>
  );
}

export default App;