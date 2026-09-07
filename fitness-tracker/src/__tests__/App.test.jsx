// src/__tests__/App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Root Level Smoke Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the main brand header without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const brandElements = screen.getAllByText(/SuperC/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });
});