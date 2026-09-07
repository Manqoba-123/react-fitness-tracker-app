import React, { useState, useEffect } from 'react';
import { EXERCISES_DATA } from '../../data/exercisesData.js';
import DayCard from './DayCard';
import Button from '../UI/Button';
import styles from './WorkoutPlanner.module.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WorkoutPlanner = () => {
  const [weeklyRoutine, setWeeklyRoutine] = useState(() => {
    const saved = localStorage.getItem('fit_weekly_routine');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load routine from localStorage', e);
      }
    }
    return DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
  });

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);

  useEffect(() => {
    localStorage.setItem('fit_weekly_routine', JSON.stringify(weeklyRoutine));
  }, [weeklyRoutine]);

  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!selectedExerciseId) return;

    const exerciseObj = EXERCISES_DATA.find((ex) => ex.id === selectedExerciseId);
    if (!exerciseObj) return;

    const newEntry = {
      instanceId: Date.now().toString(),
      exerciseId: exerciseObj.id,
      title: exerciseObj.title,
      category: exerciseObj.category,
      sets: Number(sets),
      reps: Number(reps),
    };

    setWeeklyRoutine((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], newEntry],
    }));

    setSelectedExerciseId('');
  };

  const handleRemoveExercise = (day, instanceId) => {
    setWeeklyRoutine((prev) => ({
      ...prev,
      [day]: prev[day].filter((item) => item.instanceId !== instanceId),
    }));
  };

  const handleClearWeek = () => {
    if (window.confirm('Are you sure you want to clear your full weekly schedule?')) {
      setWeeklyRoutine(DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {}));
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Weekly Workout Planner</h1>
        <p className={styles.subtitle}>
          Construct your weekly schedule, set targets, and persist your custom training split.
        </p>
      </header>

      {/* Routine Builder Form */}
      <form className={styles.plannerForm} onSubmit={handleAddExercise}>
        <div className={styles.formGroup}>
          <label htmlFor="day-select" className={styles.label}>
            Day
          </label>
          <select
            id="day-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className={styles.select}
          >
            {DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="movement-select" className={styles.label}>
            Select Movement
          </label>
          <select
            id="movement-select"
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">-- Choose Exercise --</option>
            {EXERCISES_DATA.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.title} ({ex.category})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formInlineGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="sets-input" className={styles.label}>
              Sets
            </label>
            <input
              id="sets-input"
              type="number"
              min="1"
              max="20"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className={styles.inputNumber}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="reps-input" className={styles.label}>
              Reps / Mins
            </label>
            <input
              id="reps-input"
              type="number"
              min="1"
              max="200"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className={styles.inputNumber}
            />
          </div>
        </div>

        <Button variant="primary" type="submit" className={styles.addBtn}>
          + Add to Schedule
        </Button>
      </form>

      {/* Action Bar */}
      <div className={styles.actionsBar}>
        <span className={styles.savedNotice}>💾 Routine automatically saves to storage</span>
        <Button variant="secondary" onClick={handleClearWeek}>
          Clear Entire Week
        </Button>
      </div>

      {/* Weekly Grid */}
      <div className={styles.weeklyGrid}>
        {DAYS.map((day) => (
          <DayCard
            key={day}
            day={day}
            exercises={weeklyRoutine[day] || []}
            onRemoveExercise={handleRemoveExercise}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlanner;