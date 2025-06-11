"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { Linkedin, Instagram, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Board() {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const [screenSize, setScreenSize] = useState('desktop');

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getVisibleCount = () => {
    switch (screenSize) {
      case 'mobile': return 1;
      case 'tablet': return 3;
      default: return 5;
    }
  };

  // Telephone dial effect GSAP ScrollTrigger setup for 14 cards
  useLayoutEffect(() => {
    const container = containerRef.current;
    const carousel = carouselRef.current;
    if (!container || !carousel) return;

    const cards = gsap.utils.toArray(carousel.children);
    const totalCards = cards.length; // 14 cards
    
    // Calculate the total width needed for scrolling
    const cardWidth = screenSize === 'mobile' ? 320 : screenSize === 'tablet' ? 272 : 288;
    const totalWidth = cardWidth * totalCards;
    const containerWidth = container.offsetWidth;
    
    // Adjust scroll distance to ensure all cards (especially 3-13) can reach center
    // We need extra scroll distance to position the last cards in center
    const extraScrollForLastCards = cardWidth * 2; // Extra space for last 2 cards
    const scrollDistance = totalWidth - containerWidth + extraScrollForLastCards;

    // Set up the horizontal scroll animation with telephone dial effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1.2,
        start: "center center",
        end: () => `+=${scrollDistance * 2}`, // Increased multiplier for longer scroll
        invalidateOnRefresh: true,
        anticipatePin: 1,
        refreshPriority: 1,
        onUpdate: (self) => {
          // Telephone dial effect - scale cards based on distance from center
          const containerCenter = containerWidth / 2;
          
          cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
            
            // Calculate distance from center (0 to 1, where 0 is center)
            const distanceFromCenter = Math.abs(cardCenter - containerCenter) / containerCenter;
            const clampedDistance = Math.min(distanceFromCenter, 1);
            
            // Enhanced scaling for better visibility of center cards
            const minScale = 0.6;
            const maxScale = 1.3;
            const scale = maxScale - (clampedDistance * (maxScale - minScale));
            
            // Enhanced opacity for better contrast
            const minOpacity = 0.4;
            const maxOpacity = 1;
            const opacity = maxOpacity - (clampedDistance * (maxOpacity - minOpacity));
            
            // Calculate blur (0 at center, 3px at edges)
            const maxBlur = 3;
            const blur = clampedDistance * maxBlur;
            
            // Calculate vertical offset for curved effect
            const maxYOffset = screenSize === 'mobile' ? 30 : screenSize === 'tablet' ? 40 : 50;
            const yOffset = Math.sin(clampedDistance * Math.PI / 2) * maxYOffset;
            
            // Apply transforms
            gsap.set(card, {
              scale: scale,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              y: yOffset,
              zIndex: Math.round((1 - clampedDistance) * 100),
              transformOrigin: "center center",
            });
          });
        }
      }
    });

    // Animate the carousel container with adjusted distance
    tl.to(carousel, {
      x: -scrollDistance,
      ease: "none",
      duration: 1
    });

    // Initial setup for telephone dial effect
    const containerCenter = containerWidth / 2;
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
      const distanceFromCenter = Math.abs(cardCenter - containerCenter) / containerCenter;
      const clampedDistance = Math.min(distanceFromCenter, 1);
      
      const minScale = 0.6;
      const maxScale = 1.3;
      const scale = maxScale - (clampedDistance * (maxScale - minScale));
      const opacity = 1 - (clampedDistance * 0.6);
      const blur = clampedDistance * 3;
      const maxYOffset = screenSize === 'mobile' ? 30 : screenSize === 'tablet' ? 40 : 50;
      const yOffset = Math.sin(clampedDistance * Math.PI / 2) * maxYOffset;
      const shadowIntensity = (1 - clampedDistance) * 0.5;
      
      gsap.set(card, {
        scale: scale,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        y: yOffset,
        zIndex: Math.round((1 - clampedDistance) * 100),
        boxShadow: `0 ${10 + shadowIntensity * 20}px ${20 + shadowIntensity * 30}px rgba(147, 51, 234, ${shadowIntensity})`
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [screenSize]);

  const boardMembers = [
    {
      name: "Raunak Mehta",
      post: "Events Head",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Raunak+Mehta",
      linkedin: "raunak-mehta",
      instagram: "raunak_mehta",
      github: "raunak-mehta"
    },
    {
      name: "Ayush Kumar",
      post: "Projects Head",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Priya+Sharma",
      linkedin: "priya-sharma",
      instagram: "priya_sharma",
      github: "priya-sharma"
    },
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
      post: "Co Secretary",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Tanmay+Malhotra",
      linkedin: "tanmay-malhotra",
      instagram: "tanmay_malhotra",
      github: "tanmay-malhotra"
    },
    {
      name: "Janvi Chandra",
      post: "Design Head",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Janvi+Chandra",
      linkedin: "janvi-chandra",
      instagram: "janvi_chandra",
      github: "janvi-chandra"
    },
    {
      name: "Ayush Kumar",
      post: "Tech Head",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Ayush+Kumar",
      linkedin: "ayush-kumar",
      instagram: "ayush_kumar",
      github: "ayush-kumar"
    },
    {
      name: "Girijat Purohit",
      post: "Management Head",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Girijat+Purohit",
      linkedin: "girijat-purohit",
      instagram: "girijat_p",
      github: "girijat-purohit"
    },
    
    {
      name: "Mihir Joshi",
      post: "Creative Head",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Mihir+Joshi",
      linkedin: "mihir-joshi",
      instagram: "mihir_joshi",
      github: "mihir-joshi"
    },
    {
      name: "Raunak Mehta",
      post: "Events Head",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Raunak+Mehta",
      linkedin: "raunak-mehta",
      instagram: "raunak_mehta",
      github: "raunak-mehta"
    },
    {
      name: "Ayush Kumar",
      post: "Projects Head",
      photo: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Priya+Sharma",
      linkedin: "priya-sharma",
      instagram: "priya_sharma",
      github: "priya-sharma"
    },
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
  ];

  const renderCard = (member, index) => {
    // Mobile view - single card
    if (screenSize === 'mobile') {
      return (
        <div
          key={index}
          className="w-80 h-[26rem] flex-shrink-0 flex flex-col items-center justify-center"
        >
          {/* Card Background */}
          <div className="relative w-72 h-[22rem] bg-purple-900/20 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-400/30 overflow-hidden transform transition-all duration-300 hover:shadow-purple-500/25">
            {/* Member Photo */}
            <div className="p-5">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-52 object-cover rounded-2xl border border-purple-400/50 transition-all duration-300"
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
    
    // Tablet view - 3 cards
    if (screenSize === 'tablet') {
      return (
        <div
          key={index}
          className="w-68 h-[24rem] flex-shrink-0 flex flex-col items-center justify-center"
        >
          {/* Card Background */}
          <div className="relative w-60 h-[21rem] bg-purple-900/20 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-400/30 overflow-hidden transform transition-all duration-300 hover:shadow-purple-500/25">
            {/* Member Photo */}
            <div className="p-4">
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-44 object-cover rounded-2xl border border-purple-400/50 transition-all duration-300"
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
    
    // Desktop view - 5 cards
    return (
      <div
        key={index}
        className="w-72 h-[26rem] flex-shrink-0 flex flex-col items-center justify-center"
      >
        {/* Card Background */}
        <div className="relative w-64 h-[22rem] bg-purple-900/20 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-400/30 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25">
          {/* Member Photo */}
          <div className="p-5">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-48 object-cover rounded-2xl border border-purple-400/50 transition-all duration-300"
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

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center min-h-screen px-4 lg:px-6 pt-16 md:pt-20 lg:pt-24 pb-12 lg:pb-20 bg-gradient-to-b from-purple-900/20 via-black to-purple-900/20 overflow-hidden"
    >
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
      <div className="relative w-full perspective-1000">
        <div
          ref={carouselRef}
          className="flex items-center"
          style={{ 
            width: `${boardMembers.length * (screenSize === 'mobile' ? 320 : screenSize === 'tablet' ? 272 : 288)}px`,
            willChange: 'transform',
            transformStyle: 'preserve-3d'
          }}
        >
          {boardMembers.map((member, index) => renderCard(member, index))}
        </div>
      </div>
    </div>
  );
}