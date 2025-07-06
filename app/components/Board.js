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
      <div className="absolute top-0 left-0 w-40 h-40 sm:w-32 sm:h-32 md:w-55 md:h-55 lg:w-84 lg:h-84 opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-5">
        <Image
          src="/flower3.png"
          alt="Flower"
          fill
          className="object-cover"
        />
      </div>
      
    <div className="absolute bottom-0 right-0 z-[5] pointer-events-none">
    <Image
      src="/flower4.png"
      alt="Flower Bottom Right"
      width={400}
      height={400}
      className="object-cover opacity-80 sm:opacity-80 md:opacity-90
                 w-[16rem] h-[16rem] sm:w-[18rem] sm:h-[18rem] md:w-[24rem] md:h-[24rem] lg:w-[28rem] lg:h-[28rem]"
    />
    </div>
      
      {/* Centered Big Ring */}
      <div
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
             -translate-y-110 sm:-translate-y-170 md:-translate-y-190 lg:-translate-y-210 
             w-[70rem] h-[70rem] 
             sm:w-[100rem] sm:h-[100rem] 
             md:w-[100rem] md:h-[100rem] 
             lg:w-[120rem] lg:h-[120rem]
             pointer-events-none mix-blend-screen opacity-60 md:opacity-70 lg:opacity-80 z-[5]"
      >
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
          containerClassName="relative inline-block mb-0 md:mb-3 lg:mb-4 mt-30 md:mt-32 lg:mt-36"
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