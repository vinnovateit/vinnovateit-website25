"use client"

import React from 'react';

export default function Domains() {
  return (
    
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12"
      style={{
      backgroundImage: 'url(/bg-stars.png)', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      }}
      >
        <img
        src="/ring.png"
        alt="Ring"
         className="absolute top-0 right-0 w-[650px] h-auto pointer-events-none opacity-100 mix-blend-screen"
         style={{ opacity: 0.8 }} 
        />

        <img
        src="/flower.png"
        alt="Flower"
        className="absolute -top-15 left-[0px] h-80 w-80-none pointer-events-none"
        />
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading with Orbitron font */}
          <h1 
            className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-wider transform transition-transform duration-500"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            DOMAINS
          </h1>
          
          {/* Content with Plus Jakarta Sans */}
         
       <div
       className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
       style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
       >
       {[
       { title: "Web Dev", icon: "/globe.png" },
       { title: "Machine Learning", icon: "/laptop_.png" },
       { title: "App Dev", icon: "/mobile.png" }
       ].map((item, index) => (
      <div
        key={index}
        className="w-[280px] h-[150px] rounded-xl shadow-[0_0_30px_#ffffff22] flex flex-col items-center justify-center hover:scale-105 transform transition-transform duration-300"
        style={{ 
        background: 'linear-gradient(180deg, #000000 0%, #30084D 100%)',
        boxShadow: '0 0 4px 2px rgba(255, 255, 255, 0.8)' 

        }}
      >
          {item.icon.includes(".png") ? (
      <img src={item.icon} alt="" className="w-16 h-16 mb-4" />
    ) : (
        <div className="text-4xl mb-4">{item.icon}</div>
    )}
        <div className="text-xl font-normal">{item.title}</div>
      </div>
      ))}
     </div>


    <div
     className="flex justify-center gap-6 mt-6"
    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
    >
    {[
      { title: "UI/UX Design", icon: "/pen.png" },
      { title: "Competitive Coding", icon: "/terminal.png" }
    ].map((item, index) => (
      <div
        key={index}
         className="w-[280px] h-[150px] rounded-xl shadow-[0_0_30px_#ffffff22] flex flex-col items-center justify-center hover:scale-105 transform transition-transform duration-300"
        style={{ 
         background: 'linear-gradient(180deg, #000000 0%, #30084D 100%)',
         boxShadow: '0 0 4px 2px rgba(255, 255, 255, 0.8)' 
        }}
      >
          {item.icon.includes(".png") ? (
      <img src={item.icon} alt="" className="w-16 h-16 mb-4" />
    ) : (
        <div className="text-4xl mb-4">{item.icon}</div>
    )}
        <div className="text-xl font-normal">{item.title}</div>
      </div>
     ))}
    </div>
     
    </div>
      <img
        src="/flowertwo.png"
        alt="Flower"
        className="absolute bottom-0 right-0 h-[550px] w-auto pointer-events-none select-none"
         style={{ transform: 'translateY(55%)' }}
      />
  </div>
  );
}