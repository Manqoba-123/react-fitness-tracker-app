import React, { useState, useEffect } from 'react';
import ExerciseList from '../components/Exercise/ExerciseList';
import ExerciseDetail from '../components/Exercise/ExerciseDetail';
import Modal from '../components/UI/Modal';
import { EXERCISES_DATA } from '../data/exercisesData';

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate async data load
    const fetchExercises = async () => {
      try {
        setLoading(true);
        // Simulate delay
        setTimeout(() => {
          setExercises(EXERCISES_DATA);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load exercises');
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Exercises</h1>

      {loading ? (
        <p>Loading exercises...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : selectedExercise ? (
        <Modal
          isOpen={!!selectedExercise}
          onClose={() => setSelectedExercise(null)}
          title={selectedExercise?.title}
        >
          <ExerciseDetail
            exercise={selectedExercise}
            onClose={() => setSelectedExercise(null)}
          />
        </Modal>
      ) : (
        <ExerciseList
          exercises={exercises}
          onSelect={setSelectedExercise}
        />
      )}
    </div>
  );
};

export default ExercisesPage;