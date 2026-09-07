// src/components/common/Loading.jsx
import React from 'react';
import styles from './common.module.css';

const Loading = ({ message = 'Loading fitness data...' }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
};

export default Loading;