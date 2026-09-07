// src/components/Exercise/ExerciseDetail.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ExerciseDetail from './ExerciseDetail';

describe('ExerciseDetail Component', () => {
  const mockExercise = {
    id: 'ex-101',
    title: 'Barbell Bench Press',
    category: 'strength',
    difficulty: 'Intermediate',
    muscleGroup: 'Chest',
    equipment: 'Barbell',
    description: 'A classic compound chest exercise.',
    instructions: [
      'Lie flat on the bench.',
      'Grip the barbell slightly wider than shoulder-width.',
      'Lower the bar to your chest and press back up.'
    ]
  };

  test('renders exercise details when exercise prop is provided', () => {
    render(
      <MemoryRouter>
        <ExerciseDetail exercise={mockExercise} />
      </MemoryRouter>
    );

    // Verify Title and Metadata
    expect(screen.getByText(/Barbell Bench Press/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Chest/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Barbell/i)[0]).toBeInTheDocument();
  });

  test('renders step-by-step instructions when present', () => {
    render(
      <MemoryRouter>
        <ExerciseDetail exercise={mockExercise} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Lie flat on the bench/i)).toBeInTheDocument();
    expect(screen.getByText(/Lower the bar to your chest/i)).toBeInTheDocument();
  });

  test('renders fallback message if no exercise data is available', () => {
    render(
      <MemoryRouter>
        <ExerciseDetail exercise={null} />
      </MemoryRouter>
    );

    expect(screen.getByText(/No exercise details found|Exercise not found/i)).toBeInTheDocument();
  });
});