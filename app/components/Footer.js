"use client"

import React from 'react';

// Import Google Fonts
const googleFontsLink = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&family=Rubik+Mono+One&display=swap');
`;

export default function AboutUs() {
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
            FOOTER
          </h1>
          
          {/* Content with Plus Jakarta Sans */}
          <div 
            className="text-gray-200 text-lg md:text-xl leading-relaxed space-y-8 max-w-3xl mx-auto"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            jakarta sans
          </div>
          
          {/* New section with Rubik Mono One */}
          <div 
            className="text-gray-300 text-2xl md:text-[7.25rem] font-bold mt-12"
            style={{ fontFamily: 'Rubik Mono One, monospace' }}
          >
            LET'S WORK
          </div>
        </div>
      </div>
    </>
  );
}