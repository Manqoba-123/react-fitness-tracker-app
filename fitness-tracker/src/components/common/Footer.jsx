// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './common.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>
              SuperC<span className={styles.logoAccent}>FIT</span>
            </span>
          </div>
          <p className={styles.tagline}>
            Track workouts, plan weekly splits, and monitor your personal progress.
          </p>
        </div>

        <div className={styles.linksCol}>
          <h4>Quick Navigation</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/exercises">Exercises</Link></li>
            <li><Link to="/workout-planner">Planner</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/progress">Progress</Link></li>
          </ul>
        </div>

        <div className={styles.copyCol}>
          <p>&copy; {new Date().getFullYear()} Manqoba Mlangeni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;