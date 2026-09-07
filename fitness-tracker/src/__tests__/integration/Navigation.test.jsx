// src/__tests__/integration/Navigation.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

describe('Navigation Integration Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('navigates seamlessly across primary application pages', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Get primary navbar links from top navigation (index 0)
    const homeLink = screen.getAllByRole('link', { name: /^Home$/i })[0];
    const exercisesLink = screen.getAllByRole('link', { name: /^Exercises$/i })[0];
    const plannerLink = screen.getAllByRole('link', { name: /Weekly Planner|Planner/i })[0];
    const historyLink = screen.getAllByRole('link', { name: /^History$/i })[0];
    const progressLink = screen.getAllByRole('link', { name: /^Progress$/i })[0];

    expect(homeLink).toBeInTheDocument();

    // Navigate to Exercises page
    fireEvent.click(exercisesLink);
    expect(screen.getByRole('heading', { level: 1, name: /Exercise Library/i })).toBeInTheDocument();

    // Navigate to Weekly Planner page
    fireEvent.click(plannerLink);
    expect(screen.getByRole('heading', { level: 1, name: /Weekly Workout Planner|Construct your weekly schedule/i })).toBeInTheDocument();

    // Navigate to History / Workout Log page
    fireEvent.click(historyLink);
    expect(screen.getByRole('heading', { level: 1, name: /Workout Tracker & Log/i })).toBeInTheDocument();

    // Navigate to Progress page
    fireEvent.click(progressLink);
    expect(screen.getByRole('heading', { level: 1, name: /Visual Progress/i })).toBeInTheDocument();
  });
});