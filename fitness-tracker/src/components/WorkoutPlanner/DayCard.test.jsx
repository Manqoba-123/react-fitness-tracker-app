import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DayCard from './DayCard';

describe('DayCard Component', () => {
  const mockExercises = [
    {
      instanceId: 'inst-1',
      title: 'Barbell Bench Press',
      sets: 4,
      reps: 8,
    },
    {
      instanceId: 'inst-2',
      title: 'Incline Dumbbell Press',
      sets: 3,
      reps: 10,
    },
  ];

  it('renders day name, exercise count badge, and list of exercises', () => {
    render(
      <DayCard
        day="Monday"
        exercises={mockExercises}
        onRemoveExercise={vi.fn()}
      />
    );

    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('2 Exercises')).toBeInTheDocument();
    expect(screen.getByText('Barbell Bench Press')).toBeInTheDocument();
    expect(screen.getByText('4 Sets × 8 Reps')).toBeInTheDocument();
  });

  it('renders rest day message when exercise array is empty', () => {
    render(
      <DayCard
        day="Sunday"
        exercises={[]}
        onRemoveExercise={vi.fn()}
      />
    );

    expect(screen.getByText('Sunday')).toBeInTheDocument();
    expect(screen.getByText('0 Exercises')).toBeInTheDocument();
    expect(screen.getByText('Rest Day 🧘')).toBeInTheDocument();
  });

  it('calls onRemoveExercise with day and instanceId when delete button is clicked', () => {
    const handleRemove = vi.fn();

    render(
      <DayCard
        day="Monday"
        exercises={mockExercises}
        onRemoveExercise={handleRemove}
      />
    );

    const removeButtons = screen.getAllByTitle('Remove exercise');
    fireEvent.click(removeButtons[0]);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith('Monday', 'inst-1');
  });
});