import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import WorkoutPlanner from './WorkoutPlanner';

describe('WorkoutPlanner Component', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it('renders header, initial empty state for all 7 days, and form controls', () => {
        render(<WorkoutPlanner />);

        expect(screen.getByText('Weekly Workout Planner')).toBeInTheDocument();

        // Check all days render (accounts for day names in both select options and DayCard components)
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        days.forEach((day) => {
            expect(screen.getAllByText(day).length).toBeGreaterThan(0);
        });

        // Default rest state on empty cards
        expect(screen.getAllByText('Rest Day 🧘')).toHaveLength(7);
    });

    it('adds an exercise to the selected day and updates localStorage', () => {
        render(<WorkoutPlanner />);

        // Select movement option
        fireEvent.change(screen.getByLabelText(/select movement/i), {
            target: { value: 'ex-1' },
        });

        // Submit form
        fireEvent.click(screen.getByRole('button', { name: /\+ add to schedule/i }));

        // Verify item is added under Monday
        expect(screen.getByText('Barbell Bench Press')).toBeInTheDocument();
        expect(screen.getByText('3 Sets × 10 Reps')).toBeInTheDocument();
        expect(screen.getByText(/1\s*exercise(s)?/i)).toBeInTheDocument();

        // Verify localStorage persistence
        const storedRoutine = JSON.parse(localStorage.getItem('fit_weekly_routine'));
        expect(storedRoutine.Monday).toHaveLength(1);
        expect(storedRoutine.Monday[0].title).toBe('Barbell Bench Press');
    });

    it('removes an exercise from a specific day', () => {
        render(<WorkoutPlanner />);

        // Add exercise to Monday
        fireEvent.change(screen.getByLabelText(/select movement/i), {
            target: { value: 'ex-1' },
        });
        fireEvent.click(screen.getByRole('button', { name: /\+ add to schedule/i }));

        expect(screen.getByText('Barbell Bench Press')).toBeInTheDocument();

        // Click remove button on the exercise item
        fireEvent.click(screen.getByTitle('Remove exercise'));

        expect(screen.queryByText('Barbell Bench Press')).not.toBeInTheDocument();
        expect(screen.getAllByText('Rest Day 🧘')).toHaveLength(7);
    });

    it('clears all scheduled days when clear week action is confirmed', () => {
        vi.spyOn(window, 'confirm').mockReturnValue(true);

        render(<WorkoutPlanner />);

        // Add exercise to Monday via exact label lookup
        fireEvent.change(screen.getByLabelText(/select movement/i), {
            target: { value: 'ex-1' },
        });
        fireEvent.click(screen.getByRole('button', { name: /\+ add to schedule/i }));

        expect(screen.getByText(/1\s*exercise(s)?/i)).toBeInTheDocument();

        // Clear entire week
        fireEvent.click(screen.getByRole('button', { name: /clear entire week/i }));

        expect(window.confirm).toHaveBeenCalledWith(
            'Are you sure you want to clear your full weekly schedule?'
        );
        expect(screen.queryByText('Barbell Bench Press')).not.toBeInTheDocument();
        expect(screen.getAllByText('Rest Day 🧘')).toHaveLength(7);
    });

    it('restores schedule saved in localStorage on initial mount', () => {
        const mockSavedRoutine = {
            Monday: [],
            Tuesday: [
                {
                    instanceId: '123',
                    exerciseId: 'ex-2',
                    title: 'Barbell Deadlift',
                    category: 'Posterior Chain',
                    sets: 4,
                    reps: 8,
                },
            ],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        };

        localStorage.setItem('fit_weekly_routine', JSON.stringify(mockSavedRoutine));

        render(<WorkoutPlanner />);

        expect(screen.getByText('Barbell Deadlift')).toBeInTheDocument();
        expect(screen.getByText('4 Sets × 8 Reps')).toBeInTheDocument();
    });
});