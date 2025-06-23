"use client";

import React from "react";
import Image from "next/image";
import BentoGrid from "./BentoGrid";
import BentoGridItem from "./BentoGridItems";
import CardGrid from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import AnimatedStarsBackground from './AnimatedStarsBackground';

const items = [
  {
    title: "messit",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "col-span-2 md:col-span-3",
  },
  {
    title: "studyhub",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "col-span-2 md:col-span-2",
  },
  {
    title: "bunkbuddies",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "col-span-2 md:col-span-2",
  },
  {
    title: "vinmanager",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    className: "col-span-2 md:col-span-3",
  },
];

export default function Projects() {
  return (
    <div id="projects" className="min-h-screen w-full relative overflow-visible bg-black">
      {/* Animated stars background */}
      <AnimatedStarsBackground 
        variant="simple" 
        starCount={100}
        zIndex={1}
      />
      
      <div className="absolute -top-45 md:-top-85 -left-2 w-40 md:w-80 h-auto z-50 pointer-events-none">
        <Image
          src="/3D_object_Projects.png"
          alt="3D Object Overlay"
          width={320}
          height={320}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="hidden md:block absolute top-0 left-0 w-full h-auto z-40 pointer-events-none opacity-90">
        <Image
          src="/Light_source_projects.png"
          alt="Light Source Overlay"
          fill
          className="object-cover"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      <div className="w-full text-center z-10">
        <div className="top-30">
          <SectionHeading title="PROJECTS" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <CardGrid/>
          {/* <BentoGrid className="max-w-5xl gap-3">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                className={item.className}
              />
            ))}
          </BentoGrid> */}
        </div>
      </div>
    </div>
  );
}
