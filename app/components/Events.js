"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedTestimonials } from "./animated-testimonials";
import SectionHeading from './SectionHeading';
import AnimatedStarsBackground from './AnimatedStarsBackground';

const events = [
  {
    name: "VINHACK",
    description: "A premier hackathon where innovative minds come together to build groundbreaking solutions and push the boundaries of technology.",
    image: "/globe.png",
  },
  {
    name: "VINCODE",
    description: "An intensive coding competition that challenges participants to solve complex problems and showcase their programming prowess.",
    image: "/pen.png",
  },
  {
    name: "VINPREP",
    description: "A comprehensive preparation program designed to equip students with essential skills for technical interviews and career advancement.",
    image: "/robot.png",
  },
  {
    name: "VINTALKS",
    description: "Inspiring talks by industry leaders and experts sharing insights on the latest trends in technology and innovation.",
    image: "/mobile.png",
  },
  {
    name: "VINFEST",
    description: "A vibrant festival celebrating technology, creativity, and community with workshops, exhibitions, and networking opportunities.",
    image: "/terminal.png",
  },
];

export default function Events() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 overflow-hidden bg-black">
      {/* Animated stars background */}
      <AnimatedStarsBackground 
        variant="simple" 
        starCount={90}
        zIndex={1}
      />

      {/* White Glow Background */}

      {/* Flashlight bg */}
      <div className="hidden md:block absolute top-0 -right-30 w-[2000px] h-[2500px] pointer-events-none z-0 opacity-75 transform rotate-12 origin-top-right">
        <Image
          src="/light.png"
          alt="Spotlight"
          width={2400}
          height={2200}
          className="object-contain opacity-75"
        />
      </div>

      {/* Content Wrapper */}
      <div className="max-w-7xl w-full text-center z-10">
        <SectionHeading 
          title="EVENTS" 
          className="text-5xl md:text-7xl"
        />

        {/* Events Testimonials */}
        <AnimatedTestimonials events={events} />
      </div>
    </div>
  );
}