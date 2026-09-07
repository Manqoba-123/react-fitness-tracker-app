import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';

describe('AudioPlayer Component', () => {
  beforeAll(() => {
    // Mock HTMLMediaElement prototype methods for JSDOM
    window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  const mockAudioProps = {
    src: 'https://example.com/high-energy-beat.mp3',
    title: 'Workout Track 1'
  };

  test('renders audio component with title', () => {
    render(<AudioPlayer {...mockAudioProps} />);
    
    expect(screen.getByText(/Workout Track 1/i)).toBeInTheDocument();
  });

  test('interacts with playback control buttons', () => {
    render(<AudioPlayer {...mockAudioProps} />);

    const playBtn = screen.queryByRole('button', { name: /play|start/i });
    if (playBtn) {
      fireEvent.click(playBtn);
      expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    }
  });
});