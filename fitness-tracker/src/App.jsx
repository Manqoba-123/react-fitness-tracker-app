import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import ExercisesPage from './pages/ExercisesPage';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage';
import HistoryPage from './pages/HistoryPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  return (
    <div className="appLayout">
      <Header />
      
      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/planner" element={<WorkoutPlannerPage />} />
          <Route path="/workout-planner" element={<WorkoutPlannerPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;