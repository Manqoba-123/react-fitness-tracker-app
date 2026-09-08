import React, { useState, useRef } from 'react';
import styles from './Media.module.css';

const AudioPlayer = ({ src, title = 'Audio Instructions' }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.mediaCard}>
      <div className={styles.audioHeader}>
        <span className={styles.audioIcon}>🎧</span>
        <h4 className={styles.mediaTitle}>{title}</h4>
      </div>

      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
        data-testid="audio-element"
      />

      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.controlBtnPrimary}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
        >
          {isPlaying ? '⏸ Pause Audio' : '▶ Play Audio Guidance'}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;