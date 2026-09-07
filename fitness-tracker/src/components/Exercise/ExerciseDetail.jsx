// src/components/exercises/ExerciseDetail.jsx
import React from 'react';
import Button from '../UI/Button';
import styles from './Exercises.module.css';

const ExerciseDetail = ({ exercise, onClose }) => {
  if (!exercise) {
    return (
      <div className={styles.detailOverlay}>
        <div className={styles.detailCard}>
          <p>No exercise details found</p>
          {onClose && <Button onClick={onClose}>Close</Button>}
        </div>
      </div>
    );
  }

  const category = exercise.category || 'all';
  const categoryStyle = styles[category] || '';
  const instructions = exercise.instructions || exercise.steps || [];

  return (
    <div className={styles.detailOverlay}>
      <div className={styles.detailCard}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close detail modal"
        >
          ✕
        </button>

        {exercise.category && (
          <span className={`${styles.badge} ${categoryStyle}`}>
            {exercise.category}
          </span>
        )}

        <h2>{exercise.title || 'Exercise Details'}</h2>

        <p className={styles.cardMeta}>
          <span><strong>Muscle Group:</strong> <span data-testid="muscle-group">{exercise.muscleGroup}</span></span>
          {' | '}
          <span><strong>Equipment:</strong> <span data-testid="equipment">{exercise.equipment}</span></span>
          {' | '}
          <span><strong>Difficulty:</strong> <span data-testid="difficulty">{exercise.difficulty}</span></span>
        </p>

        {exercise.description && (
          <p className={styles.description}>{exercise.description}</p>
        )}

        {instructions.length > 0 && (
          <div className={styles.instructionsSection}>
            <h3>Instructions</h3>
            <ol className={styles.instructionsList}>
              {instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {exercise.audioUrl && (
          <div className={styles.audioPlayer}>
            <h4>Motivational Audio Track:</h4>
            <audio controls src={exercise.audioUrl}>
              Your browser does not support audio elements.
            </audio>
          </div>
        )}

        <div style={{ marginTop: '1.5rem' }}>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;