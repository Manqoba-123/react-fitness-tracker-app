import React from 'react';
import styles from './WorkoutLog.module.css';

const LogEntry = ({ entry, onDelete }) => {
  return (
    <div className={styles.logCard}>
      <div className={styles.logHeader}>
        <div>
          <h4 className={styles.exerciseName}>{entry.exerciseTitle}</h4>
          <span className={styles.logDate}>{entry.date}</span>
        </div>
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(entry.id)}
          title="Delete log entry"
        >
          ✕
        </button>
      </div>

      <div className={styles.logDetails}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Sets</span>
          <span className={styles.metricValue}>{entry.setsCompleted}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Reps</span>
          <span className={styles.metricValue}>{entry.repsCompleted}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Weight</span>
          <span className={styles.metricValue}>{entry.weight} lbs</span>
        </div>
      </div>

      {entry.notes && <p className={styles.notes}>"{entry.notes}"</p>}
    </div>
  );
};

export default LogEntry;