"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedTestimonials } from "./animated-testimonials";

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
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 overflow-hidden">
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
        <div className="relative inline-block mb-20">
          {/* Top-left corner */}
          <span className="absolute top-[-18] left-[-26] w-10 h-2 bg-purple-300"></span>
          <span className="absolute top-[-18] left-[-26] w-2 h-10 bg-purple-300"></span>

          {/* Bottom-right corner */}
          <span className="absolute bottom-15 right-[-20] w-10 h-2 bg-purple-300"></span>
          <span className="absolute bottom-15 right-[-20] w-2 h-10 bg-purple-300"></span>
          
          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-bold text-purple-200 mb-20 tracking-widest relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            EVENTS
          </h1>
        </div>

        {/* Events Testimonials */}
        <AnimatedTestimonials events={events} />
      </div>
    </div>
  );
}