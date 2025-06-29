"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import Image from "next/image";
import { useScreenSize } from '@/app/components/hooks/useScreenSize';
import { useCarouselAnimation } from '@/app/components/hooks/useCarouselAnimations';
import MemberCard from './BoardCard';
import { boardMembers } from '@/app/components/data/boardMembers';
import SectionHeading from './SectionHeading';
import AnimatedStarsBackground from './AnimatedStarsBackground';

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
      id="board"
      ref={containerRef}
      className="relative flex flex-col items-center min-h-screen lg:px-6 md:pt-20 lg:pt-24 pb-12 lg:pb-20 overflow-hidden z-10"
    >
      {/* Animated stars background */}
      <AnimatedStarsBackground 
        variant="simple" 
        starCount={100}
        zIndex={1}
      />

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-64 lg:h-64 opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-5">
        <Image
          src="/flower3.png"
          alt="Flower"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-5">
        <Image
          src="/flower4.png"
          alt="Flower Bottom Right"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Centered Big Ring */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[45rem] h-[45rem] 
                      md:w-[90rem] md:h-[90rem]
                      pointer-events-none mix-blend-screen opacity-60 md:opacity-70 lg:opacity-80 z-5">
        <Image
          src="/big_ring.png"
          alt="Ring"
          fill
          className="object-contain"
        />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center w-full mb-10 pt-16 md:pt-0">
        <SectionHeading 
          title="BOARD MEMBERS"
          className="text-center"
          containerClassName="relative inline-block mb-0 md:mb-3 lg:mb-4 mt-5 md:mt-32 lg:mt-36"
          isMultiline={true}
        />

        {/* Carousel Container */}
        <div className="z-10 relative w-full perspective-1000 py-2 md:py-3 lg:py-4">
          <div className="w-full overflow-hidden flex items-center">
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