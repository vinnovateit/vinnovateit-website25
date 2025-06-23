"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatedTestimonials } from "./animated-testimonials";
import SectionHeading from './SectionHeading';
import AnimatedStarsBackground from './AnimatedStarsBackground';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const events = [
  {
    name: "VINHACK",
    description:
      "A premier hackathon where innovative minds come together to build groundbreaking solutions and push the boundaries of technology.",
    image: "/globe.png",
  },
  {
    name: "VINCODE",
    description:
      "An intensive coding competition that challenges participants to solve complex problems and showcase their programming prowess.",
    image: "/pen.png",
  },
  {
    name: "VINPREP",
    description:
      "A comprehensive preparation program designed to equip students with essential skills for technical interviews and career advancement.",
    image: "/robot.png",
  },
  {
    name: "VINTALKS",
    description:
      "Inspiring talks by industry leaders and experts sharing insights on the latest trends in technology and innovation.",
    image: "/mobile.png",
  },
  {
    name: "VINFEST",
    description:
      "A vibrant festival celebrating technology, creativity, and community with workshops, exhibitions, and networking opportunities.",
    image: "/terminal.png",
  },
];

export default function Events() {
  const [flash, setFlash] = useState(false);
  const lightRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const testimonialsRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([lightRef.current, headingRef.current, testimonialsRef.current], {
        opacity: 0
      });

      // Set initial light beam position (off-screen right)
      gsap.set(lightRef.current, {
        x: 800,
        y: -200,
        rotation: 6,
        scale: 0.8,
        transformOrigin: "top right"
      });

      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Start the light beam sequence
            lightBeamSequence();
          }
        }
      });

      // Light beam animation sequence
      const lightBeamSequence = () => {
        const lightTl = gsap.timeline();

        // Initial flicker effects
        lightTl
          .set(lightRef.current, { opacity: 1 })
          .to(lightRef.current, {
            opacity: 0.3,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: "power2.inOut"
          })
          .to(lightRef.current, {
            opacity: 0.6,
            duration: 0.2,
            repeat: 3,
            yoyo: true,
            ease: "power2.inOut"
          })
          // Main light beam roll-in effect (right to left)
          .to(lightRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 0.8,
            duration: 2.5,
            ease: "power3.out",
            onComplete: () => {
              // Add glow effect after light beam settles
              gsap.to(glowRef.current, {
                opacity: 0.4,
                duration: 1,
                ease: "power2.inOut"
              });
            }
          })
          // Subtle horizontal floating animation
          .to(lightRef.current, {
            x: -30,
            y: -10,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
      };

      // Heading animation
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Testimonials animation
      gsap.to(testimonialsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Enhanced scroll flash effect
      const handleScroll = () => {
        setFlash(true);
        
        // GSAP flash animation
        gsap.to(lightRef.current, {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(lightRef.current, {
              opacity: 0.8,
              duration: 0.2,
              ease: "power2.inOut"
            });
          }
        });

        // Glow pulse on scroll
        gsap.to(glowRef.current, {
          opacity: 0.6,
          scale: 1.1,
          duration: 0.15,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(glowRef.current, {
              opacity: 0.4,
              scale: 1,
              duration: 0.3,
              ease: "power2.inOut"
            });
          }
        });

        setTimeout(() => setFlash(false), 150);
      };

      window.addEventListener("scroll", handleScroll);
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
    id="events" 
      ref={sectionRef}
      className="bg-black relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 py-16 overflow-hidden"
    >
      <Image
        src="/events_flower.png"
        alt="Flower"
        width={550}
        height={550}
        className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 lg:w-[20rem] h-auto pointer-events-none select-none z-10"
        style={{ transform: 'translateY(-35%)' }}
      />

       <AnimatedStarsBackground 
        variant="simple" 
        starCount={80}
        zIndex={1}
      />
      {/* Glow Effect */}
      <div
        ref={glowRef}
        className="hidden md:block absolute top-0 right-0 w-[1500px] md:w-[2000px] h-[1500px] md:h-[2500px] pointer-events-none z-0 opacity-0"
        style={{
          background: 'radial-gradient(ellipse 800px 1200px at 70% 20%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'rotate(6deg)',
          transformOrigin: 'top right'
        }}
      />

      {/* Main Light Beam */}
      <div
        ref={lightRef}
        className="hidden md:block absolute top-10 -right-25 w-[1500px] md:w-[2000px] h-[1500px] md:h-[2500px] pointer-events-none z-0 opacity-0"
        style={{
          filter: 'drop-shadow(0 0 50px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 100px rgba(255, 255, 255, 0.1))',
        }}
      >
        <Image
          src="/light.png"
          alt="Spotlight"
          width={2400}
          height={2200}  
          className="object-contain"
        />
      </div>

      {/* Content Wrapper */}
      <div className="mt-10 max-w-7xl w-full text-center z-10">
        <div ref={headingRef} style={{ opacity: 0, transform: 'translateY(50px)' }}>
          <SectionHeading 
            title="EVENTS" 
            className="text-5xl md:text-7xl"
          />
        </div>

        {/* Events Testimonials */}
        <div ref={testimonialsRef} 
        className="mt-25 mb-25"
         style={{ opacity: 0, transform: 'translateY(50px)' }}>
          <AnimatedTestimonials events={events} />
        </div>
      </div>
    </div>
  );
}