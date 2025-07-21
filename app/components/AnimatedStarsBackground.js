'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * 
 * @param {string} variant - 'simple', 'complex', or 'structured' for grid layout (Projects style)
 * @param {number} starCount - Total number of stars for simple/structured variant (default: 100)
 * @param {string} className - Additional CSS classes to apply
 * @param {number} zIndex - Z-index for positioning (default: 0)
 * 
 */
export default function AnimatedStarsBackground({ 
  variant = 'simple', 
  starCount = 100,
  className = '',
  zIndex = 0
}) {
  const starsRef = useRef([]);
  
  const getStarConfig = useCallback(() => {
    if (typeof window === 'undefined') {
      return variant === 'complex' 
        ? { circular: 60, plus: 20, diamond: 15, sparkle: 10 }
        : { total: starCount };
    }
    
    const width = window.innerWidth;

    if (variant === 'complex') {
      if (width < 640) return { circular: 30, plus: 10, diamond: 8, sparkle: 5 };
      if (width < 1024) return { circular: 45, plus: 15, diamond: 12, sparkle: 8 };
      return { circular: 60, plus: 20, diamond: 15, sparkle: 10 };
    }

    if (variant === 'structured') {
      // Grid star count reduces on smaller screens for structured layout
      if (width < 640) return { total: Math.floor(starCount * 0.5) };
      if (width < 1024) return { total: Math.floor(starCount * 0.75) };
      return { total: starCount };
    }

    // Default simple variant
    if (width < 640) return { total: Math.floor(starCount * 0.5) };
    if (width < 1024) return { total: Math.floor(starCount * 0.75) };
    return { total: starCount };
  }, [variant, starCount]);

  const [config, setConfig] = useState(getStarConfig());

  useEffect(() => {
    const handleResize = () => setConfig(getStarConfig());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [variant, starCount, getStarConfig]);

  const renderSimpleStars = () => {
    return [...Array(config.total)].map((_, i) => (
      <div
        key={`star-${i}`}
        className="absolute bg-white rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 0.5}px`,
          height: `${Math.random() * 2 + 0.5}px`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${Math.random() * 2 + 2}s`
        }}
      />
    ));
  };

 const renderStructuredStars = () => {
  const stars = [];
  const gridSize = Math.ceil(Math.sqrt(config.total));
  const cellWidth = 100 / gridSize;
  const cellHeight = 100 / gridSize;
  let placed = 0;
  let seed = 42; // You can customize this to any constant

  const seededRandom = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (placed >= config.total) break;

      const randomX = seededRandom() * cellWidth;
      const randomY = seededRandom() * cellHeight;
      const size = seededRandom() * 1.5 + 0.7;
      const delay = seededRandom() * 2;
      const duration = seededRandom() * 2 + 2;

      stars.push(
        <div
          key={`star-structured-${placed}`}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${col * cellWidth + randomX}%`,
            top: `${row * cellHeight + randomY}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );

      placed++;
    }
  }
  return stars;
};


  const renderComplexStars = () => {
    const stars = [];
    let refIndex = 0;

    for (let i = 0; i < config.circular; i++) {
      stars.push(
        <div
          key={`star-circle-${i}`}
          ref={el => starsRef.current[refIndex++] = el}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 0.5}px`,
            height: `${Math.random() * 2 + 0.5}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.4)'
          }}
        />
      );
    }

    for (let i = 0; i < config.plus; i++) {
      stars.push(
        <div
          key={`star-plus-${i}`}
          ref={el => starsRef.current[refIndex++] = el}
          className="absolute text-white animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 8 + 6}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            textShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)',
            filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))'
          }}
        >
          +
        </div>
      );
    }

    for (let i = 0; i < config.diamond; i++) {
      stars.push(
        <div
          key={`star-diamond-${i}`}
          ref={el => starsRef.current[refIndex++] = el}
          className="absolute bg-white animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 3}px`,
            height: `${Math.random() * 4 + 3}px`,
            transform: 'rotate(45deg)',
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)',
            filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))'
          }}
        />
      );
    }

    for (let i = 0; i < config.sparkle; i++) {
      stars.push(
        <div
          key={`star-sparkle-${i}`}
          ref={el => starsRef.current[refIndex++] = el}
          className="absolute text-white animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 10 + 8}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            textShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.5)',
            filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.7))'
          }}
        >
          ✦
        </div>
      );
    }

    return stars;
  };

  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{ zIndex }}
    >
      {variant === 'structured' 
        ? renderStructuredStars()
        : variant === 'complex'
        ? renderComplexStars()
        : renderSimpleStars()}
    </div>
  );
}