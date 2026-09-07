// src/pages/ProgressPage.jsx
import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import styles from '../components/WorkoutLog/WorkoutLog.module.css';

const ProgressPage = () => {
  const [logs, setLogs] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('All');

  useEffect(() => {
    // Reads directly from the key defined in WorkoutLog.jsx
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
      volume: sets * reps * weight
    };
  }).reverse(); // Reverse so older logs appear on the left, newest on the right

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Visual Progress</h1>
        <p className={styles.subtitle}>Track your strength gains and total workload trends over time.</p>
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
          <p>No workout logs found yet. Record your sessions in History to unlock your progress charts! 📈</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Max Weight Lifted Chart */}
          <div className={styles.logForm} style={{ display: 'block', textAlign: 'left' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '1.25rem', fontSize: '1.2rem' }}>
              📈 Max Weight Lifted (lbs)
            </h3>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData}>
                  <defs>
                    <linearGradient id="peachGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff7e5f" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ff7e5f" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="date" stroke="#a0aec0" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#a0aec0" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1821', borderColor: '#332a36', borderRadius: '8px', color: '#fff' }} 
                  />
                  <Area type="monotone" dataKey="weight" stroke="#ff7e5f" fillOpacity={1} fill="url(#peachGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Total Training Volume Chart */}
          <div className={styles.logForm} style={{ display: 'block', textAlign: 'left' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '1.25rem', fontSize: '1.2rem' }}>
              📊 Total Volume (Sets × Reps × Weight)
            </h3>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="date" stroke="#a0aec0" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#a0aec0" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1821', borderColor: '#332a36', borderRadius: '8px', color: '#fff' }} 
                  />
                  <Bar dataKey="volume" fill="#ff7e5f" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProgressPage;