// src/components/Navigation/Navbar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Brand Logo */}
        <Link to="/" className={styles.brandLogo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>
            SuperC<span className={styles.logoAccent}>FIT</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/exercises"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              Exercises
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/workout-planner"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              Weekly Planner
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/progress"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              Progress
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;