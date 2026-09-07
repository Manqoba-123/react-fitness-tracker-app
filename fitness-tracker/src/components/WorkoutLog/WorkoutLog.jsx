import React, { useState, useEffect } from 'react';
import { EXERCISES_DATA } from '../../data/exercisesData';
import LogEntry from './LogEntry';
import Button from '../UI/Button';
import styles from './WorkoutLog.module.css';

const WorkoutLog = () => {
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('fit_workout_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse logs from localStorage', e);
      }
    }
    return [];
  });

  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(100);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('fit_workout_logs', JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!selectedExerciseId) return;

    const exerciseObj = EXERCISES_DATA.find((ex) => ex.id === selectedExerciseId);

    const newLog = {
      id: Date.now().toString(),
      exerciseId: selectedExerciseId,
      exerciseTitle: exerciseObj ? exerciseObj.title : 'Custom Exercise',
      setsCompleted: Number(sets),
      repsCompleted: Number(reps),
      weight: Number(weight),
      notes: notes.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setLogs((prev) => [newLog, ...prev]);

    // Reset Form
    setSelectedExerciseId('');
    setNotes('');
  };

  const handleDeleteLog = (id) => {
    setLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to delete all workout history?')) {
      setLogs([]);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Workout Tracker & Log</h1>
        <p className={styles.subtitle}>
          Record completed workouts, track weight load improvements, and maintain your personal record logs.
        </p>
      </header>

      {/* Log Entry Form */}
      <form className={styles.logForm} onSubmit={handleAddLog}>
        <div className={styles.formGroup}>
          <label htmlFor="exercise-select" className={styles.label}>
            Exercise Movement
          </label>
          <select
            id="exercise-select"
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">-- Select Completed Exercise --</option>
            {EXERCISES_DATA.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.title} ({ex.muscleGroup})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="sets-input" className={styles.label}>
              Sets
            </label>
            <input
              id="sets-input"
              type="number"
              min="1"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reps-input" className={styles.label}>
              Reps
            </label>
            <input
              id="reps-input"
              type="number"
              min="1"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="weight-input" className={styles.label}>
              Weight (lbs)
            </label>
            <input
              id="weight-input"
              type="number"
              min="0"
              step="2.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="notes-input" className={styles.label}>
            Session Notes (Optional)
          </label>
          <input
            id="notes-input"
            type="text"
            placeholder="e.g. Felt great, hit new PR!"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={styles.input}
          />
        </div>

        <Button variant="primary" type="submit" className={styles.submitBtn}>
          + Save Workout Log
        </Button>
      </form>

      {/* History Header & Controls */}
      <div className={styles.historyHeader}>
        <h2>Logged Sessions ({logs.length})</h2>
        {logs.length > 0 && (
          <Button variant="secondary" onClick={handleClearLogs}>
            Clear History
          </Button>
        )}
      </div>

      {/* Log Feed */}
      <div className={styles.logList}>
        {logs.length > 0 ? (
          logs.map((entry) => (
            <LogEntry key={entry.id} entry={entry} onDelete={handleDeleteLog} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No workouts logged yet. Complete a session above to record your progress! 🏋️‍♂️</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutLog;