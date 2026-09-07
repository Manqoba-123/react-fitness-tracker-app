// src/components/Navigation/Navbar.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

const renderNavbar = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Navbar />
    </MemoryRouter>
  );
};

describe('Navbar Component', () => {
  test('renders brand logo with correct text', () => {
    renderNavbar();

    // Brand logo contains "SuperCFIT"
    expect(screen.getByText(/SuperC/i)).toBeInTheDocument();
    expect(screen.getByText(/FIT/i)).toBeInTheDocument();
  });

  test('renders all navigation links with correct paths', () => {
    renderNavbar();

    const homeLink = screen.getByRole('link', { name: /home/i });
    const exercisesLink = screen.getByRole('link', { name: /exercises/i });
    const plannerLink = screen.getByRole('link', { name: /weekly planner/i });
    const historyLink = screen.getByRole('link', { name: /history/i });
    const progressLink = screen.getByRole('link', { name: /progress/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(exercisesLink).toHaveAttribute('href', '/exercises');
    expect(plannerLink).toHaveAttribute('href', '/workout-planner');
    expect(historyLink).toHaveAttribute('href', '/history');
    expect(progressLink).toHaveAttribute('href', '/progress');
  });

  test('applies active class to active route', () => {
    renderNavbar(['/exercises']);

    const exercisesLink = screen.getByRole('link', { name: /exercises/i });
    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(exercisesLink.className).toContain('active');
    expect(homeLink.className).not.toContain('active');
  });
});