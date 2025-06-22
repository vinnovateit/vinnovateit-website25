'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import AnimatedStarsBackground from './AnimatedStarsBackground';

export default function Hero() {
  const heroRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const aboutObjectRef = useRef(null); // New ref for the 3D about us object
  const orbsRef = useRef([]); // New ref for floating orbs

  const handleExploreClick = (e) => {
    e.preventDefault();
    const targetSection = document.querySelector('#aboutus');
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(orbsRef.current, { opacity: 0, scale: 0 });
      gsap.set(ringRef.current, { opacity: 0, scale: 0.8, rotation: -10 });
      gsap.set(glowRef.current, { opacity: 0, y: -100 });
      gsap.set(titleRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20, scale: 0.9 });
      // Set initial state for 3D about us object - comes from right
      gsap.set(aboutObjectRef.current, { opacity: 0, scale: 0.8, rotation: 10, x: 100 });

      // Create master timeline
      const tl = gsap.timeline();

      // Orbs animation - appear first with stagger
      tl.to(orbsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: {
          amount: 1,
          from: "random"
        },
        ease: "back.out(1.7)"
      })

      // Ring animation - smooth scale and rotation (from left)
      .to(ringRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=1")
      
      // 3D About Us object animation - comes from right
      .to(aboutObjectRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=1")
      
      // Glow background - slide down from top
      .to(glowRef.current, {
        opacity: 0.6,
        y: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.8")
      
      // Title animation - main text appears first
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5")
      
      // Subtitle animation - follows title
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      
      // Button animation - appears last
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.2");

      // Continuous floating animation for orbs
      orbsRef.current.forEach((orb, index) => {
        if (orb) {
          gsap.to(orb, {
            y: "+=20",
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.2
          });
          
          gsap.to(orb, {
            x: "+=15",
            duration: 3 + index * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.3
          });
        }
      });

    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center overflow-hidden bg-black"
    >
      {/* Floating Orbs */}
      <div className="absolute inset-0 z-2">
        {[...Array(6)].map((_, i) => {
          const positions = [
            { left: '15%', top: '20%', size: 0.8, color: 'rgba(163, 120, 255, 0.7)' }, // Primary purple
            { left: '85%', top: '30%', size: 0.6, color: 'rgba(147, 51, 234, 0.6)' }, // Deep purple
            { left: '10%', top: '70%', size: 0.7, color: 'rgba(196, 164, 255, 0.5)' }, // Light purple
            { left: '90%', top: '65%', size: 0.5, color: 'rgba(139, 92, 246, 0.6)' }, // Violet
            { left: '25%', top: '45%', size: 0.4, color: 'rgba(124, 58, 237, 0.5)' }, // Dark violet
            { left: '75%', top: '50%', size: 0.6, color: 'rgba(168, 85, 247, 0.6)' }, // Medium purple
          ];
          
          const pos = positions[i] || positions[0];
          
          return (
            <div
              key={`orb-${i}`}
              ref={el => orbsRef.current[i] = el}
              className="absolute pointer-events-none"
              style={{
                left: pos.left,
                top: pos.top,
                transform: 'translate(-50%, -50%)',
                width: `${80 * pos.size}px`,
                height: `${80 * pos.size}px`,
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, ${pos.color} 0%, transparent 70%)`,
                  filter: 'blur(8px)',
                  boxShadow: `0 0 ${30 * pos.size}px ${pos.color}`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Stars background */}
      <AnimatedStarsBackground 
        variant="complex" 
        className="z-5"
      />

      {/* Background circle - comes from left */}
      <div 
        ref={ringRef}
        className="absolute -top-8 -left-8 md:-top-12 md:-left-12 lg:-top-16 lg:-left-16 w-32 md:w-40 lg:w-[20rem] h-auto opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10"
      >
        <Image
          src="/hero_3d1.png"
          alt="Flower"
          width={320}
          height={320}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* 3D About Us Object - comes from right */}
      <div 
        ref={aboutObjectRef}
        className="absolute bottom-0 -right-40 w-64 sm:w-80 md:w-96 lg:w-[30rem] h-auto pointer-events-none select-none z-10"
      >
        <Image
          src="/3D_object_About_us.png"
          alt="Overlay"
          width={400}
          height={350}
          className="w-[250px] md:w-[300px] lg:w-[400px] h-auto"
        />
      </div>

      <div 
        ref={glowRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none
                   w-[120vw] h-[120vh] 
                   sm:w-[140vw] sm:h-[140vh] 
                   md:w-[160vw] md:h-[160vh] 
                   lg:w-[180vw] lg:h-[180vh] 
                   xl:w-[200vw] xl:h-[200vh]
                   max-w-[2000px] max-h-[2000px]"
        style={{
          background: `radial-gradient(ellipse at center, 
            #A378FF 0%, 
            rgba(163, 120, 255, 0.8) 15%, 
            rgba(163, 120, 255, 0.6) 25%, 
            rgba(163, 120, 255, 0.4) 35%, 
            rgba(163, 120, 255, 0.2) 50%, 
            rgba(163, 120, 255, 0.1) 65%, 
            transparent 80%)`,
          opacity: 0.75,
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      ></div>

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          VinnovateIT
        </h1>

        <p
          ref={subtitleRef}
          className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Think, Create, Innovate...
        </p>

        <button
          ref={buttonRef}
          onClick={handleExploreClick}
          className="bg-white text-black px-8 py-3 rounded-full border border-purple-400 shadow-lg 
                     hover:shadow-purple-500/40 hover:scale-105 active:scale-95 
                     transition-all duration-300 font-medium text-base sm:text-lg"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Explore More
        </button>
      </div>
    </div>
  );
}