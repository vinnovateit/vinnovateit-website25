import React from "react";
import { ArrowRight } from "lucide-react";

// Utility for merging class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Grid container
function BentoGrid({ className, children }) {
  return (
    <div className={cn("mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-5 gap-4 md:auto-rows-[280px]", className)}>
      {children}
    </div>
  );
}

// Grid item
function BentoGridItem({ className, title, description }) {
  return (
    <div
      className={cn(
        // Darker gradient border + white glow
        "relative rounded-2xl p-px bg-gradient-to-tr from-slate-800 to-purple-600 shadow-[0_0_20px_6px_rgba(255,255,255,0.2)]",
        className
      )}
    >
      <div className="flex flex-col justify-between h-full rounded-xl bg-slate-900 p-6">
        <div className="flex-1">
          <h3
            className="mb-4 text-3xl font-semibold text-white"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed text-purple-100 opacity-80"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {description}
          </p>
        </div>

        {/* Button matching the screenshot */}
        <div className="mt-6 flex items-center justify-end">
          <button className="flex items-center gap-2 rounded-full bg-purple-800 px-6 py-2 text-sm text-white transition duration-200 hover:bg-purple-700">
            explore
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Card data
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

// Main component
export default function Projects() {
  return (
    <div className="min-h-screen w-full relative overflow-visible">
      <img
        src="/3D_object_Projects.png"
        alt="3D Object Overlay"
        className="absolute -top-80 -left-2 w-72 h-auto z-50 pointer-events-none"
      />
      <img
        src="/Light_source_projects.png"
        alt="Light Source Overlay"
        className="absolute top-5 left-0 w-full min-w-full h-auto z-40 pointer-events-none opacity-90"
        style={{ 
          mixBlendMode: 'screen',
          objectFit: 'cover'
        }}
      />
      
      <div className="w-full min-h-screen">
        <h1 
          className="text-6xl md:text-8xl text-center font-bold text-white mb-12 pt-8 tracking-wider transform transition-transform duration-500"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          PROJECTS
        </h1>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <BentoGrid className="max-w-5xl mx-auto gap-6">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
}