"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { useScreenSize } from '@/app/components/hooks/useScreenSize';
import { useCarouselAnimation } from '@/app/components/hooks/useCarouselAnimations';
import BackgroundDecorations from './board-bg';
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
      className="relative flex flex-col items-center min-h-screen px-4 lg:px-6 pt-16 md:pt-20 lg:pt-24 pb-12 lg:pb-20 bg-gradient-to-b from-purple-900/20 via-black to-purple-900/20 overflow-hidden"
    >
      <BackgroundDecorations />

      {/* Heading */}
      <h1
        className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 md:mb-12 lg:mb-16 xl:mb-20 tracking-wider text-center relative z-20"
        style={{ fontFamily: "Orbitron, monospace" }}
      >
        BOARD MEMBERS
      </h1>

      {/* Carousel Container */}
      <div className="relative w-full perspective-1000">
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
              key={index} 
              member={member} 
              screenSize={screenSize} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}