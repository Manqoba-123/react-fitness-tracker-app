import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card UI Component', () => {
  test('renders content and header elements correctly', () => {
    render(
      <Card title="Exercise Overview">
        <p>Card body content goes here.</p>
      </Card>
    );

    expect(screen.getByText('Exercise Overview')).toBeInTheDocument();
    expect(screen.getByText('Card body content goes here.')).toBeInTheDocument();
  });

  test('handles optional click interaction if card acts as a button or container', () => {
    const handleClick = jest.fn();
    render(
      <Card onClick={handleClick} className="interactive-card">
        <h3>Interactive Card</h3>
      </Card>
    );

    const cardElement = screen.getByText('Interactive Card').closest('div');
    if (cardElement) {
      fireEvent.click(cardElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    }
  });

  test('applies custom CSS wrapper classes', () => {
    const { container } = render(
      <Card className="special-card-style">
        <div>Content</div>
      </Card>
    );

    expect(container.firstChild).toHaveClass('special-card-style');
  });
});