
import React, { useState, useEffect } from 'react';
import styles from '../components/WorkoutLog/WorkoutLog.module.css';

const ProgressPage = () => {
  const [logs, setLogs] = useState([]);

  // Fetch logs saved by WorkoutLog.jsx from localStorage
  useEffect(() => {
    const savedLogs = localStorage.getItem('fit_workout_logs');
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (err) {
        console.error('Failed to parse logs:', err);
      }
    }
  }, []);

  // Total Summary Metrics
  const totalWorkouts = logs.length;
  const totalVolume = logs.reduce(
    (sum, log) => sum + log.setsCompleted * log.repsCompleted * log.weight,
    0
  );
  const totalSets = logs.reduce((sum, log) => sum + log.setsCompleted, 0);

  // Group performance & Personal Records (PRs) per exercise
  const exercisePRs = logs.reduce((acc, log) => {
    const title = log.exerciseTitle;
    if (!acc[title] || log.weight > acc[title].maxWeight) {
      acc[title] = {
        maxWeight: log.weight,
        maxReps: log.repsCompleted,
        date: log.date,
      };
    }
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Progress Analytics</h1>
        <p className={styles.subtitle}>Insights computed directly from your saved workout log history.</p>
      </header>

      {/* Global Metrics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.metricLabel}>Logged Sessions</span>
          <span className={styles.metricValue}>{totalWorkouts}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.metricLabel}>Lifetime Volume</span>
          <span className={styles.metricValue}>{totalVolume.toLocaleString()} lbs</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.metricLabel}>Total Sets Completed</span>
          <span className={styles.metricValue}>{totalSets}</span>
        </div>
      </div>

      {/* Personal Records per Exercise */}
      <section className={styles.prSection}>
        <h2 className={styles.sectionTitle}>Personal Records (Max Weight Lifted)</h2>
        {Object.keys(exercisePRs).length > 0 ? (
          <div className={styles.prGrid}>
            {Object.entries(exercisePRs).map(([exercise, data]) => (
              <div key={exercise} className={styles.prCard}>
                <h3 className={styles.exerciseName}>{exercise}</h3>
                <p className={styles.prWeight}>{data.maxWeight} lbs</p>
                <span className={styles.prSub}>
                  {data.maxReps} reps • Recorded on {data.date}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>Log your first workout to start tracking personal records!</p>
        )}
      </section>
    </div>
  );
};

export default ProgressPage;