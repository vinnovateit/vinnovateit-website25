'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * 
 * @param {string} variant - 'simple' for basic circular stars (AboutUs style) or 'complex' for multiple star types (Hero style)
 * @param {number} starCount - Total number of stars for simple variant (default: 100)
 * @param {string} className - Additional CSS classes to apply
 * @param {number} zIndex - Z-index for positioning (default: 0)
 * 
 */
export default function AnimatedStarsBackground({ 
  variant = 'simple', // 'simple' for AboutUs style, 'complex' for Hero style
  starCount = 100,
  className = '',
  zIndex = 0
}) {
  const starsRef = useRef([]);
  
  // Calculate star counts and configurations based on screen size and variant
  const getStarConfig = useCallback(() => {
    if (typeof window === 'undefined') {
      // Default values for server-side rendering
      return variant === 'simple' 
        ? { total: starCount }
        : { circular: 60, plus: 20, diamond: 15, sparkle: 10 };
    }
    
    const width = window.innerWidth;
    
    if (variant === 'simple') {
      // Simple variant for AboutUs - just return total count
      if (width < 640) return { total: Math.floor(starCount * 0.5) }; // mobile
      if (width < 1024) return { total: Math.floor(starCount * 0.75) }; // tablet
      return { total: starCount }; // desktop
    } else {
      // Complex variant for Hero - multiple star types
      if (width < 640) {
        return { circular: 30, plus: 10, diamond: 8, sparkle: 5 };
      } else if (width < 1024) {
        return { circular: 45, plus: 15, diamond: 12, sparkle: 8 };
      } else {
        return { circular: 60, plus: 20, diamond: 15, sparkle: 10 };
      }
    }
  }, [variant, starCount]);

  const [config, setConfig] = useState(getStarConfig());

  useEffect(() => {
    const handleResize = () => setConfig(getStarConfig());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [variant, starCount, getStarConfig]);

  // Simple star component for AboutUs style
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

  // Complex star components for Hero style
  const renderComplexStars = () => {
    const stars = [];
    let refIndex = 0;

    // Regular circular stars
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

    // Plus-shaped stars
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

    // Diamond-shaped stars
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

    // Sparkle stars (multi-point)
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
      {variant === 'simple' ? renderSimpleStars() : renderComplexStars()}
    </div>
  );
}
