import React from 'react';
import PropTypes from 'prop-types';
import styles from './Badge.module.css';

const Badge = ({ label, type }) => {
  return (
    <span className={`${styles.badge} ${styles[type]}`}>
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Badge;
