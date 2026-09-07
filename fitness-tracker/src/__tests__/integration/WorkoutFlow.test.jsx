// src/__tests__/integration/WorkoutFlow.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

describe('Workout Logging to Progress Integration Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('logs a completed session and updates localStorage and visual charts', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // 1. Target top navbar History link specifically
    const historyLink = screen.getAllByRole('link', { name: /^History$/i })[0];
    fireEvent.click(historyLink);

    // 2. Select movement and submit log form
    const exerciseSelect = screen.getByRole('combobox');
    const submitBtn = screen.getByRole('button', { name: /\+ Save Workout Log/i });

    fireEvent.change(exerciseSelect, { target: { value: exerciseSelect.options[1].value } });
    fireEvent.click(submitBtn);

    // 3. Confirm persistence in localStorage
    const savedLogs = JSON.parse(localStorage.getItem('fit_workout_logs') || '[]');
    expect(savedLogs).toHaveLength(1);
    expect(savedLogs[0].setsCompleted).toBe(3);
    expect(savedLogs[0].repsCompleted).toBe(10);
    expect(savedLogs[0].weight).toBe(100);

    // 4. Navigate to Progress page via top nav
    const progressLink = screen.getAllByRole('link', { name: /^Progress$/i })[0];
    fireEvent.click(progressLink);

    await waitFor(() => {
      expect(screen.queryByText(/No workout logs found yet/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Max Weight Lifted \(lbs\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Volume \(Sets × Reps × Weight\)/i)).toBeInTheDocument();
  });
});