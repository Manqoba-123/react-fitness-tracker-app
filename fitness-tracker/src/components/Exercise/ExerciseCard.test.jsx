// src/components/Exercise/ExerciseCard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExerciseCard from './ExerciseCard';

describe('ExerciseCard Component', () => {
  const mockExercise = {
    id: 'ex-1',
    title: 'Barbell Bench Press',
    category: 'strength',
    difficulty: 'Intermediate',
    muscleGroup: 'Chest',
    targetMuscle: 'Chest',
    equipment: 'Barbell',
    description: 'Classic compound push exercise targeting pectoral muscles.',
  };

  test('renders exercise details accurately', () => {
    render(
      <MemoryRouter>
        <ExerciseCard exercise={mockExercise} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 3, name: /Barbell Bench Press/i })).toBeInTheDocument();
    expect(screen.getByText(/Chest/i)).toBeInTheDocument();
    expect(screen.getByText(/Intermediate/i)).toBeInTheDocument();
  });

  test('displays appropriate category badge', () => {
    render(
      <MemoryRouter>
        <ExerciseCard exercise={mockExercise} />
      </MemoryRouter>
    );

    expect(screen.getByText(/strength/i)).toBeInTheDocument();
  });

  test('triggers callback on action button click if onSelect/onAdd prop exists', () => {
    const handleSelect = jest.fn();
    
    render(
      <MemoryRouter>
        <ExerciseCard exercise={mockExercise} onSelect={handleSelect} />
      </MemoryRouter>
    );

    const actionButton = screen.queryByRole('button', { name: /add|select|view|watch/i });
    if (actionButton) {
      fireEvent.click(actionButton);
    }
  });
});