"use client"

import React from 'react';

// Import Google Fonts
const googleFontsLink = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&family=Rubik+Mono+One&display=swap');
`;

export default function Hero() {
  return (
    <>
      {/* Inject Google Fonts */}
      <style jsx global>{googleFontsLink}</style>
      
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading with Orbitron font */}
          <h1 
            className="text-6xl md:text-8xl font-bold text-white mb-12 tracking-wider transform transition-transform duration-500"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            VinnovateIT
          </h1>
          
          {/* Content with DM Sans */}
          <div 
            className="text-gray-200 text-lg md:text-xl leading-relaxed space-y-8 max-w-3xl mx-auto"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            dm sans
          </div>
        </div>
      </div>
    </>
  );
}