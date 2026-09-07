import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button UI Component', () => {
  test('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /Click Me/i })).toBeInTheDocument();
  });

  test('handles onClick event when triggered', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    
    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not trigger onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Action</Button>);

    const button = screen.getByRole('button', { name: /Disabled Action/i });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  test('renders default button type correctly', () => {
    render(<Button type="submit">Submit Form</Button>);
    const button = screen.getByRole('button', { name: /Submit Form/i });
    expect(button).toHaveAttribute('type', 'submit');
  });
});