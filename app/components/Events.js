"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Events() {
  const scrollRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const events = [
    {
      title: "vinhack",
    },
    {
      title: "vincode",
    },
    {
      title: "vinprep",
    },
    {
      title: "vintalks",
    },
    {
      title: "vinfest",
    },
  ];

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile
      } else {
        setCardsPerView(3); // Desktop and tablets
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      let newIndex;
      if (direction === "left") {
        newIndex = Math.max(0, activeIndex - 1);
      } else {
        newIndex = Math.min(events.length - 1, activeIndex + 1);
      }
      
      scrollToCard(newIndex);
    }
  };

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    
    const cardWidth = window.innerWidth < 768 ? 320 + 32 : 384 + 32; // card width + gap
    const containerWidth = scrollRef.current.offsetWidth;
    const scrollLeft = (cardWidth * index) - (containerWidth / 2) + (cardWidth / 2);
    
    scrollRef.current.scrollTo({
      left: Math.max(0, scrollLeft),
      behavior: "smooth"
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const children = Array.from(container.children[0].children);

    let closestIndex = 0;
    let closestOffset = Infinity;

    children.forEach((child, index) => {
      const boxCenter =
        child.getBoundingClientRect().left +
        child.getBoundingClientRect().width / 2;
      const containerCenter = window.innerWidth / 2;
      const offset = Math.abs(containerCenter - boxCenter);

      if (offset < closestOffset) {
        closestOffset = offset;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    
    // Initial scroll to center the first card
    setTimeout(() => {
      scrollToCard(0);
    }, 100);
    
    node.addEventListener("scroll", handleScroll);
    return () => node.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-16 overflow-hidden">
      {/* White Glow Background */}
      <div className="absolute top-1/2 left-1/2 w-[1600px] h-[1800px] -translate-x-1/2 -translate-y-1/2 opacity-60 z-0 pointer-events-none">
        <Image
          src="/hero.png"
          alt="White Glow"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Flashlight bg */}
      <div className="absolute top-[0px] right-[0px] w-[2500px] h-[2400px] pointer-events-none z-0 opacity-75">
        <Image
          src="/light.png"
          alt="Spotlight"
          width={2500}
          height={2000}
          className="object-contain opacity-75"
        />
      </div>

      {/* Content Wrapper */}
      <div className="max-w-7xl w-full text-center z-10">
        <div className="relative inline-block mb-20">
          {/* Top-left corner */}
          <span className="absolute top-[-18] left-[-26] w-10 h-2 bg-white"></span>
          <span className="absolute top-[-18] left-[-26] w-2 h-10 bg-white"></span>

          {/* Bottom-right corner */}
          <span className="absolute bottom-15 right-[-20] w-10 h-2 bg-white"></span>
          <span className="absolute bottom-15 right-[-20] w-2 h-10 bg-white"></span>
          
          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-20 tracking-widest relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            EVENTS
          </h1>
        </div>

        {/* Scrollable Cards Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth no-scrollbar px-4"
            style={{ 
              scrollPaddingInline: "20px",
              // Hide scrollbar but keep functionality
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex gap-8 snap-x snap-mandatory">
              {events.map((event, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={index}
                    className={`bg-white/10 border border-white/20 text-center rounded-3xl snap-center
                      w-80 md:w-96 h-80 md:h-96 p-10 flex-shrink-0
                      flex flex-col justify-center items-center
                      transition-all duration-300
                      ${
                        isActive
                          ? "scale-110 brightness-100 shadow-2xl border-purple-400"
                          : "scale-95 brightness-75"
                      }`}
                  >
                    <h3
                      className="text-4xl font-semibold text-purple-300 mb-6 relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                      style={{ fontFamily: "Orbitron, monospace" }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="text-base text-gray-300 max-w-xs"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {event.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-center space-x-6 mt-12">
          <button
            onClick={() => scroll("left")}
            className="p-3 bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition-colors duration-200 text-white"
            disabled={activeIndex === 0}
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition-colors duration-200 text-white"
            disabled={activeIndex === events.length - 1}
          >
            →
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {events.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                activeIndex === index
                  ? "bg-purple-400"
                  : "bg-white/30"
              }`}
              onClick={() => scrollToCard(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}