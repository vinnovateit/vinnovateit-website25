'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const starsRef = useRef([]);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const galaxyRef = useRef(null);

  // Calculate star counts and galaxy counts based on screen size
  const getCounts = () => {
    if (typeof window === 'undefined') {
      // Default values for server-side rendering
      return { 
        stars: { circular: 60, plus: 20, diamond: 15, sparkle: 10 },
        galaxies: 4
      };
    }
    
    const width = window.innerWidth;
    if (width < 640) { // mobile
      return { 
        stars: { circular: 30, plus: 10, diamond: 8, sparkle: 5 },
        galaxies: 2
      };
    } else if (width < 1024) { // tablet
      return { 
        stars: { circular: 45, plus: 15, diamond: 12, sparkle: 8 },
        galaxies: 3
      };
    } else { // desktop
      return { 
        stars: { circular: 60, plus: 20, diamond: 15, sparkle: 10 },
        galaxies: 4
      };
    }
  };

  const [counts, setCounts] = useState(getCounts());
  const galaxiesRef = useRef([]);

  useEffect(() => {
    // Update counts on window resize
    const handleResize = () => {
      setCounts(getCounts());
    };

    window.addEventListener('resize', handleResize);
    // Set initial counts
    setCounts(getCounts());

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(starsRef.current, { opacity: 0, scale: 0 });
      gsap.set(galaxyRef.current, { opacity: 0, scale: 0.5, rotationX: 0 });
      gsap.set(galaxiesRef.current, { opacity: 0, scale: 0.3, rotationX: 0 });
      gsap.set(ringRef.current, { opacity: 0, scale: 0.8, rotation: -10 });
      gsap.set(glowRef.current, { opacity: 0, y: -100 });
      gsap.set(titleRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20, scale: 0.9 });

      // Create master timeline
      const tl = gsap.timeline();

      // Galaxy disc animation - appears first
      tl.to(galaxyRef.current, {
        opacity: 1,
        scale: 1,
        rotationX: -60,
        duration: 2,
        ease: "power2.out"
      })

      // Multiple galaxies animation
      .to(galaxiesRef.current, {
        opacity: 1,
        scale: 1,
        rotationX: -60,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out"
      }, "-=1")

      // Stars animation - staggered appearance
      .to(starsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 2.5,
          from: "random"
        },
        ease: "back.out(1.7)"
      }, "-=1.5")
      
      // Ring animation - smooth scale and rotation
      .to(ringRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=1.5")
      
      // Glow background - slide down from top
      .to(glowRef.current, {
        opacity: 0.6,
        y: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1")
      
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

      // Galaxy glow animation - continuous loop with purple shadow and brightness
      const glowTimeline = gsap.timeline({ repeat: -1 });
      galaxiesRef.current.forEach((galaxy, index) => {
        if (galaxy) {
          // Dim phase - reduce brightness and add purple shadow
          glowTimeline.to(galaxy, {
            filter: 'blur(0.3px) brightness(0.6) saturate(0.8) drop-shadow(0 0 15px rgba(147, 51, 234, 0.7))',
            scale: 0.95,
            duration: 2,
            ease: "power2.inOut"
          }, index * 1.5)
          // Bright phase - enhanced brightness with strong purple glow
          .to(galaxy, {
            filter: 'blur(0.8px) brightness(1.5) saturate(1.3) drop-shadow(0 0 25px rgba(147, 51, 234, 0.9)) drop-shadow(0 0 50px rgba(147, 51, 234, 0.5))',
            scale: 1.1,
            duration: 2,
            ease: "power2.inOut"
          }, index * 1.5 + 2);
        }
      });

    }, heroRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [counts.galaxies]);

  return (
    <div 
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center overflow-hidden bg-black"
    >
      {/* Multiple Galaxies */}
      <div className="absolute inset-0 z-2">
        {[...Array(counts.galaxies)].map((_, i) => {
          const positions = [
            { left: '12%', top: '65%', size: 0.7, width: 1.4, height: 1.2 }, // Bottom left - longer and wider
            { left: '78%', top: '70%', size: 0.6, width: 1.3, height: 1.1 }, // Bottom right - longer and wider
            { left: '22%', top: '25%', size: 0.5, width: 1.2, height: 1.0 }, // Top left - longer and wider
            { left: '82%', top: '30%', size: 0.65, width: 1.35, height: 1.15 }, // Top right - longer and wider
          ];
          
          const pos = positions[i] || positions[0];
          const distortionX = (Math.abs(parseFloat(pos.left) - 50) / 50) * 0.3; // More distortion at edges
          const distortionY = (Math.abs(parseFloat(pos.top) - 50) / 50) * 0.2;
          
          return (
            <div
              key={`galaxy-${i}`}
              ref={el => galaxiesRef.current[i] = el}
              className="absolute pointer-events-none"
              style={{
                left: pos.left,
                top: pos.top,
                transform: 'translate(-50%, -50%)',
                width: `${120 * pos.size * pos.width}px`,
                height: `${30 * pos.size * pos.height}px`,
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: `radial-gradient(ellipse, rgba(255, 255, 255, ${0.7 * pos.size}) 0%, rgba(147, 51, 234, ${0.6 * pos.size}) 25%, rgba(147, 51, 234, ${0.3 * pos.size}) 50%, rgba(147, 51, 234, ${0.1 * pos.size}) 75%, transparent 100%)`,
                  borderRadius: '50%',
                  filter: 'blur(0.5px)',
                  boxShadow: `0 0 ${20 * pos.size}px rgba(147, 51, 234, ${0.4 * pos.size}), 0 0 ${40 * pos.size}px rgba(147, 51, 234, ${0.2 * pos.size})`,
                  transform: `rotateX(-60deg) rotateZ(${15 + distortionX * 20}deg) scaleX(${1 + distortionX}) scaleY(${1 + distortionY})`
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Galaxy disc */}
      <div className="absolute inset-0 flex items-center justify-center z-1">
        {/* <div
          ref={galaxyRef}
          className="w-96 h-24 md:w-[600px] md:h-32 lg:w-[800px] lg:h-40"
          style={{
            background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.9) 0%, rgba(147, 51, 234, 0.8) 20%, rgba(147, 51, 234, 0.4) 40%, rgba(147, 51, 234, 0.1) 70%, transparent 100%)',
            borderRadius: '50%',
            filter: 'blur(0.5px)',
            boxShadow: '0 0 50px rgba(147, 51, 234, 0.6), 0 0 100px rgba(147, 51, 234, 0.3)',
            transform: 'rotateX(-60deg) rotateZ(15deg)'
          }}
        /> */}
      </div>

      {/* Stars background */}
      <div className="absolute inset-0 z-5">
        {/* Regular circular stars */}
        {[...Array(counts.stars.circular)].map((_, i) => (
          <div
            key={`star-circle-${i}`}
            ref={el => starsRef.current[i] = el}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.4)'
            }}
          />
        ))}
        
        {/* Plus-shaped stars */}
        {[...Array(counts.stars.plus)].map((_, i) => (
          <div
            key={`star-plus-${i}`}
            ref={el => starsRef.current[counts.stars.circular + i] = el}
            className="absolute text-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 6}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              textShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)',
              filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.6))'
            }}
          >
            +
          </div>
        ))}
        
        {/* Diamond-shaped stars */}
        {[...Array(counts.stars.diamond)].map((_, i) => (
          <div
            key={`star-diamond-${i}`}
            ref={el => starsRef.current[counts.stars.circular + counts.stars.plus + i] = el}
            className="absolute bg-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 3}px`,
              height: `${Math.random() * 4 + 3}px`,
              transform: 'rotate(45deg)',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4)',
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))'
            }}
          />
        ))}
        
        {/* Sparkle stars (multi-point) */}
        {[...Array(counts.stars.sparkle)].map((_, i) => (
          <div
            key={`star-sparkle-${i}`}
            ref={el => starsRef.current[counts.stars.circular + counts.stars.plus + counts.stars.diamond + i] = el}
            className="absolute text-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 8}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              textShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 16px rgba(255, 255, 255, 0.5)',
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.7))'
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Background circle */}
      <div 
        ref={ringRef}
        className="absolute top-0 left-0 w-24 md:w-32 lg:w-[16rem] h-auto opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10"
      >
        <Image
          src="/hero_3d1.png"
          alt="Flower"
          width={256}
          height={256}
          className="w-full h-auto"
          priority
        />
      </div>

      <div 
        ref={glowRef}
        className="absolute top-0 left-1/2 w-[80rem] h-[60rem] md:w-[150rem] md:h-[180rem] -translate-x-1/2 -translate-y-1/2 opacity-60 z-0 pointer-events-none"
      >
        <Image
          src="/hero.png"
          alt="White Glow"
          fill
          className="object-contain"
          priority
        />
      </div>

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

        <Link href="#about">
          <button
            ref={buttonRef}
            className="bg-white text-black px-8 py-3 rounded-full border border-purple-400 shadow-lg 
                       hover:shadow-purple-500/40 hover:scale-105 active:scale-95 
                       transition-all duration-300 font-medium text-base sm:text-lg"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
}