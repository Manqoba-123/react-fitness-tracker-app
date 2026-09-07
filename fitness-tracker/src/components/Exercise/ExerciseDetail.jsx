import React from 'react';
import Button from '../UI/Button';
import styles from './Exercise.module.css';

const ExerciseDetail = ({ exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <div className={styles.detailOverlay}>
      <div className={styles.detailCard}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <span className={`${styles.badge} ${styles[exercise.category]}`}>
          {exercise.category}
        </span>
        <h2>{exercise.title}</h2>
        <p className={styles.cardMeta}>
          <strong>Muscle Group:</strong> {exercise.muscleGroup} | <strong>Difficulty:</strong> {exercise.difficulty}
        </p>
        <p className={styles.description}>{exercise.description}</p>
        
        {exercise.audioUrl && (
          <div className={styles.audioPlayer}>
            <h4>Motivational Audio Track:</h4>
            <audio controls src={exercise.audioUrl}>
              Your browser does not support audio elements.
            </audio>
          </div>
        )}
        
        <div style={{ marginTop: '1.5rem' }}>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;