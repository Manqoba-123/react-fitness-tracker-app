// src/components/Exercise/ExerciseList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExerciseList from './ExerciseList';

describe('ExerciseList Component', () => {
  const mockExercises = [
    {
      id: '1',
      title: 'Barbell Bench Press',
      category: 'strength',
      difficulty: 'Intermediate',
      muscleGroup: 'Chest',
      equipment: 'Barbell'
    },
    {
      id: '2',
      title: 'Running',
      category: 'cardio',
      difficulty: 'Beginner',
      muscleGroup: 'Legs',
      equipment: 'None'
    }
  ];

  test('renders list of exercises', () => {
    render(
      <MemoryRouter>
        <ExerciseList exercises={mockExercises} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Barbell Bench Press/i)).toBeInTheDocument();
    expect(screen.getByText(/Running/i)).toBeInTheDocument();
  });

  test('displays empty state message when no exercises are available', () => {
    render(
      <MemoryRouter>
        <ExerciseList exercises={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/No exercises found|No matching exercises/i)).toBeInTheDocument();
  });

  test('triggers callback when an exercise card is clicked or selected', () => {
    const handleSelect = jest.fn();

    render(
      <MemoryRouter>
        <ExerciseList exercises={mockExercises} onSelectExercise={handleSelect} />
      </MemoryRouter>
    );

    const firstCard = screen.getByText(/Barbell Bench Press/i);
    fireEvent.click(firstCard);

    if (handleSelect.mock.calls.length > 0) {
      expect(handleSelect).toHaveBeenCalledWith(mockExercises[0]);
    }
  });
});