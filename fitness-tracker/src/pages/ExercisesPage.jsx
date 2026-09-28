import React, { useState } from 'react';
import ExerciseDetail from '../components/Exercise/ExerciseDetail.jsx';
import ExerciseList from '../components/Exercise/ExerciseList.jsx';
import Modal from '../components/UI/Modal.jsx';

const ExercisesPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div>
      <h2>Exercises</h2>
      <ExerciseList onSelect={setSelectedExercise} />
      
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
    </div>
  );
};

export default ExercisesPage;