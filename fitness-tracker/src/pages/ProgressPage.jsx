import React, { useState, useEffect } from 'react';
import styles from '../components/WorkoutLog/WorkoutLog.module.css';
import ProgressChart from '../components/Progress/ProgressChart.jsx';

const ProgressPage = () => {
  const [logs, setLogs] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('All');

  useEffect(() => {
    const saved = localStorage.getItem('fit_workout_logs');
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load logs for progress view:', e);
      }
    }
  }, []);

  // Collect unique exercise titles for dropdown menu
  const exerciseOptions = ['All', ...new Set(logs.map(item => item.exerciseTitle).filter(Boolean))];

  // Filter logs and compute weight & volume trends
  const filteredData = (selectedExercise === 'All'
    ? logs
    : logs.filter(item => item.exerciseTitle === selectedExercise)
  ).map(item => {
    const weight = Number(item.weight) || 0;
    const sets = Number(item.setsCompleted) || 0;
    const reps = Number(item.repsCompleted) || 0;

    return {
      date: item.date || 'N/A',
      exercise: item.exerciseTitle || 'Exercise',
      weight: weight,
      volume: sets * reps * weight,
    };
  }).reverse();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Visual Progress</h1>
        <p className={styles.subtitle}>
          Track your strength gains and total workload trends over time.
        </p>
      </header>

      {/* Filter Dropdown */}
      <div className={styles.logForm} style={{ marginBottom: '2rem' }}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Filter by Exercise Movement:</label>
          <select
            className={styles.select}
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            {exerciseOptions.map((exTitle, idx) => (
              <option key={idx} value={exTitle}>{exTitle}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className={styles.emptyState}>
          <p>
            No workout logs found yet. Record your sessions in History to unlock your progress charts! 📈
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <ProgressChart
            type="area"
            title="📈 Max Weight Lifted (lbs)"
            data={filteredData}
            dataKey="weight"
            color="#ff7e5f"
          />
          <ProgressChart
            type="bar"
            title="📊 Total Volume (Sets × Reps × Weight)"
            data={filteredData}
            dataKey="volume"
            color="#ff7e5f"
          />
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
