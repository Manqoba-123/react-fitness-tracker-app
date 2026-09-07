// src/components/common/Header.jsx
import React from 'react';
import Navbar from '../Navigation/Navbar';
import styles from './common.module.css';

const Header = () => {
  return (
    <header className={styles.appHeader}>
      <Navbar />
    </header>
  );
};

export default Header;