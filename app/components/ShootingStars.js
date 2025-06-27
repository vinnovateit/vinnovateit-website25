'use client';

import { useEffect, useState } from 'react';

export default function ShootingStars({ count = 8 }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [stars] = useState(() =>
  Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 6,
    left: Math.random() * 100,
    topBase: Math.random() * 100,
    duration: 35 + Math.random() * 15,
    delay: Math.random() * 10,
  }))
);



  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* Subtle white light to brighten background */}
      <div className="absolute inset-0 bg-white opacity-[0.04] mix-blend-screen pointer-events-none" />

      {stars.map((star) => {
        const scrollOffsetX = scrollY * 0.02;
        const scrollOffsetY = scrollY * 0.01;

        return (
          <div
            key={star.id}
            className="absolute bg-white rounded-full shooting-star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `calc(${star.left}% + ${scrollOffsetX}px)`,
              top: `calc(${star.topBase}% + ${scrollOffsetY}px)`,
              animation: `shoot ${star.duration}s linear ${star.delay}s infinite`,
              filter:
                'drop-shadow(0 0 12px white) drop-shadow(0 0 10px #ccf) drop-shadow(0 0 20px #88f)',
              opacity: 0.95,
            }}
          />
        );
      })}
    </div>
  );
}
