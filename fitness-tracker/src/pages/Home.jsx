// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import styles from './Home.module.css';

// Image pools for each training category
const IMAGE_POOLS = {
  strength: [
    '/assets/images/strength-1.jpg',
    '/assets/images/strength-2.jpg',
    '/assets/images/strength-3.jpg',
    '/assets/images/strength-4.jpg',
    '/assets/images/strength-5.jpg',
    '/assets/images/strength-6.jpg',
  ],
  cardio: [
   '/assets/images/cardio-1.jpg',
    '/assets/images/cardio-2.jpg',
    '/assets/images/cardio-3.jpg',
    '/assets/images/cardio-4.jpg',
    '/assets/images/cardio-5.jpg',
  ],
  flexibility: [
    '/assets/images/flexibility-1.jpg',
    '/assets/images/flexibility-2.jpg',
    '/assets/images/flexibility-3.jpg',
    '/assets/images/flexibility-4.jpg',
    '/assets/images/flexibility-5.jpg',
    '/assets/images/flexibility-6.jpg',
  ],
};

const getRandomImage = (category) => {
  const pool = IMAGE_POOLS[category];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

const Home = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const initialCards = [
      {
        id: 'strength',
        title: 'Power & Resistance',
        category: 'strength',
        description: 'Heavy compound movements and progressive overload training',
        url: getRandomImage('strength'),
      },
      {
        id: 'cardio',
        title: 'High-Energy Conditioning',
        category: 'cardio',
        description: 'Dynamic stamina drills and metabolic conditioning',
        url: getRandomImage('cardio'),
      },
      {
        id: 'flexibility',
        title: 'Core & Active Recovery',
        category: 'flexibility',
        description: 'Flexibility, mobility, and targeted bodyweight control',
        url: getRandomImage('flexibility'),
      },
    ];

    setCards(initialCards);
  }, []);

  const handleCardClick = (category) => {
    navigate(`/exercises?category=${category}`);
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Shatter Your Limits. Build Unstoppable Strength.</h1>
        <p className={styles.heroSubtitle}>
          Master targeted exercises, construct custom weekly routines, and track your gains with a high-energy, performance-driven system.
        </p>
        <div className={styles.heroActions}>
          <Button variant="primary" onClick={() => navigate('/exercises')}>
            Explore Exercises
          </Button>
          <Button variant="secondary" onClick={() => navigate('/workout-planner')}>
            View Weekly Schedule
          </Button>
        </div>
      </header>

      <section className={styles.gallerySection}>
        <h2 className={styles.sectionTitle}>Training Focus Areas</h2>
        <div className={styles.imageGrid}>
          {cards.map((img) => (
            <div
              key={img.id}
              className={styles.imageCard}
              onClick={() => handleCardClick(img.category)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick(img.category);
              }}
            >
              <img src={img.url} alt={img.title} className={styles.cardImage} />
              <div className={styles.cardOverlay}>
                <h3>{img.title}</h3>
                <p>{img.description}</p>
                <span className={styles.exploreTag}>Explore Category →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;