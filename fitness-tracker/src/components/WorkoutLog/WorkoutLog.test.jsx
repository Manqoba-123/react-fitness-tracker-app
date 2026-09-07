import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import WorkoutLog from './WorkoutLog';

describe('WorkoutLog Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders header, initial empty state, and form controls correctly', () => {
    render(<WorkoutLog />);

    expect(screen.getByText('Workout Tracker & Log')).toBeInTheDocument();
    expect(
      screen.getByText(/no workouts logged yet/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/exercise movement/i)).toBeInTheDocument();
  });

  it('successfully adds a new workout log entry and persists to localStorage', () => {
    render(<WorkoutLog />);

    // Select exercise (ex-1 is Barbell Bench Press)
    fireEvent.change(screen.getByLabelText(/exercise movement/i), {
      target: { value: 'ex-1' },
    });

    // Fill form inputs
    fireEvent.change(screen.getByLabelText(/sets/i), {
      target: { value: '4' },
    });
    fireEvent.change(screen.getByLabelText(/reps/i), {
      target: { value: '8' },
    });
    fireEvent.change(screen.getByLabelText(/weight/i), {
      target: { value: '135' },
    });
    fireEvent.change(screen.getByLabelText(/session notes/i), {
      target: { value: 'Solid session' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /\+ save workout log/i }));

    // Verify entry appears in the list with full exercise title
    expect(screen.getByText('Barbell Bench Press')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText(/135/)).toBeInTheDocument();
    expect(screen.getByText('Logged Sessions (1)')).toBeInTheDocument();

    // Verify localStorage persistence
    const savedLogs = JSON.parse(localStorage.getItem('fit_workout_logs'));
    expect(savedLogs).toHaveLength(1);
    expect(savedLogs[0].exerciseTitle).toBe('Barbell Bench Press');
  });

  it('deletes an individual log entry when delete action is triggered', () => {
    render(<WorkoutLog />);

    // Add entry
    fireEvent.change(screen.getByLabelText(/exercise movement/i), {
      target: { value: 'ex-2' },
    });
    fireEvent.click(screen.getByRole('button', { name: /\+ save workout log/i }));

    expect(screen.getByText('Barbell Deadlift')).toBeInTheDocument();
    expect(screen.getByText('Logged Sessions (1)')).toBeInTheDocument();

    // Delete entry
    fireEvent.click(screen.getByTitle('Delete log entry'));

    expect(screen.queryByText('Barbell Deadlift')).not.toBeInTheDocument();
    expect(screen.getByText(/no workouts logged yet/i)).toBeInTheDocument();
  });

  it('clears all logs when confirmation prompt is accepted', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<WorkoutLog />);

    // Add entry
    fireEvent.change(screen.getByLabelText(/exercise movement/i), {
      target: { value: 'ex-1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /\+ save workout log/i }));

    expect(screen.getByText('Logged Sessions (1)')).toBeInTheDocument();

    // Clear history
    fireEvent.click(screen.getByRole('button', { name: /clear history/i }));

    expect(screen.getByText(/no workouts logged yet/i)).toBeInTheDocument();
  });
});