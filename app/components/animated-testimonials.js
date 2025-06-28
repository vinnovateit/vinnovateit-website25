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
    <div className="mx-auto px-4 font-sans antialiased md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-8 md:gap-16 lg:gap-64 lg:grid-cols-2">
        {/* Image Section - Made Larger */}
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
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src={event.image}
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          priority
          className="object-cover object-center"
        />
      </div>
    </motion.div>
  ))}
</AnimatePresence>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-between py-4 md:py-8 lg:py-12">
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
            {/* Event Name */}
            <h3 
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-purple-400 mb-4 md:mb-6 tracking-wider drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] font-orbitron"
            >
              {events[active].name}
            </h3>
            
            {/* Event Description */}
            <motion.p 
              className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-jakarta"
            >
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
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-8 md:pt-12 lg:pt-16 justify-center">
            <button
              onClick={handlePrev}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <IconArrowLeft className="h-6 w-6 text-white transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <IconArrowRight className="h-6 w-6 text-white transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4 md:mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  active === index
                    ? "bg-purple-400 scale-110"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};