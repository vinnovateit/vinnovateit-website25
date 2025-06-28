"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatedTestimonials } from "./animated-testimonials";
import SectionHeading from './SectionHeading';
import AnimatedStarsBackground from './AnimatedStarsBackground';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    name: "VINHACK",
    description:
      "Our flagship hackathon where participants come together and find creative solutions for the problem statements based on the current social obstacles. The contestants jostle through 24 hours to find a viable and user friendly way to tackle these scenarios. Top teams have the opportunity to win huge rewards.",
    image: "/vinhack.png",
  },
  {
    name: "VINCODE",
    description:
      "The competition which not only tests your logical thinking but also your speed to find the least time consuming program for the problem statement. With the leaderboard constantly changing places, it puts your mental strength to the test as well.",
    image: "/vincode.png",
  },
  {
    name: "VINPREP",
    description:
      "This 3-day event focuses on delivering a full fledged campus placement mock to the participants, right from the coding and aptitude round to the HR interview. Accompanied with mentorship from our industry experts, the participants get the chance to win some amazing cash prizes and goodies.",
    image: "/vinprep.png",
  },
  {
    name: "CODE ALONG",
    description:
      "Inspiring talks by industry leaders and experts sharing insights on the latest trends in technology and innovation.",
    image: "/robot.png",
  },
];

export default function Events() {
  const containerRef = useRef(null);
  const flowerRef = useRef(null);
  const lightRef = useRef(null);
  const glowRef = useRef(null);
  const headingRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([flowerRef.current, glowRef.current], {
        opacity: 1,
        scale: 1,
      });
      
      gsap.set(lightRef.current, {
        opacity: 0.8,
        scale: 1,
      });
      
      gsap.set(headingRef.current, {
        opacity: 0,
        y: 50,
      });
      
      gsap.set(testimonialsRef.current, {
        opacity: 0,
        y: 30,
      });

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      // Animate heading
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
      
      // Animate testimonials
      .to(testimonialsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");

      // Continuous animations
      // Pulsing light effect
      gsap.to(lightRef.current, {
        opacity: 0.6,
        scale: 1.05,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Breathing glow effect
      gsap.to(glowRef.current, {
        opacity: 0.2,
        scale: 1.2,
        duration: 5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Parallax effect on scroll
      gsap.to(flowerRef.current, {
        y: -100,
        rotation: "+=20",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

      gsap.to(lightRef.current, {
        y: -50,
        rotation: "+=10",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="events" 
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 py-16 overflow-hidden"
    >
      <Image
        ref={flowerRef}
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
        className="hidden md:block absolute top-0 right-0 w-[1500px] md:w-[2000px] h-[1500px] md:h-[2500px] pointer-events-none z-0 opacity-40"
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
        className="hidden md:block absolute -top-20 -right-25 w-[1500px] md:w-[2500px] h-[1500px] md:h-[2500px] pointer-events-none z-0 opacity-80 rotate-[2deg]"
        style={{
          filter: 'drop-shadow(0 0 50px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 100px rgba(255, 255, 255, 0.1))',
          transform: 'rotate(6deg)',
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
        <div ref={headingRef}>
          <SectionHeading 
            title="EVENTS" 
            className="text-5xl md:text-7xl"
          />
        </div>

        {/* Events Testimonials */}
        <div ref={testimonialsRef} className="mt-10 mb-25">
          <AnimatedTestimonials events={events} />
        </div>
      </div>
    </div>
  );
}