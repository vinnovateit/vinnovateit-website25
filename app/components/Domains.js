"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DomainCard from './DomainCard';
import AnimatedStarsBackground from './AnimatedStarsBackground';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Domains() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const decorativeRef = useRef(null);
  const flowerRef = useRef(null);
  const overlayRef = useRef(null);

  const domains = [
    { title: "Web Dev", icon: "/globe.png" },
    { title: "Machine Learning", icon: "/laptop_.png" },
    { title: "App Dev", icon: "/mobile.png" },
    { title: "UI/UX Design", icon: "/pen.png" },
    { title: "Competitive Coding", icon: "/terminal.png" },
    { title: "Management", icon: "/mgmt.png" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Set initial states
        gsap.set(headingRef.current, { opacity: 0, y: 50 });
        gsap.set(cardsRef.current, { opacity: 0, y: 30, scale: 0.9 });
        gsap.set(decorativeRef.current, { opacity: 0, rotation: -20, scale: 0.8 });
        gsap.set(flowerRef.current, { opacity: 0, x: 100, rotation: 10 });
        gsap.set(overlayRef.current, { opacity: 0, x: -50, y: -20 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            // markers: true,
          }
        });

        tl.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        })
        .to(overlayRef.current, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.5")
        .to(decorativeRef.current, {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out"
        }, "-=0.6")

        // Animate cards with stagger
        .to(cardsRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.3")

        // Animate flower last
        .to(flowerRef.current, {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=0.4");
        
        // Floating animations
        gsap.to(decorativeRef.current, {
          y: -20,
          rotation: 5,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Subtle flower float
        gsap.to(flowerRef.current, {
          y: -15,
          rotation: -5,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);

  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div id="domains" className='relative'>
      <div 
        ref={decorativeRef}
        className="absolute -top-[20rem] left-[5rem] md:top-[-50rem] md:right-[-50rem] md:left-auto
                  w-[45rem] h-[45rem] 
                  md:w-[90rem] md:h-[90rem] 
                  pointer-events-none mix-blend-screen 
                  opacity-60 md:opacity-70 lg:opacity-80 
                  z-[5]"
      >
        <Image
          src="/big_ring.png"
          alt="Ring"
          width={720}
          height={720}
          className="w-full h-full object-contain"
        />
      </div>
      <div 
      ref={containerRef}
       
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12 overflow-hidden"
    >
      {/* <ShootingStars count={8} /> */}
      <AnimatedStarsBackground 
        variant="simple" 
        starCount={80}
        zIndex={1}
      />
      
      <Image
        ref={overlayRef}
        src="/3D_object1_About_us.png"
        alt="Overlay"
        width={250}
        height={200}
        className="absolute top-[-80px] -left-2 z-0 pointer-events-none 
                  w-24 sm:w-32 md:w-40 lg:w-48 xl:w-64 h-auto"
      />
      <div className="max-w-7xl mx-auto text-center z-20 w-full relative">
        <div ref={headingRef}>
          <SectionHeading 
            title="DOMAINS"
          />
        </div>
        <div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-20 relative z-30 font-jakarta"
        >
          {domains.map((item, index) => (
            <div key={index} ref={addToRefs} className="relative z-30">
              <DomainCard 
                title={item.title}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    
  );
}