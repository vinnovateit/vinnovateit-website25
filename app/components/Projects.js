"use client"

import React from 'react';
import Stars from './Stars';

export default function Projects() {
  return (
    
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading with Orbitron font */}
          <h1 
            className="text-6xl md:text-8xl font-bold text-white mb-12 tracking-wider transform transition-transform duration-500"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            PROJECTS
          </h1>
          
          {/* Content with Plus Jakarta Sans */}
          <div 
            className="text-gray-200 text-lg md:text-xl leading-relaxed space-y-8 max-w-3xl mx-auto"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            jakarta sans
          </div>
        </div>
      </div>
  );
}