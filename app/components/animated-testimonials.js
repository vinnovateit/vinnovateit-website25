"use client";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  events,
  autoplay = false
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + events.length) % events.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 4000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto px-4 antialiased md:px-8 lg:px-12">
      {/* Enhanced Container with glassmorphism and better gradients */}
      <div className="relative rounded-3xl bg-gradient-to-br from-purple-900/20 via-indigo-900/15 to-violet-900/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/25 p-8 md:p-12 lg:p-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-violet-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Multiple layered borders for depth */}
        <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-purple-400/20 via-indigo-400/20 to-violet-400/20 pointer-events-none"></div>
        <div className="absolute inset-1 rounded-3xl border border-white/5 pointer-events-none"></div>
        
        {/* Enhanced gradient overlay with better blending */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/10 via-transparent to-indigo-600/10 pointer-events-none"></div>
        
        <div className="relative grid grid-cols-1 gap-8 md:gap-16 lg:gap-64 lg:grid-cols-2">
          {/* Enhanced Image Section */}
          <div className="-mt-8 md:mt-0">
            <div className="relative h-64 w-full md:h-[500px] lg:h-[550px]">
              <AnimatePresence>
                {events.map((event, index) => (
                  <motion.div
                    key={event.image}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 40 : events.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300">
                      {/* Enhanced glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-900/10 pointer-events-none"></div>
                      
                      <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        priority
                        className="object-cover object-center hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 rounded-3xl shadow-inner shadow-purple-500/20 pointer-events-none"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Enhanced Text Section */}
          <div className="flex flex-col py-4 md:py-8 lg:py-12 relative min-h-[400px] md:min-h-[500px] lg:min-h-[550px]">
            {/* Content Container with improved positioning */}
            <div className="flex-1 flex flex-col justify-start">
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              >
                {/* Enhanced Event Name with better typography */}
                <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent mb-4 md:mb-6 tracking-wider drop-shadow-[0_0_30px_rgba(168,85,247,0.6)] font-orbitron relative">
                  {events[active].name}
                  {/* Subtle glow effect behind text */}
                  <span className="absolute inset-0 blur-lg bg-gradient-to-r from-purple-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent opacity-50 -z-10">
                    {events[active].name}
                  </span>
                </h3>
                
                {/* Enhanced Event Description */}
                <motion.p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-jakarta relative">
                  {events[active].description.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block hover:text-purple-200 transition-colors duration-300"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </div>

            {/* Enhanced Navigation Section */}
            <div className="absolute bottom-4 md:bottom-8 lg:bottom-12 left-0 right-0 flex flex-col items-center gap-4 md:gap-6">
              {/* Enhanced Navigation Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handlePrev}
                  className="group/button relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-400/30 hover:from-purple-500/30 hover:to-indigo-500/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm shadow-lg shadow-purple-500/20"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/10 to-indigo-400/10 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                  <IconArrowLeft className="h-6 w-6 text-purple-200 transition-all duration-300 group-hover/button:rotate-12 group-hover/button:text-purple-100 relative z-10" />
                </button>
                <button
                  onClick={handleNext}
                  className="group/button relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-400/30 hover:from-purple-500/30 hover:to-indigo-500/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm shadow-lg shadow-purple-500/20"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/10 to-indigo-400/10 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                  <IconArrowRight className="h-6 w-6 text-purple-200 transition-all duration-300 group-hover/button:-rotate-12 group-hover/button:text-purple-100 relative z-10" />
                </button>
              </div>

              {/* Enhanced Dots Indicator */}
              <div className="flex justify-center gap-3">
                {events.map((_, index) => (
                  <button
                    key={index}
                    className={`relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                      active === index
                        ? "bg-gradient-to-r from-purple-400 to-indigo-400 scale-110 shadow-lg shadow-purple-400/50"
                        : "bg-purple-300/30 hover:bg-purple-300/50"
                    }`}
                    onClick={() => setActive(index)}
                  >
                    {active === index && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 animate-pulse opacity-50"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};