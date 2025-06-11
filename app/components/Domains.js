"use client"

import React from 'react';

export default function Domains() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12"
      style={{
        backgroundImage: 'url(/bg-stars.png)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Ring decoration - responsive positioning and sizing */}
      <img
        src="/ring.png"
        alt="Ring"
        className="absolute top-0 right-0 w-[300px] sm:w-[450px] lg:w-[650px] h-auto pointer-events-none opacity-80 mix-blend-screen"
      />

      {/* Flower decoration - responsive positioning and sizing */}
      <img
        src="/flower.png"
        alt="Flower"
        className="absolute -top-8 sm:-top-15 left-0 h-40 w-40 sm:h-60 sm:w-60 lg:h-80 lg:w-80 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto text-center z-10">
        {/* Responsive heading */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 tracking-wider transform transition-transform duration-500"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          DOMAINS
        </h1>
        
        {/* Cards container with responsive layout */}
        <div
          className="space-y-6"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          {/* Mobile: All cards in single column */}
          <div className="block sm:hidden space-y-4">
            {[
              { title: "Web Dev", icon: "/globe.png" },
              { title: "Machine Learning", icon: "/laptop_.png" },
              { title: "App Dev", icon: "/mobile.png" },
              { title: "UI/UX Design", icon: "/pen.png" },
              { title: "Competitive Coding", icon: "/terminal.png" }
            ].map((item, index) => (
              <div key={index} className="flex justify-center">
                <div
                  className="w-[280px] h-[150px] rounded-2xl flex flex-col items-center justify-center hover:scale-105 transform transition-all duration-300 group"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img src={item.icon} alt="" className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-lg font-medium px-2 text-center text-white">{item.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet: 2-2-1 layout */}
          <div className="hidden sm:block lg:hidden">
            {/* First row - 2 cards */}
            <div className="grid grid-cols-2 gap-6 justify-items-center mb-6">
              {[
                { title: "Web Dev", icon: "/globe.png" },
                { title: "Machine Learning", icon: "/laptop_.png" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-[300px] h-[160px] rounded-2xl flex flex-col items-center justify-center hover:scale-105 transform transition-all duration-300 group"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img src={item.icon} alt="" className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-xl font-medium px-2 text-center text-white">{item.title}</div>
                </div>
              ))}
            </div>

            {/* Second row - 2 cards */}
            <div className="grid grid-cols-2 gap-6 justify-items-center mb-6">
              {[
                { title: "App Dev", icon: "/mobile.png" },
                { title: "UI/UX Design", icon: "/pen.png" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-[300px] h-[160px] rounded-2xl flex flex-col items-center justify-center hover:scale-105 transform transition-all duration-300 group"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img src={item.icon} alt="" className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-xl font-medium px-2 text-center text-white">{item.title}</div>
                </div>
              ))}
            </div>

            {/* Third row - 1 card centered */}
            <div className="flex justify-center">
              <div
                className="w-[300px] h-[160px] rounded-2xl flex flex-col items-center justify-center hover:scale-105 transform transition-all duration-300 group"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <img src="/terminal.png" alt="" className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-xl font-medium px-2 text-center text-white">Competitive Coding</div>
              </div>
            </div>
          </div>

          {/* Desktop: 3-2 layout */}
          <div className="hidden lg:block">
            {/* First row - 3 cards */}
            <div className="grid grid-cols-3 gap-6 justify-items-center mb-6">
              {[
                { title: "Web Dev", icon: "/globe.png" },
                { title: "Machine Learning", icon: "/laptop_.png" },
                { title: "App Dev", icon: "/mobile.png" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-[320px] h-[170px] xl:w-[350px] xl:h-[180px] rounded-2xl flex flex-col items-center justify-center hover:scale-105 transform transition-all duration-300 group"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img src={item.icon} alt="" className="w-14 h-14 xl:w-16 xl:h-16 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl xl:text-2xl font-medium px-2 text-center text-white">{item.title}</div>
                </div>
              ))}
            </div>

            {/* Second row - 2 cards centered */}
            <div className="flex justify-center gap-6">
              {[
                { title: "UI/UX Design", icon: "/pen.png" },
                { title: "Competitive Coding", icon: "/terminal.png" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-[320px] h-[170px] xl:w-[350px] xl:h-[180px] rounded-2xl flex flex-col items-center justify-center hover:scale-105 transform transition-all duration-300 group"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img src={item.icon} alt="" className="w-14 h-14 xl:w-16 xl:h-16 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl xl:text-2xl font-medium px-2 text-center text-white">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom flower decoration - responsive positioning and sizing */}
      <img
        src="/flowertwo.png"
        alt="Flower"
        className="absolute bottom-0 right-0 h-[300px] sm:h-[400px] lg:h-[550px] w-auto pointer-events-none select-none"
        style={{ transform: 'translateY(55%)' }}
      />
    </div>
  );
}