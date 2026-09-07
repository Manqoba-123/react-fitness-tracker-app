// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import styles from './Home.module.css';

// Image pools for each training category
const IMAGE_POOLS = {
  strength: [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
  ],
  cardio: [
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
  ],
  flexibility: [
    'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
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
    // Pick a random image for each category whenever the page loads
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