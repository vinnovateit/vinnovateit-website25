"use client"

import React from 'react';
import Image from 'next/image';
import DomainCard from './DomainCard'; // Adjust the import path as needed

export default function Domains() {
  const domains = [
    { title: "Web Dev", icon: "/globe.png" },
    { title: "Machine Learning", icon: "/laptop_.png" },
    { title: "App Dev", icon: "/mobile.png" },
    { title: "UI/UX Design", icon: "/pen.png" },
    { title: "Competitive Coding", icon: "/terminal.png" }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      {/* Ring decoration - responsive positioning and sizing */}
      <Image
        src="/ring.png"
        alt="Ring"
        width={650}
        height={650}
        className="absolute top-0 right-0 w-[300px] sm:w-[450px] lg:w-[650px] h-auto pointer-events-none opacity-80 mix-blend-screen"
      />

      {/* Flower decoration - responsive positioning and sizing */}
      <Image
        src="/flower.png"
        alt="Flower"
        width={320}
        height={320}
        className="absolute top-0 sm:top-8 left-0 h-40 w-40 sm:h-60 sm:w-60 lg:h-80 lg:w-80 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto text-center z-10">
        {/* Enhanced responsive heading - positioned below decorations on mobile */}
        <h1 
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-16 sm:mb-20 lg:mb-24 tracking-wider mt-48 sm:mt-0"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          Domains
        </h1>
        
        {/* Cards container with responsive layout */}
        <div
          className="space-y-6"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          {/* Mobile: All cards in single column */}
          <div className="block sm:hidden space-y-4">
            {domains.map((item, index) => (
              <div key={index} className="flex justify-center">
                <DomainCard 
                  title={item.title}
                  icon={item.icon}
                  width="w-[320px]"
                  height="h-[160px]"
                  iconSize="w-10 h-10"
                  textSize="text-lg"
                  gradientHeight="h-12"
                />
              </div>
            ))}
          </div>

          {/* Tablet: 2-2-1 layout */}
          <div className="hidden sm:block lg:hidden">
            {/* First row - 2 cards */}
            <div className="grid grid-cols-2 gap-6 justify-items-center mb-6">
              {domains.slice(0, 2).map((item, index) => (
                <DomainCard 
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  width="w-[350px]"
                  height="h-[170px]"
                  iconSize="w-12 h-12"
                  textSize="text-xl"
                  gradientHeight="h-14"
                  className="hover:shadow-[0_0_35px_rgba(147,51,234,0.6)]"
                />
              ))}
            </div>

            {/* Second row - 2 cards */}
            <div className="grid grid-cols-2 gap-6 justify-items-center mb-6">
              {domains.slice(2, 4).map((item, index) => (
                <DomainCard 
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  width="w-[350px]"
                  height="h-[170px]"
                  iconSize="w-12 h-12"
                  textSize="text-xl"
                  gradientHeight="h-14"
                />
              ))}
            </div>

            {/* Third row - 1 card centered */}
            <div className="flex justify-center">
              <DomainCard 
                title={domains[4].title}
                icon={domains[4].icon}
                width="w-[350px]"
                height="h-[170px]"
                iconSize="w-12 h-12"
                textSize="text-xl"
                gradientHeight="h-14"
                className="hover:shadow-[0_0_35px_rgba(147,51,234,0.6)]"
              />
            </div>
          </div>

          {/* Desktop: 3-2 layout */}
          <div className="hidden lg:block">
            {/* First row - 3 cards */}
            <div className="grid grid-cols-3 gap-6 justify-items-center mb-6">
              {domains.slice(0, 3).map((item, index) => (
                <DomainCard 
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  width="w-[380px] xl:w-[420px]"
                  height="h-[180px] xl:h-[200px]"
                  iconSize="w-14 h-14 xl:w-16 xl:h-16"
                  textSize="text-2xl xl:text-2xl"
                  gradientHeight="h-16 xl:h-20"
                  className="hover:shadow-[0_0_40px_rgba(147,51,234,0.6)]"
                />
              ))}
            </div>

            {/* Second row - 2 cards centered */}
            <div className="flex justify-center gap-6">
              {domains.slice(3, 5).map((item, index) => (
                <DomainCard 
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  width="w-[380px] xl:w-[420px]"
                  height="h-[180px] xl:h-[200px]"
                  iconSize="w-14 h-14 xl:w-16 xl:h-16"
                  textSize="text-2xl xl:text-2xl"
                  gradientHeight="h-16 xl:h-20"
                  className="hover:shadow-[0_0_40px_rgba(147,51,234,0.6)]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom flower decoration - responsive positioning and sizing */}
      <Image
        src="/flowertwo.png"
        alt="Flower"
        width={550}
        height={550}
        className="absolute bottom-0 right-0 h-[300px] sm:h-[400px] lg:h-[550px] w-auto pointer-events-none select-none"
        style={{ transform: 'translateY(55%)' }}
      />
    </div>
  );
}