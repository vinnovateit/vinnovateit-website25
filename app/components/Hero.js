"use client"

import React from 'react';
import Link from 'next/link';

const googleFontsLink = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rubik+Mono+One&family=DM+Sans&display=swap');
`;

export default function Hero() {
  return (
    <>
      {/* Inject Google Fonts */}
      <style jsx global>{googleFontsLink}</style>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h1
            className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider transition-transform duration-500 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            VinnovateIT
          </h1>

          {/* Content */}
          <div
            className="text-gray-200 text-lg md:text-xl leading-relaxed space-y-8 max-w-3xl mx-auto mb-10"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Think,Create,Innovate...
          </div>

          {/* Explore More Button */}
          <Link href="#about">
            <button className="bg-white text-black px-8 py-3 rounded-full border border-purple-400 shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

