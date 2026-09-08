import React, { useState, useRef } from 'react';
import styles from './Media.module.css';

const VideoPlayer = ({ src, title = 'Exercise Video Guide', poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={styles.mediaCard}>
      <h4 className={styles.mediaTitle}>{title}</h4>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={styles.videoElement}
          onEnded={() => setIsPlaying(false)}
          data-testid="video-element"
        >
          Your browser does not support video playback.
        </video>
      </div>

      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>

        <button
          type="button"
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇 Unmute' : '🔊 Mute'}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;