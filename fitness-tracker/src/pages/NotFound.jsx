// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import styles from '../components/WorkoutLog/WorkoutLog.module.css';

const NotFound = () => {
  return (
    <div className={styles.container} style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
      <h1 style={{ fontSize: '5rem', margin: 0, color: 'var(--accent-peach, #ff7e5f)' }}>
        404
      </h1>
      <h2 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-secondary, #a0aec0)', maxWidth: '480px', margin: '0 auto 2rem' }}>
        The page you are looking for doesn't exist or has been moved. Let's get you back on track with your workout!
      </p>
      
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="primary">
          ⚡ Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;