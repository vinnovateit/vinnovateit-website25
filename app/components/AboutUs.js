"use client"

import React from 'react';
import Stars from './Stars';

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading with Orbitron font */}
        <h1 
          className="text-6xl md:text-8xl font-bold text-white mb-12 tracking-wider transform transition-transform duration-500"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          ABOUT US
        </h1>
        
        {/* Terminal window with outer glow */}
        <div className="w-full max-w-[80vw] relative">
          {/* Outer glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 via-cyan-500/50 to-purple-500/50 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
          
          {/* Terminal window */}
          <div className="relative bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-700/50 overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-6 py-4 bg-gray-800/80 border-b border-gray-700/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-gray-400 text-sm ml-4">terminal ~ /about_us</div>
            </div>
            
            {/* Terminal content */}
            <div className="p-8 flex items-start gap-8">
              {/* Left side - Text content */}
              <div className="flex-1 space-y-6">
                {/* Command prompt */}
                <div className="flex items-center gap-2 text-green-400 font-mono text-lg mb-8">
                  <span>&gt;</span>
                  <span className="text-white">ls -a about_us</span>
                </div>
                
                {/* About text with Plus Jakarta Sans */}
                <div 
                  className="space-y-6 text-white"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  <p className="text-lg leading-relaxed">
                    <span className="text-cyan-400 font-semibold">VinnovateIT</span> is the one stop destination for 
                    all you curious cats and satisfy your hunger 
                    in the diverse world of computer science.
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    To put it simply... we are the answer to the 
                    question "What if <span className="text-purple-400 font-semibold">Elon Musk</span> and <span className="text-purple-400 font-semibold">Albert Einstein</span> had a brain child?"
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    So come immerse yourself, in what we like 
                    to believe is the closest thing to <span className="text-yellow-400 font-semibold">Hogwarts</span>
                  </p>
                </div>
              </div>
              
              {/* Right side - Robot image */}
              <div className="flex-shrink-0 w-64 flex justify-center">
                <img 
                  src="https://via.placeholder.com/200x250/1a1a1a/ffffff?text=Robot" 
                  alt="Robot Character"
                  className="w-48 h-60 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}