"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import Image from "next/image";
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
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-64 lg:h-64 opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10">
        <Image
          src="/flower3.png"
          alt="Flower"
          fill
          className="object-contain"
        />
      </div>
      
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10">
        <Image
          src="/flower4.png"
          alt="Flower Bottom Right"
          fill
          className="object-contain"
        />
      </div>
      
      {/* Centered Big Ring */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[45rem] h-[45rem] 
                      md:w-[90rem] md:h-[90rem]
                      pointer-events-none mix-blend-screen opacity-60 md:opacity-70 lg:opacity-80 z-10">
        <Image
          src="/big_ring.png"
          alt="Ring"
          fill
          className="object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center w-full px-4 mb-10 pt-16 md:pt-0">
        <div className="relative inline-block mb-8 md:mb-12 lg:mb-16">
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
        <div className="z-150 relative w-full perspective-1000 py-8 md:py-12 lg:py-16">
          <div className="w-full overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center">
            <div
              ref={carouselRef}
              className="flex items-center md:space-x-5 lg:space-x-10"
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