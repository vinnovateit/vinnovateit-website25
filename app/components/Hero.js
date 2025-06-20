'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center overflow-hidden">
      {/* Background circle */}
      <div className="absolute top-0 left-0 w-24 md:w-32 lg:w-[16rem] h-auto opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10">
        <Image
          src="/hero_3d1.png"
          alt="Flower"
          width={256}
          height={256}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="absolute top-0 left-1/2 w-[80rem] h-[60rem] md:w-[150rem] md:h-[180rem] -translate-x-1/2 -translate-y-1/2 opacity-60 z-0 pointer-events-none">
        <Image
          src="/hero.png"
          alt="White Glow"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          VinnovateIT
        </h1>

        <p
          className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Think, Create, Innovate...
        </p>

        <Link href="#about">
          <button
            className="bg-white text-black px-8 py-3 rounded-full border border-purple-400 shadow-lg 
                       hover:shadow-purple-500/40 hover:scale-105 active:scale-95 
                       transition-all duration-300 font-medium text-base sm:text-lg"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Explore More
          </button>
        </Link>
      </div>

      {/* Scroll indicator */}
    </div>
  );
}
