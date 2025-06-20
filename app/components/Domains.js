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
    { title: "Competitive Coding", icon: "/terminal.png" },
    { title: "Marketing and Management", icon: "/terminal.png" }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      {/* Decorative elements */}
      <div className="absolute -top-[20rem] left-[5rem] md:top-[-50rem] md:right-[-50rem] md:left-auto
                w-[45rem] h-[45rem] 
                md:w-[90rem] md:h-[90rem] 
                pointer-events-none mix-blend-screen 
                opacity-60 md:opacity-70 lg:opacity-80 
                z-10">
  <Image
    src="/big_ring.png"
    alt="Ring"
    width={720}
    height={720}
    className="w-full h-full object-contain"
  />
</div>

      <Image
        src="/3D_object1_About_us.png"
        alt="Overlay"
        width={250}
        height={200}
        className="absolute top-16 -left-2 z-0 pointer-events-none w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto"
      />

      <div className="max-w-7xl mx-auto text-center z-10 w-full">
        {/* Main heading */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-12 sm:mb-16 md:mb-20 lg:mb-24 tracking-wider mt-32 sm:mt-0"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          Domains
        </h1>
        
        {/* Simple flexbox layout */}
        <div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-20"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          {domains.map((item, index) => (
            <DomainCard 
              key={index}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
      </div>

      {/* Bottom decorative element */}
      <Image
        src="/flowertwo.png"
        alt="Flower"
        width={550}
        height={550}
        className="absolute bottom-0 right-0 w-64 sm:w-80 md:w-96 lg:w-[30rem] h-auto pointer-events-none select-none z-10"
        style={{ transform: 'translateY(55%)' }}
      />
    </div>
  );
}