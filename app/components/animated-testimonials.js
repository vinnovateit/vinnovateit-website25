"use client";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback } from "react";

export const AnimatedTestimonials = ({
  events,
  autoplay = false
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % events.length);
  }, [events.length]);

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
  }, [autoplay, handleNext]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto px-2 sm:px-4 antialiased md:px-8 lg:px-12">
      {/* Enhanced Container with glassmorphism and better gradients */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-900/20 via-indigo-900/15 to-violet-900/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/25 p-4 sm:p-6 md:p-12 lg:p-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20 sm:opacity-30">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-36 h-36 sm:w-54 sm:h-54 lg:w-72 lg:h-72 bg-violet-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Multiple layered borders for depth */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-gradient-to-r from-purple-400/20 via-indigo-400/20 to-violet-400/20 pointer-events-none"></div>
        <div className="absolute inset-1 rounded-2xl sm:rounded-3xl border border-white/5 pointer-events-none"></div>
        
        {/* Enhanced gradient overlay with better blending */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-600/10 via-transparent to-indigo-600/10 pointer-events-none"></div>
        
        <div className="relative grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 lg:gap-16 xl:gap-24 2xl:gap-64 lg:grid-cols-2">
          {/* Enhanced Image Section */}
          <div className="order-1 lg:order-1 -mt-4 sm:-mt-6 md:-mt-8 lg:mt-0">
            <div className="relative h-48 sm:h-56 md:h-64 w-full lg:h-[400px] xl:h-[500px] 2xl:h-[550px]">
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
                    className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-10 xl:inset-12 origin-bottom"
                  >
                    <div className="relative w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-purple-400/30 hover:border-purple-300/50 transition-all duration-300">
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
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-inner shadow-purple-500/20 pointer-events-none"></div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Enhanced Text Section */}
          <div className="order-2 lg:order-2 flex flex-col py-2 sm:py-4 md:py-6 lg:py-8 xl:py-12 relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[400px] xl:min-h-[500px] 2xl:min-h-[550px]">
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
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 lg:mb-6 tracking-wider drop-shadow-[0_0_30px_rgba(168,85,247,0.6)] font-orbitron relative">
                  {events[active].name}
                  {/* Subtle glow effect behind text */}
                  <span className="absolute inset-0 blur-lg bg-gradient-to-r from-purple-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent opacity-50 -z-10">
                    {events[active].name}
                  </span>
                </h3>
                
                {/* Enhanced Event Description */}
                <motion.p className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-jakarta relative">
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
            <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 xl:bottom-12 left-0 right-0 flex flex-col items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {/* Enhanced Navigation Buttons */}
              <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center">
                <button
                  onClick={handlePrev}
                  className="group/button relative flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-400/30 hover:from-purple-500/30 hover:to-indigo-500/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm shadow-lg shadow-purple-500/20"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/10 to-indigo-400/10 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                  <IconArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-200 transition-all duration-300 group-hover/button:rotate-12 group-hover/button:text-purple-100 relative z-10" />
                </button>
                <button
                  onClick={handleNext}
                  className="group/button relative flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-400/30 hover:from-purple-500/30 hover:to-indigo-500/30 hover:border-purple-300/50 transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm shadow-lg shadow-purple-500/20"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/10 to-indigo-400/10 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                  <IconArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-200 transition-all duration-300 group-hover/button:-rotate-12 group-hover/button:text-purple-100 relative z-10" />
                </button>
              </div>

              {/* Enhanced Dots Indicator */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {events.map((_, index) => (
                  <button
                    key={index}
                    className={`relative w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
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