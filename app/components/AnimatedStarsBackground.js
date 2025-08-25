'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

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

const StarKeyframes = () => (
  <style>{`
    @keyframes fly-by {
      0%   { transform: rotate(var(--angle)) translateX(0) scaleX(0.001); opacity: 0.5; }
      10%  { opacity: 1; }
      90%  { opacity: 1; }
      100% { transform: rotate(var(--angle)) translateX(var(--distance)) scaleX(1); opacity: 0; }
    }
    @keyframes pulse {
      from { opacity: 0.5; transform: scale(0.7); }
      to { opacity: 1; transform: scale(1.3); }
    }
  `}</style>
);


export default function AnimatedStarsBackground({
  variant = 'simple',
  starCount = 100,
  className = '',
  zIndex = 0,
  seed = 50,
  loading = false,
}) {
  const [config, setConfig] = useState(() => getStarConfig(variant, starCount, typeof window !== 'undefined' ? window.innerWidth : 1024));

  useEffect(() => {
    const handleResize = () => {
      setConfig(getStarConfig(variant, starCount, window.innerWidth));
    };
    
    const debouncedHandleResize = debounce(handleResize, 250);
    
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [variant, starCount]);


  const starData = useMemo(() => {
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
        flyByDuration: `${depthProperties.speed}s`,
        flyByDelay: `${seededRandom() * depthProperties.speed}s`,
        depthProperties,
        pulseStyle: styleFn(seededRandom, color),
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
  }, [config, variant, seed]);

  return (
    <>
      <StarKeyframes />
      <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ zIndex, perspective: '500px' }}>
        <div className="absolute inset-0 w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {starData.map(star => {
            const isHyperdrive = loading;
            const finalClasses = { 'circular': "rounded-full", 'plus': "", 'diamond': "", 'sparkle': "", 'simple': "rounded-full" }[star.type];

            // Base styles for positioning and transition
            const baseStyle = {
              '--angle': `${star.angle}deg`,
              '--distance': `${star.depthProperties.distance}px`,
              transition: 'transform 1.5s ease-out, opacity 1.5s ease-out, background 1.5s ease-out',
              willChange: 'transform, opacity',
            };

            const hyperdriveStyle = {
              top: '50%',
              left: '50%',
              width: `${star.depthProperties.streakLength}px`,
              height: `${star.depthProperties.thickness}px`,
              background: `linear-gradient(to left, ${star.color}, rgba(255, 255, 255, 0))`,
              animation: `fly-by ${star.flyByDuration} ${star.flyByDelay} infinite linear backwards`,
              transformOrigin: '0% 50%',
            };
            
            const staticStyle = {
              ...star.pulseStyle,
              top: star.top,
              left: star.left,
              animation: star.type === 'simple' ? 'none' : `pulse infinite alternate ${star.pulseStyle.animationDuration || '2s'} ${star.pulseStyle.animationDelay || '0s'}`,
            };

            return (
              <div 
                key={star.key} 
                className={`absolute ${finalClasses}`} 
                style={{
                  ...baseStyle,
                  ...(isHyperdrive ? hyperdriveStyle : staticStyle)
                }}>
                {!isHyperdrive ? star.content : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}