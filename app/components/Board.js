"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { useScreenSize } from '@/app/components/hooks/useScreenSize';
import { useCarouselAnimation } from '@/app/components/hooks/useCarouselAnimations';
import MemberCard from './BoardCard';
import { boardMembers } from '@/app/components/data/boardMembers';

gsap.registerPlugin(ScrollTrigger);

export default function Board() {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const screenSize = useScreenSize();

  useCarouselAnimation(containerRef, carouselRef, screenSize, boardMembers);

  const getCardWidth = () => {
    return screenSize === 'mobile' ? 360 : screenSize === 'tablet' ? 320 : 340;
  };

  return (
    <div 
      ref={containerRef}
      className="z-80 relative flex flex-col items-center min-h-screen bg-black lg:px-6 md:pt-20 lg:pt-24 pb-12 lg:pb-20 overflow-hidden"
    >
      {/* Stars Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Background Decorations */}
      <img
        src="/flower3.png"
        alt="Flower"
        className="absolute top-0 w-24 h-auto lg:w-[16rem] left-0 md:w-32 opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10"
      />
      <img
        src="/flower4.png"
        alt="Flower Bottom Right"
        className="bottom-0 absolute w-40 h-auto right-0 md:w-44 lg:w-[28rem] opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10"
      />
      <img
        src="/ringmid.png"
        alt="Ring"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80vh] lg:w-[60vw]  
                   pointer-events-none mix-blend-screen 
                   opacity-60 md:opacity-70 lg:opacity-80 z-10"
      />

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center w-full px-4 mb-10 pt-16 md:pt-0">
        <div className="relative inline-block">
          {/* Top-left corner */}
          <span className="absolute -top-4 -left-6 w-8 h-0.5 bg-purple-300 md:w-10 md:h-2 md:-top-5 md:-left-7"></span>
          <span className="absolute -top-4 -left-6 w-0.5 h-8 bg-purple-300 md:w-2 md:h-10 md:-top-5 md:-left-7"></span>

          {/* Bottom-right corner */}
          <span className="absolute -bottom-4 -right-6 w-8 h-0.5 bg-purple-300 md:w-10 md:h-2 md:-bottom-5 md:-right-7"></span>
          <span className="absolute -bottom-4 -right-6 w-0.5 h-8 bg-purple-300 md:w-2 md:h-10 md:-bottom-5 md:-right-7"></span>
          
          {/* Heading */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-purple-200 text-center tracking-widest relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] px-4 leading-tight"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            <span className="block lg:inline">BOARD</span>
            <span className="block lg:inline lg:ml-4">MEMBERS</span>
          </h1>
        </div>

        {/* Carousel Container */}
        <div className="z-150 relative w-full perspective-1000 top-15">
          <div className="w-full overflow-hidden">
            <div
              ref={carouselRef}
              className="flex items-center"
              style={{ 
                width: `${boardMembers.length * getCardWidth()}px`,
                willChange: 'transform',
                transformStyle: 'preserve-3d'
              }}
            >
              {boardMembers.map((member, index) => (
                <MemberCard 
                  key={`member-${index}`} 
                  member={member} 
                  screenSize={screenSize} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}