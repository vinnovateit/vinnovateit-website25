"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { AnimatedTestimonials } from "./animated-testimonials";
import SectionHeading from './SectionHeading';
import AnimatedStarsBackground from './AnimatedStarsBackground';
import { gsap } from "gsap";

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
  const lightRef = useRef(null);
  const glowRef = useRef(null);
  
  // Framer Motion scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax effects
  const flowerY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const flowerRotation = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const lightY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const lightRotation = useTransform(scrollYProgress, [0, 1], [0, 10]);
  
  // In-view detection for animations
  const headingInView = useInView(containerRef, { 
    once: true, 
    margin: "-20% 0px -20% 0px" 
  });
  
  const testimonialsInView = useInView(containerRef, { 
    once: true, 
    margin: "-30% 0px -30% 0px" 
  });

  useEffect(() => {
    // Only GSAP animations for light effects
    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="events" 
      className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 py-16 overflow-hidden"
    >
      {/* Flower with Framer Motion parallax */}
      <motion.div
        style={{ 
          y: flowerY,
          rotate: flowerRotation,
        }}
        className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 md:-top-40 md:-right-16 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[20rem] h-auto pointer-events-none select-none z-10"
        initial={{ opacity: 1, scale: 1 }}
      >
        <Image
          src="/events_flower.png"
          alt="Flower"
          width={550}
          height={550}
          className="w-full h-auto object-contain"
          priority={false}
          loading="lazy"
        />
      </motion.div>

      <AnimatedStarsBackground 
        variant="simple" 
        starCount={80}
        zIndex={1}
      />

      {/* Glow Effect with GSAP animation */}
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

      {/* Main Light Beam with GSAP + Framer Motion parallax */}
      <motion.div
        ref={lightRef}
        style={{ 
          y: lightY,
          rotate: lightRotation,
        }}
        className="hidden md:block absolute -top-20 -right-25 w-[1500px] md:w-[2500px] h-[1500px] md:h-[2500px] pointer-events-none z-0 opacity-80"
        initial={{ opacity: 0.8, scale: 1 }}
      >
        <div
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
      </motion.div>

      {/* Content Wrapper */}
      <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 max-w-7xl w-full text-center z-10">
        {/* Heading with Framer Motion animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: headingInView ? 1 : 0, 
            y: headingInView ? 0 : 50 
          }}
          transition={{ 
            duration: 1, 
            ease: [0.25, 0.1, 0.25, 1] // power3.out equivalent
          }}
        >
          <SectionHeading 
            title="EVENTS" 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          />
        </motion.div>

        {/* Events Testimonials with Framer Motion animation */}
        <motion.div 
          className="mt-10 mb-25"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: testimonialsInView ? 1 : 0, 
            y: testimonialsInView ? 0 : 30 
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94] // power2.out equivalent
          }}
        >
          <AnimatedTestimonials events={events} />
        </motion.div>
      </div>
    </div>
  );
}