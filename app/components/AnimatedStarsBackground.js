'use client';

import React, { useEffect, useState, useMemo } from 'react';

/**
 * @param {string} variant - 'simple', 'complex', or 'structured'
 * @param {number} starCount - Total number of stars
 * @param {string} className - Additional CSS classes
 * @param {number} zIndex - Z-index for positioning
 * @param {number} seed - Seed for consistent random number generation
 * @param {boolean} loading - Set to true to activate the hyperdrive effect
 */

const THEME_COLORS = ['#A378FF', '#C4A4FF', '#8B5CF6', '#A855F7', '#6D28D9'];

const createSeededRandom = (initialSeed) => {
  let seed = initialSeed;
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
};

const getStarConfig = (variant, starCount, width) => {
  if (variant === 'complex') {
    if (width < 640) return { circular: 30, plus: 10, diamond: 8, sparkle: 5 };
    if (width < 1024) return { circular: 45, plus: 15, diamond: 12, sparkle: 8 };
    return { circular: 60, plus: 20, diamond: 15, sparkle: 10 };
  }
  const baseCount = variant === 'structured' ? starCount : 100;
  if (width < 640) return { total: Math.floor(baseCount * 0.5) };
  if (width < 1024) return { total: Math.floor(baseCount * 0.75) };
  return { total: baseCount };
};

export default function AnimatedStarsBackground({
  variant = 'simple',
  starCount = 100,
  className = '',
  zIndex = 0,
  seed = 50,
  loading = false,
}) {
  const [isClient, setIsClient] = useState(false);
  const [config, setConfig] = useState(() => getStarConfig(variant, starCount, 1024));

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setConfig(getStarConfig(variant, starCount, window.innerWidth));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [variant, starCount]);


  const starData = useMemo(() => {
    if (!isClient) return [];

    const seededRandom = createSeededRandom(seed);
    const newStars = [];
    const totalStars = config.total || Object.values(config).reduce((a, b) => a + b, 0);

    const addStar = (type, styleFn, content = null) => {
      const finalTop = seededRandom() * 100;
      const finalLeft = seededRandom() * 100;
      const angle = Math.atan2(finalTop - 50, finalLeft - 50) * (180 / Math.PI);
      const color = seededRandom() > 0.8 ? THEME_COLORS[Math.floor(seededRandom() * THEME_COLORS.length)] : 'white';
      const depth = seededRandom();
      
      let depthProperties;
      if (depth > 0.9) {
        depthProperties = { distance: 900, speed: 0.7, streakLength: 300, thickness: 2.5 };
      } else if (depth > 0.6) {
        depthProperties = { distance: 600, speed: 1.2, streakLength: 150, thickness: 1.5 };
      } else {
        depthProperties = { distance: 300, speed: 2, streakLength: 75, thickness: 0.7 };
      }
      
      newStars.push({
        key: `star-${type}-${newStars.length}`,
        type, content, top: `${finalTop}%`, left: `${finalLeft}%`, angle, color,
        animationDelay: `${seededRandom() * depthProperties.speed}s`,
        animationDuration: `${depthProperties.speed}s`,
        depthProperties,
        finalStyle: styleFn(seededRandom, color),
      });
    };
    
    if (variant === 'complex') {
        for (let i = 0; i < config.circular; i++) addStar('circular', (rng, color) => ({ backgroundColor: color, width: `${rng() * 2 + 0.5}px`, height: `${rng() * 2 + 0.5}px`, animationDelay: `${rng() * 3}s`, animationDuration: `${rng() * 2 + 2}s`, boxShadow: `0 0 8px ${color}` }));
        for (let i = 0; i < config.plus; i++) addStar('plus', (rng, color) => ({ color: color, fontSize: `${rng() * 8 + 6}px`, animationDelay: `${rng() * 3}s`, animationDuration: `${rng() * 2 + 2}s`, textShadow: `0 0 6px ${color}` }), '+');
        for (let i = 0; i < config.diamond; i++) addStar('diamond', (rng, color) => ({ backgroundColor: color, width: `${rng() * 4 + 3}px`, height: `${rng() * 4 + 3}px`, transform: 'rotate(45deg)', animationDelay: `${rng() * 3}s`, animationDuration: `${rng() * 2 + 2}s`, boxShadow: `0 0 10px ${color}` }));
        for (let i = 0; i < config.sparkle; i++) addStar('sparkle', (rng, color) => ({ color: color, fontSize: `${rng() * 10 + 8}px`, animationDelay: `${rng() * 3}s`, animationDuration: `${rng() * 2 + 2}s`, textShadow: `0 0 8px ${color}` }), '✦');
    } else {
        for (let i = 0; i < totalStars; i++) addStar('simple', (rng, color) => ({ backgroundColor: color, width: `${rng() * 2 + 0.5}px`, height: `${rng() * 2 + 0.5}px`, animationDelay: `${rng() * 3}s`, animationDuration: `${rng() * 2 + 2}s` }));
    }

    return newStars;
  }, [config, variant, seed, isClient]);

  return (
    <>
      <style>{`
        @keyframes fly-by {
          0%   { transform: rotate(var(--angle)) translateX(0) scaleX(0.001); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: rotate(var(--angle)) translateX(var(--distance)) scaleX(1); transform-origin: 0% 50%; opacity: 0; }
        }
        @keyframes pulse {
          from { opacity: 0.6; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
      
      <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ zIndex, perspective: '500px' }}>
        {/* Hyperdrive Effect Container */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-out"
          style={{ opacity: loading ? 1 : 0, transformStyle: 'preserve-3d' }}
        >
          {starData.map(star => (
            <div key={star.key} className="absolute" style={{
                '--angle': `${star.angle}deg`, '--distance': `${star.depthProperties.distance}px`,
                top: '50%', left: '50%',
                width: `${star.depthProperties.streakLength}px`, height: `${star.depthProperties.thickness}px`,
                background: `linear-gradient(to left, ${star.color}, rgba(255, 255, 255, 0))`,
                animation: `fly-by ${star.animationDuration} ${star.animationDelay} infinite linear backwards`,
                transformOrigin: '0% 50%',
            }}/>
          ))}
        </div>

        {/* Static Stars Container */}
        <div 
          className="absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in"
          style={{ opacity: loading ? 0 : 1, transformStyle: 'preserve-3d' }}
        >
            {starData.map(star => {
                const finalClasses = { 'circular': "rounded-full", 'plus': "", 'diamond': "", 'sparkle': "", 'simple': "rounded-full" }[star.type];
                return (
                    <div key={star.key} className={`absolute animate-pulse ${finalClasses}`} style={{ ...star.finalStyle, top: star.top, left: star.left }}>
                        {star.content}
                    </div>
                );
            })}
        </div>
      </div>
    </>
  );
}