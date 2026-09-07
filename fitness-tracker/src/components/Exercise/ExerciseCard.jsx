import React, { useState } from 'react';
import Button from '../UI/Button';
import styles from './Exercise.module.css';

const ExerciseCard = ({ exercise, onSelect }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={`${styles.badge} ${styles[exercise.category]}`}>
          {exercise.category}
        </span>
        <span className={styles.difficulty}>{exercise.difficulty}</span>
      </div>

      <h3 className={styles.cardTitle}>{exercise.title}</h3>
      <p className={styles.cardMeta}>
        <strong>Target:</strong> {exercise.muscleGroup} | <strong>Equipment:</strong> {exercise.equipment}
      </p>
      <p className={styles.description}>{exercise.description}</p>

      <div className={styles.cardActions}>
        <Button
          variant="secondary"
          onClick={() => setShowVideo((prev) => !prev)}
        >
          {showVideo ? 'Hide Video' : 'Watch Video 🎬'}
        </Button>
        {onSelect && (
          <Button variant="primary" onClick={() => onSelect(exercise)}>
            Details
          </Button>
        )}
      </div>

      {showVideo && (
        <div className={styles.videoContainer}>
          <iframe
            src={exercise.videoUrl}
            title={`${exercise.title} Demonstration`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.videoFrame}
          />
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;