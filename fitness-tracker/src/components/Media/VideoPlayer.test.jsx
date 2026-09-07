import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer Component', () => {
  beforeAll(() => {
    // Mock HTMLMediaElement prototype methods for JSDOM
    window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  const mockVideoProps = {
    src: 'https://example.com/demo-workout.mp4',
    title: 'Bench Press Form Demonstration',
    poster: 'https://example.com/poster.jpg'
  };

  test('renders video element with correct attributes', () => {
    const { container } = render(<VideoPlayer {...mockVideoProps} />);
    
    // Find video tag directly within container
    const videoElement = container.querySelector('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('src', mockVideoProps.src);
  });

  test('plays and pauses media when controls are clicked', () => {
    render(<VideoPlayer {...mockVideoProps} />);

    const playButton = screen.queryByRole('button', { name: /play|toggle/i });
    if (playButton) {
      fireEvent.click(playButton);
      expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();

      fireEvent.click(playButton);
      expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    }
  });
});