import React from 'react';
import styles from './WorkoutPlanner.module.css';

const DayCard = ({ day, exercises, onRemoveExercise }) => {
  return (
    <div className={styles.dayCard}>
      <div className={styles.dayHeader}>
        <h3>{day}</h3>
        <span className={styles.countBadge}>{exercises.length} Exercises</span>
      </div>

      <div className={styles.exerciseList}>
        {exercises.length > 0 ? (
          exercises.map((item) => (
            <div key={item.instanceId} className={styles.scheduledItem}>
              <div>
                <strong className={styles.itemTitle}>{item.title}</strong>
                <div className={styles.itemMeta}>
                  {item.sets} Sets × {item.reps} Reps
                </div>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => onRemoveExercise(day, item.instanceId)}
                title="Remove exercise"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p className={styles.restDayText}>Rest Day 🧘</p>
        )}
      </div>
    </div>
  );
};

export default DayCard;