// src/components/UI/SearchBar.jsx
import React from 'react';
import styles from './UI.module.css';

const SearchBar = ({ value, onChange, placeholder = 'Search exercises...', onClear }) => {
  return (
    <div className={styles.searchContainer}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        type="text"
        className={styles.searchInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button 
          type="button" 
          className={styles.clearBtn} 
          onClick={onClear || (() => onChange(''))}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;