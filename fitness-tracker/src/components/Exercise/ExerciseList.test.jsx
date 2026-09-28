import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExerciseList from './ExerciseList';

describe('ExerciseList Component', () => {
  const mockExercises = [
    {
      id: 1,
      title: 'Barbell Bench Press',
      category: 'strength',
      difficulty: 'Intermediate',
      muscleGroup: 'Chest',
      equipment: 'Barbell',
    },
    {
      id: 2,
      title: 'Running',
      category: 'cardio',
      difficulty: 'Beginner',
      muscleGroup: 'Legs',
      equipment: 'None',
    },
  ];

  test('renders list of exercises', () => {
    render(
      <MemoryRouter>
        <ExerciseList exercises={mockExercises} onSelect={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Barbell Bench Press/i)).toBeInTheDocument();
    expect(screen.getByText(/Running/i)).toBeInTheDocument();
  });

  test('displays empty state message when no exercises are available', () => {
    render(
      <MemoryRouter>
        <ExerciseList exercises={[]} onSelect={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/No exercises found/i)).toBeInTheDocument();
  });

  test('triggers callback when Details button is clicked', () => {
    const handleSelect = jest.fn();

    render(
      <MemoryRouter>
        <ExerciseList exercises={mockExercises} onSelect={handleSelect} />
      </MemoryRouter>
    );

    // Find the Details button for the first exercise
    const detailsButton = screen.getByRole('button', { name: /Details/i });
    fireEvent.click(detailsButton);

    expect(handleSelect).toHaveBeenCalledWith(mockExercises[0]);
  });
});