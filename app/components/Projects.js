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
        "relative rounded-2xl p-[1px] bg-gradient-to-tr from-[#2f2048] to-[#615399] shadow-[0_0_20px_6px_rgba(255,255,255,0.2)]",
        className
      )}
    >

      <div className="flex flex-col justify-between h-full rounded-[14px] bg-[#1e1b2e] p-6">
        <div className="flex-1">
          <h3
            className="mb-4 text-3xl font-semibold text-white"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed text-purple-100/80"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {description}
          </p>
        </div>

        {/* Button matching the screenshot */}
        <div className="mt-6 flex items-center justify-end">
          <button className="flex items-center gap-2 rounded-full bg-[#4d2a75] px-6 py-2 text-sm text-white transition duration-200">
            explore
            <ArrowRight className="h-4 w-4" />
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
    <div className="min-h-screen relative overflow-visible">
      <img
        src="/3D_object_Projects.png" // replace with your image path
        alt="Overlay"
        style={{
          position: 'absolute',
          top: -325,
          left: -10,
          width: '300px', // adjust size as needed
          height: 'auto',
          zIndex: 50, // high enough to be above all content
          pointerEvents: 'none', // so it doesn't block clicks
        }}
      />
      <img
        src="/Light_source_projects.png" // replace with your image path
        alt="Overlay"
        style={{
          position: 'absolute',
          top: '20px',
          width: '1500px', // adjust size as needed
          height: 'auto',
          zIndex: 49, // high enough to be above all content
          pointerEvents: 'none', // so it doesn't block clicks
          mixBlendMode: 'screen', // Apply blending like "pass through"
          opacity: 0.9,
        }}
      />
      <h1 
        className="text-6xl md:text-8xl text-center font-bold text-white mb-12 tracking-wider transform transition-transform duration-500"
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
  );
}
