"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedTestimonials } from "./animated-testimonials";
import SectionHeading from './SectionHeading';
import AnimatedStarsBackground from './AnimatedStarsBackground';

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

  useEffect(() => {
    const handleScroll = () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 150); // Flash duration
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 py-16 overflow-hidden">
      {/* Flashlight Background */}
      <div
        className={`hidden md:block absolute top-0 right-0 w-[1500px] md:w-[2000px] h-[1500px] md:h-[2500px] pointer-events-none z-0 transform rotate-6 origin-top-right transition-all duration-300 ${
          flash ? "opacity-100" : "opacity-40"
        } flicker`}
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
