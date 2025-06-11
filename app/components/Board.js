"use client";

import React, { useState, useEffect } from "react";
import { Linkedin, Instagram, Github } from "lucide-react";

export default function Board() {
  const [startIndex, setStartIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');
  
  // Check for screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const getVisibleCount = () => {
    switch (screenSize) {
      case 'mobile': return 1;
      case 'tablet': return 3;
      case 'desktop': return 5;
      default: return 5;
    }
  };
  
  const visibleCount = getVisibleCount();

  const boardMembers = [
    {
      name: "Soumojit Ganguly",
      post: "President",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Soumojit+Ganguly",
      linkedin: "soumojit-ganguly",
      instagram: "syro_official",
      github: "soumojit-ganguly"
    },
    {
      name: "Arjan Sinha",
      post: "Vice President",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Arjan+Sinha",
      linkedin: "arjan-sinha",
      instagram: "arjan_sinha",
      github: "arjan-sinha"
    },
    {
      name: "Anirudhh Chowdhury",
      post: "Secretary",
      photo: "/board/aniruddh2.jpg",
      linkedin: "anirudhh-chowdhury",
      instagram: "anirudhh_c",
      github: "anirudhh-chowdhury"
    },
    {
      name: "Tanmay Malhotra",
      post: "Treasurer",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Tanmay+Malhotra",
      linkedin: "tanmay-malhotra",
      instagram: "tanmay_malhotra",
      github: "tanmay-malhotra"
    },
    {
      name: "Janvi Chandra",
      post: "Event Coordinator",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Janvi+Chandra",
      linkedin: "janvi-chandra",
      instagram: "janvi_chandra",
      github: "janvi-chandra"
    },
    {
      name: "Girijat Purohit",
      post: "Technical Lead",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Girijat+Purohit",
      linkedin: "girijat-purohit",
      instagram: "girijat_p",
      github: "girijat-purohit"
    },
    {
      name: "Ayush Kumar",
      post: "Marketing Head",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Ayush+Kumar",
      linkedin: "ayush-kumar",
      instagram: "ayush_kumar",
      github: "ayush-kumar"
    },
    {
      name: "Mihir Joshi",
      post: "Design Lead",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Mihir+Joshi",
      linkedin: "mihir-joshi",
      instagram: "mihir_joshi",
      github: "mihir-joshi"
    },
    {
      name: "Raunak Mehta",
      post: "Operations Manager",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Raunak+Mehta",
      linkedin: "raunak-mehta",
      instagram: "raunak_mehta",
      github: "raunak-mehta"
    },
    {
      name: "Priya Sharma",
      post: "Content Manager",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Priya+Sharma",
      linkedin: "priya-sharma",
      instagram: "priya_sharma",
      github: "priya-sharma"
    }
  ];

  const handleNext = () => {
    if (startIndex + visibleCount < boardMembers.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const renderCard = (member, index) => {
    const relativeIndex = index - startIndex;
    
    // Mobile view - single card
    if (screenSize === 'mobile') {
      return (
        <div
          key={index}
          className="w-80 h-[26rem] flex-shrink-0 flex flex-col items-center justify-center"
        >
          
          
          {/* Card Background */}
          <div className="relative w-72 h-[22rem] bg-purple-900/20 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-400/30 overflow-hidden">
            {/* Member Photo */}
            <div className="p-5">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-52 object-cover rounded-2xl border border-purple-400/50"
              />
            </div>
            
            {/* Member Info */}
            <div className="px-5 pb-5 text-center">
              <h3 
                className="font-bold text-purple-300 mb-3 text-lg leading-tight"
                style={{ fontFamily: "Orbitron, monospace" }}
              >
                {member.name}
              </h3>
              <p 
                className="text-purple-400 mb-4 text-base opacity-90"
                style={{ fontFamily: "Orbitron, monospace" }}
              >
                {member.post}
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-5">
                <a
                  href={`https://linkedin.com/in/${member.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-110"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={`https://instagram.com/${member.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-110"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-110"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Tablet view - 3 cards with center focus
    if (screenSize === 'tablet') {
      let scale = 'scale-90';
      let zIndex = 'z-10';
      
      if (relativeIndex === 1) { // Center card
        scale = 'scale-105';
        zIndex = 'z-20';
      }
      
      return (
        <div
          key={index}
          className={`w-68 h-[24rem] flex-shrink-0 flex flex-col items-center justify-center transition-all duration-300 ${scale} ${zIndex}`}
        >
          {/* Card Background */}
          <div className="relative w-60 h-[21rem] bg-purple-900/20 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-400/30 overflow-hidden">
            {/* Member Photo */}
            <div className="p-4">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-44 object-cover rounded-2xl border border-purple-400/50"
              />
            </div>
            
            {/* Member Info */}
            <div className="px-4 pb-4 text-center">
              <h3 
                className="font-bold text-purple-300 mb-2 text-base leading-tight"
                style={{ fontFamily: "Orbitron, monospace" }}
              >
                {member.name}
              </h3>
              <p 
                className="text-purple-400 mb-3 text-sm opacity-90"
                style={{ fontFamily: "Orbitron, monospace" }}
              >
                {member.post}
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a
                  href={`https://linkedin.com/in/${member.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`https://instagram.com/${member.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Desktop view - 5 cards with center focus and scaling
    let scale = 'scale-80';
    let zIndex = 'z-10';
    
    if (relativeIndex === 1 || relativeIndex === 3) {
      scale = 'scale-95';
    } else if (relativeIndex === 2) { // Center card
      scale = 'scale-115';
      zIndex = 'z-20';
    }
    
    return (
      <div
        key={index}
        className={`w-72 h-[26rem] flex-shrink-0 flex flex-col items-center justify-center transition-all duration-300 ${scale} ${zIndex}`}
      >
        {/* Card Background */}
        <div className="relative w-64 h-[22rem] bg-purple-900/20 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-400/30 overflow-hidden">
          {/* Member Photo */}
          <div className="p-5">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-48 object-cover rounded-2xl border border-purple-400/50"
            />
          </div>
          
          {/* Member Info */}
          <div className="px-5 pb-5 text-center">
            <h3 
              className="font-bold text-purple-300 mb-3 text-lg leading-tight"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              {member.name}
            </h3>
            <p 
              className="text-purple-400 mb-4 text-base opacity-90"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              {member.post}
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              <a
                href={`https://linkedin.com/in/${member.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={`https://instagram.com/${member.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-all duration-200 hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const visibleMembers = boardMembers.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative flex flex-col items-center min-h-screen px-4 lg:px-6 pt-16 md:pt-20 lg:pt-24 pb-12 lg:pb-20 bg-gradient-to-b from-purple-900/20 via-black to-purple-900/20">
      {/* Background Decorations - Responsive */}
      <img
        src="/flower3.png"
        alt="Flower"
        className="absolute top-2 left-2 w-24 h-auto md:top-4 md:left-4 md:w-32 lg:top-6 lg:left-6 lg:w-40 opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10"
      />
      <img
        src="/flower4.png"
        alt="Flower Bottom Right"
        className="absolute bottom-2 right-2 w-32 h-auto md:bottom-4 md:right-4 md:w-44 lg:bottom-6 lg:right-6 lg:w-56 opacity-70 md:opacity-80 lg:opacity-90 pointer-events-none z-10"
      />
      <img
        src="/ringmid.png"
        alt="Ring"
        className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[800px] h-[320px] md:w-[1000px] md:h-[400px] lg:w-[1200px] lg:h-[480px] xl:w-[1400px] xl:h-[560px] pointer-events-none mix-blend-screen opacity-60 md:opacity-70 lg:opacity-80"
      />

      {/* Heading */}
      <h1
        className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 md:mb-12 lg:mb-16 xl:mb-20 tracking-wider text-center relative z-20"
        style={{ fontFamily: "Orbitron, monospace" }}
      >
        BOARD MEMBERS
      </h1>

      {/* Carousel Container */}
      <div className="relative w-full max-w-7xl">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute left-2 md:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl lg:text-4xl font-bold px-2 md:px-4 py-2 z-30 hover:text-purple-400 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        >
          ←
        </button>

        {/* Cards Container */}
        <div className="flex justify-center items-center space-x-4 md:space-x-6 lg:space-x-8 px-16 md:px-20 lg:px-24">
          {visibleMembers.map((member, index) => renderCard(member, startIndex + index))}
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= boardMembers.length}
          className="absolute right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 text-white text-2xl md:text-3xl lg:text-4xl font-bold px-2 md:px-4 py-2 z-30 hover:text-purple-400 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110"
        >
          →
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(boardMembers.length / visibleCount) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setStartIndex(index * visibleCount)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              Math.floor(startIndex / visibleCount) === index 
                ? 'bg-purple-400 w-6' 
                : 'bg-purple-400/40 hover:bg-purple-400/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}