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
        {[...Array(200)].map((_, i) => (
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
        className="absolute top-2 w-24 h-auto md:top-4 lg:w-[16rem] left-0 md:w-32 lg:top-8 opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10"
      />
      <img
        src="/flower4.png"
        alt="Flower Bottom Right"
        className="absolute bottom-2 w-40 h-auto right-0 md:w-44 lg:bottom-6 lg:w-[28rem] opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10"
      />
      <img
        src="/ringmid.png"
        alt="Ring"
        className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[800px] h-[320px] md:w-[1000px] md:h-[400px] lg:w-[1200px] lg:h-[480px] xl:w-[1400px] xl:h-[560px] pointer-events-none mix-blend-screen opacity-60 md:opacity-70 lg:opacity-80 z-10"
      />

      {/* Main Content */}
      <div className="relative z-20 w-full flex flex-col items-center">
        <h1
  className="relative text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-purple-100 mb-10 md:mb-12 lg:mb-16 xl:mb-20 tracking-wider"
  style={{
    fontFamily: "Orbitron, monospace",
    textShadow: "0 0 8px rgba(192, 128, 255, 0.9), 0 0 12px rgba(192, 128, 255, 0.6)",
  }}
>
  <span className="absolute -top-4 -left-4 w-6 h-6 border-t-4 border-l-4 border-purple-500"></span>
  <span className="absolute -bottom-4 -right-4 w-6 h-6 border-b-4 border-r-4 border-purple-500"></span>
  BOARD MEMBERS
</h1>



        {/* Carousel Container */}
        <div className="relative w-full perspective-1000">
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