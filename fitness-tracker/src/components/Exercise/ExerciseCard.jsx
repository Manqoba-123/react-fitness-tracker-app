// src/components/Exercise/ExerciseCard.jsx
import React, { useState } from 'react';
import Button from '../UI/Button';
import styles from './Exercises.module.css';

const ExerciseCard = ({ exercise, onSelect }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

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

      {/* Action Buttons: Video & Audio Controls */}
      <div className={styles.cardActions}>
        <Button
          variant="secondary"
          onClick={() => {
            setShowVideo((prev) => !prev);
            if (showAudio) setShowAudio(false); // Close audio if video opens
          }}
        >
          {showVideo ? 'Hide Video' : 'Watch Video 🎬'}
        </Button>

        {exercise.audioUrl && (
          <Button
            variant="secondary"
            onClick={() => {
              setShowAudio((prev) => !prev);
              if (showVideo) setShowVideo(false); // Close video if audio opens
            }}
          >
            {showAudio ? 'Hide Audio' : 'Motivation Track 🎵'}
          </Button>
        )}

        {onSelect && (
          <Button variant="primary" onClick={() => onSelect(exercise)}>
            Details
          </Button>
        )}
      </div>

      {/* Embedded Video Demo */}
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

      {/* Audio Motivation Track Player */}
      {showAudio && exercise.audioUrl && (
        <div className={styles.audioContainer}>
          <p className={styles.audioLabel}>
            🎧 {exercise.audioTitle || 'Motivation Track'}:
          </p>
          <audio controls controlsList="nodownload" className={styles.audioPlayer}>
            <source src={exercise.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;