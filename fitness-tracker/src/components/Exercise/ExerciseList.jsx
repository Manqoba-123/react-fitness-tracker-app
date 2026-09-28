import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EXERCISES_DATA } from '../../data/exercisesData';
import ExerciseCard from './ExerciseCard';
import Button from '../UI/Button';
import SearchBar from '../UI/SearchBar';
import PropTypes from 'prop-types';
import styles from './Exercises.module.css';

const ExerciseList = ({ exercises = EXERCISES_DATA, onSelect }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredExercises = exercises.filter((exercise) => {
    const matchesCategory =
      selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesSearch =
      exercise.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscleGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.equipment?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Exercise Library</h1>
        <p className={styles.subtitle}>
          Filter by training focus, search movements, or watch technique demonstrations.
        </p>
      </header>

      {/* Controls: Search & Category Tabs */}
      <section className={styles.controlsSection}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
          placeholder="Search exercises, muscle groups, equipment..."
        />

        <div className={styles.filterGroup}>
          {['all', 'strength', 'cardio', 'flexibility'].map((category) => (
            <button
              key={category}
              className={`${styles.filterBtn} ${
                selectedCategory === category ? styles.activeFilter : ''
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className={styles.gridSection}>
        {filteredExercises.length > 0 ? (
          <div className={styles.exerciseGrid}>
            {filteredExercises.map((exercise) => (
              <ExerciseCard 
                key={exercise.id} 
                exercise={exercise} 
                onSelect={onSelect} 
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>No exercises found</h3>
            <p>Try adjusting your search query or switching categories.</p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchTerm('');
                handleCategoryChange('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

ExerciseList.propTypes = {
  exercises: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

export default ExerciseList;