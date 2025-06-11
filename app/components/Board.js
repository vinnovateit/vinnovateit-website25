"use client";

import React, { useState } from "react";

export default function Board() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;
  const containerWidth = 1200;
  const cardWidth = 220;

  const cardTexts = [
    "Soumojit Ganguly(Syro)", "Arjan Sinha", "Anirudhh Chowdhury", "Tanmay Malhotra", "Janvi Chandra",
    "Girijat Purohit", "Ayush Kumar", "Mihir Joshi", "Raunak Mehta", "Ayush Kumar"
  ];

  const handleNext = () => {
    if (startIndex + visibleCount < cardTexts.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const cards = cardTexts.map((text, i) => {
    const relativeIndex = i - startIndex;

    let scale = "scale-75";
    let zIndex = "z-10";
    let ringSize = "w-[180px] h-[200px]";
    let cardSize = "w-[85px] h-[120px]";
    let textSize = "text-xs";
    let topOffset = "top-[38px]";
    let horizontalMargin = "mx-4";

    if (relativeIndex === 0 || relativeIndex === 4) {
      horizontalMargin = "mx-2";
    } else if (relativeIndex === 2) {
      horizontalMargin = "mx-6";
    }

    if (relativeIndex === 1 || relativeIndex === 3) {
      scale = "scale-90";
      ringSize = "w-[240px] h-[260px]";
      cardSize = "w-[120px] h-auto";
      topOffset = "top-[55px]";
    } else if (relativeIndex === 2) {
      scale = "scale-120";
      zIndex = "z-20";
      ringSize = "w-[260px] h-[300px]";
      cardSize = "w-[120px] h-[160px]";
      topOffset = "top-[65px]";
      textSize = "text-sm";
    }

    return (
      <div
        key={i}
        className={`relative w-[200px] h-[320px] shrink-0 flex flex-col items-center justify-start transition-transform duration-300 ${scale} ${zIndex} ${horizontalMargin}`}
      >
        <img
          src="/Rectangle 24.png"
          alt={`Boundary ${i + 1}`}
          className={`absolute object-contain mix-blend-screen opacity-100 ${ringSize}`}
        />
        <img
          src="/Rectangle 36.png"
          alt={`Card ${i + 1}`}
          className={`relative ${cardSize} ${topOffset} brightness-110`}
        />
        <div className={`absolute ${topOffset} ${cardSize} flex items-end justify-center`}>
          <p className={`text-black text-center font-normal ${textSize} bg-white bg-opacity-100 p-1 rounded`}>
            {text}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="relative flex flex-col items-center min-h-screen px-6 pt-22 pb-12">
      {/* Background Decorations */}
      <img
        src="/flower3.png"
        alt="Flower"
        className="absolute top-[10px] left-[0px] w-[200px] h-auto opacity-90 pointer-events-none z-10"
      />
      <img
        src="/flower4.png"
        alt="Flower Bottom Right"
        className="absolute bottom-[-10px] right-[0px] w-[300px] h-auto opacity-90 pointer-events-none z-10"
      />
      <img
        src="/ringmid.png"
        alt="Ring"
        className="absolute top-[0.5rem] left-1/2 transform -translate-x-1/2 w-[1500px] h-[660px] pointer-events-none mix-blend-screen opacity-80"
      />

      {/* Heading */}
      <h1
        className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-wider"
        style={{ fontFamily: "Orbitron, monospace" }}
      >
        BOARD MEMBERS
      </h1>

      {/* Scrollable Card Row */}
      <div className="relative w-full mt-10">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-[40px] top-[60%] transform -translate-y-1/2 text-white text-2xl font-bold px-4 py-2 z-20"
        >
          ←
        </button>

        {/* Cards */}
        <div className="mx-auto overflow-hidden w-[1200px] relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${startIndex * cardWidth}px + 50% - ${containerWidth / 2}px))`,
            }}
          >
            {cards}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-[40px] top-[60%] transform -translate-y-1/2 text-white text-2xl font-bold px-4 py-2 z-20"
        >
          →
        </button>
      </div>
    </div>
  );
}
