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
      <div className="block md:hidden lg:block absolute -top-15 md:top-0 -left-40 md:-left-40 w-70 h-70  md:w-[30rem] md:h-[30rem] lg:top-[-80] lg:w-[30rem] lg:h-[30rem] pointer-events-none z-5">
        <Image
          src="/fullobj.png"
          alt="Flower"
          fill
          className="object-contain"
        />
      </div>
      
      <div className="absolute -bottom-2 md:bottom-0 -right-5 md:-right-5 w-55 h-55 md:w-[22rem] md:h-[22rem] lg:w-[28rem] lg:h-[28rem] opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-5">
        <Image
          src="/obj2.png"
          alt="Flower Bottom Right"
          fill
          className="object-contain"
        />
      </div>
      
      {/* Centered Big Ring */}
      <div className="absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 
                      w-[70rem] h-[70rem] 
                      md:w-[95rem] md:h-[95rem]
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
          containerClassName="relative inline-block mb-0 mt-30"
          isMultiline={true}
        />

        {/* Carousel Container */}
        <div className="z-10 relative w-full perspective-1000">
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