"use client";

import React from "react";
import Image from "next/image";
import BentoGrid from "./BentoGrid";
import BentoGridItem from "./BentoGridItems";
import CardGrid from "./ProjectCard";

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
    <div className="min-h-screen w-full relative overflow-visible">
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>
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
        <div className="relative inline-block mb-20 top-30">
          {/* Top-left corner */}
          <span className="absolute top-[-18] left-[-26] w-10 h-2 bg-purple-300"></span>
          <span className="absolute top-[-18] left-[-26] w-2 h-10 bg-purple-300"></span>

          {/* Bottom-right corner */}
          <span className="absolute bottom-15 right-[-20] w-10 h-2 bg-purple-300"></span>
          <span className="absolute bottom-15 right-[-20] w-2 h-10 bg-purple-300"></span>

          {/* Heading */}
          <h1
            className="text-4xl md:text-7xl font-bold text-purple-200 mb-20 tracking-widest relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            PROJECTS
          </h1>
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
