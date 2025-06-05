"use client"

import React from 'react';

export default function Stars({ children, className = "" }) {
  return (
    <div className={`relative min-h-screen bg-black overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        {[...Array(350)].map((_, i) => (
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
        ))}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}