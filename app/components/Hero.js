'use client';

import React, { useEffect, useRef } from 'react';
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
  const aboutObjectRef = useRef(null);
  const orbsRef = useRef([]);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const targetSection = document.querySelector('#aboutus');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(orbsRef.current, { opacity: 0, scale: 0 });
      gsap.set(ringRef.current, { opacity: 0, scale: 0.8, rotation: -10 });
      gsap.set(glowRef.current, { opacity: 0, y: -100 });
      gsap.set(titleRef.current, { opacity: 0, y: 50, scale: 0.9 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20, scale: 0.9 });
      gsap.set(aboutObjectRef.current, { opacity: 0, scale: 0.8, rotation: 10, x: 100 });

      const tl = gsap.timeline();

      tl.to(orbsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: { amount: 1, from: 'random' },
        ease: 'back.out(1.7)',
      })
        .to(
          ringRef.current,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1'
        )
        .to(
          aboutObjectRef.current,
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1'
        )
        .to(
          glowRef.current,
          {
            opacity: 0.6,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
          },
          '-=0.8'
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.2'
        );

      orbsRef.current.forEach((orb, index) => {
        if (orb) {
          gsap.to(orb, {
            y: '+=20',
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.2,
          });

          gsap.to(orb, {
            x: '+=15',
            duration: 3 + index * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.3,
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center overflow-hidden"
    >
      {/* Floating Orbs */}
      <div className="absolute inset-0 z-2">
        {[...Array(6)].map((_, i) => {
          const positions = [
            { left: '15%', top: '20%', size: 0.8, color: 'rgba(163, 120, 255, 0.7)' },
            { left: '85%', top: '30%', size: 0.6, color: 'rgba(147, 51, 234, 0.6)' },
            { left: '10%', top: '70%', size: 0.7, color: 'rgba(196, 164, 255, 0.5)' },
            { left: '90%', top: '65%', size: 0.5, color: 'rgba(139, 92, 246, 0.6)' },
            { left: '25%', top: '45%', size: 0.4, color: 'rgba(124, 58, 237, 0.5)' },
            { left: '75%', top: '50%', size: 0.6, color: 'rgba(168, 85, 247, 0.6)' },
          ];

          const pos = positions[i] || positions[0];

          return (
            <div
              key={`orb-${i}`}
              ref={(el) => (orbsRef.current[i] = el)}
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

      {/* Stars Background */}
      <AnimatedStarsBackground variant="complex" className="z-5" />

      {/* Smaller Ring Blob */}
      <div
        ref={ringRef}
        className="absolute -top-8 -left-8 md:-top-12 md:-left-12 lg:-top-12 lg:-left-12 
                   w-16 md:w-24 lg:w-40 h-auto opacity-70 md:opacity-80 xl:opacity-90 pointer-events-none z-10"
      >
        <Image
          src="/hero_3d1.webp"
          alt="Flower"
          width={320}
          height={320}
          className="w-full h-auto"
          priority
          fetchPriority="high"
        />
      </div>

      {/* Smaller About Us 3D Object */}
      <div
        ref={aboutObjectRef}
        className="absolute bottom-0 right-0 sm:right-0 md:right-0 lg:right-0 
                   w-20 sm:w-28 md:w-36 lg:w-44 xl:w-52 
                   h-auto pointer-events-none select-none z-10"
      >
        <Image
          src="/3D_object_About_us.webp"
          alt="Overlay"
          width={400}
          height={350}
          className="w-full h-auto"
          priority
          fetchPriority="high"
        />
      </div>

      {/* Glow Background */}
      <div
        ref={glowRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none
                   w-[120vw] h-[70vh] 
                   sm:w-[140vw] sm:h-[140vh] 
                   md:w-[160vw] md:h-[160vh] 
                   lg:w-[100vw] lg:h-[100vh] 
                   
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

      {/* Main Content */}
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] font-orbitron"
        >
          VinnovateIT
        </h1>

        <p
          ref={subtitleRef}
          className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto font-dm-sans"
        >
          Think. Create. Innovate.
        </p>

        <button
          ref={buttonRef}
          onClick={handleExploreClick}
          className="bg-white text-black px-8 py-3 rounded-full border border-purple-400 shadow-lg 
                     hover:shadow-purple-500/40 hover:scale-105 active:scale-95 
                     transition-all duration-300 font-medium text-base sm:text-lg font-dm-sans"
        >
          Explore More
        </button>
      </div>
    </div>
  );
}