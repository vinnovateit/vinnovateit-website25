"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useScreenSize } from '@/app/components/hooks/useScreenSize';
import { useCarouselAnimation } from '@/app/components/hooks/useCarouselAnimations';
import MemberCard from './BoardCard';
import { boardMembers } from '@/app/components/data/boardMembers';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Board() {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const screenSize = useScreenSize();
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  
  // Sensitivity factor - adjust this to control how much scroll per drag
  const dragSensitivity = 1;

  useCarouselAnimation(containerRef, carouselRef, screenSize, boardMembers);

  const getCardWidth = () => {
    return screenSize === 'mobile' ? 360 : screenSize === 'tablet' ? 320 : 340;
  };

  // Handle drag start
  const handleDragStart = useCallback((clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setScrollStart(window.pageYOffset || document.documentElement.scrollTop);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  }, []);

  // Handle drag move
  const handleDragMove = useCallback((clientX) => {
    if (!isDragging) return;
    
    const deltaX = startX - clientX; // Reversed: left drag = positive delta
    const newScrollY = scrollStart + (deltaX * dragSensitivity);
    
    // Smooth scroll to new position
    window.scrollTo({
      top: Math.max(0, newScrollY),
      behavior: 'auto' // Use 'auto' for immediate response during drag
    });
  }, [isDragging, startX, scrollStart]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent default scroll behavior
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Set up global event listeners
  useEffect(() => {
    if (isDragging) {
      // Mouse events
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // Touch events
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const decorationVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const ringVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      id="board"
      ref={containerRef}
      className="relative flex flex-col items-center min-h-screen lg:px-6 md:pt-20 lg:pt-24 pb-12 lg:pb-20 overflow-hidden z-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background Decorations */}
      <motion.div 
        className="block md:hidden lg:block absolute -top-15 md:top-0 -left-40 md:-left-40 w-70 h-70  md:w-[30rem] md:h-[30rem] lg:top-[-80] lg:w-[30rem] lg:h-[30rem] pointer-events-none z-5"
        variants={decorationVariants}
      >
        <Image
          src="/fullobj.webp"
          alt="Flower"
          fill
          className="object-contain"
        />
      </motion.div>
      
      <motion.div 
        className="absolute -bottom-2 md:bottom-0 -right-5 md:-right-5 w-55 h-55 md:w-[22rem] md:h-[22rem] lg:w-[28rem] lg:h-[28rem] opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-5"
        variants={decorationVariants}
      >
        <Image
          src="/obj2.webp"
          alt="Flower Bottom Right"
          fill
          className="object-contain"
        />
      </motion.div>
      
      {/* Centered Big Ring - Made dimmer */}
      <motion.div 
        className="absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 
                    w-[70rem] h-[70rem] 
                    md:w-[95rem] md:h-[95rem]
                    pointer-events-none mix-blend-screen opacity-30 md:opacity-40 lg:opacity-50 z-5"
        variants={ringVariants}
      >
        <Image
          src="/big_ring.webp"
          alt="Ring"
          fill
          className="object-contain"
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative flex flex-col items-center justify-center w-full mb-10 pt-16 md:pt-0"
        variants={containerVariants}
      >
        <SectionHeading 
          title="BOARD MEMBERS"
          className="text-center"
          containerClassName="relative inline-block mb-0 mt-30"
          isMultiline={true}
        />

        {/* Carousel Container with Drag Functionality */}
        <div className="z-10 relative w-full perspective-1000">
          <div 
            className={`w-full overflow-hidden flex items-center py-8 px-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ touchAction: 'none' }} // Disable default touch behaviors
          >
            <div
              ref={carouselRef}
              className="flex items-center md:space-x-5 lg:space-x-10 pointer-events-none" // Disable pointer events on cards during drag
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
                  style={{ pointerEvents: isDragging ? 'none' : 'auto' }} // Allow card interactions when not dragging
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}