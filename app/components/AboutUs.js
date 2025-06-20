"use client"

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const terminalHeaderRef = useRef(null);
  const terminalContentRef = useRef(null);
  const commandRef = useRef(null);
  const textContentRef = useRef(null);
  const robotImageRef = useRef(null);

  useEffect(() => {
    // Check if it's mobile device
    const isMobile = window.innerWidth <= 768;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: isMobile ? "top 90%" : "top 80%", // Earlier trigger on mobile
        end: isMobile ? "bottom 10%" : "bottom 20%", // Different end point for mobile
        toggleActions: "play none none reverse", // play on enter, reverse on leave
        // markers: true, // Uncomment to see trigger points during development
      }
    });

    // Set initial states
    gsap.set(terminalRef.current, { scale: 0, opacity: 0 });
    gsap.set(terminalHeaderRef.current, { opacity: 0 });
    gsap.set(terminalContentRef.current, { opacity: 0 });
    gsap.set(commandRef.current, { opacity: 0 });
    gsap.set(textContentRef.current, { opacity: 0 });
    gsap.set(robotImageRef.current, { opacity: 0, y: 50 });

    // Animation sequence
    tl
      // Terminal window pops open like Windows
      .to(terminalRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.4)"
      })
      
      // Terminal header appears
      .to(terminalHeaderRef.current, {
        opacity: 1,
        duration: 0.3
      })
      
      // Terminal content background appears
      .to(terminalContentRef.current, {
        opacity: 1,
        duration: 0.3
      })
      
      // Command prompt appears
      .to(commandRef.current, {
        opacity: 1,
        duration: 0.2
      })
      
      // Typewriter animation for the command
      .to({}, {
        duration: 1.5,
        onUpdate: function() {
          const progress = this.progress();
          const commandText = "ls -a about_us";
          const currentLength = Math.floor(progress * commandText.length);
          const commandSpan = commandRef.current?.querySelector('.command-text');
          if (commandSpan) {
            commandSpan.textContent = commandText.substring(0, currentLength);
          }
        },
        ease: "none"
      })
      
      // Show main text content
      .to(textContentRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "+=0.3")
      
      // Finally show robot image
      .to(robotImageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.4");

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-black pt-10 flex flex-col items-center justify-center min-h-screen w-full relative p-0 m-0 overflow-visible"
    >
      {/* Animated stars background */}
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
      
      <h1
        className="text-5xl md:text-7xl font-bold mb-12 tracking-wider transform transition-transform duration-500"
        style={{
          fontFamily: 'Orbitron, monospace',
          background: 'radial-gradient(circle at 50% 50%, #fff 0%, #e6e6e6 60%, #bfc0c2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        ABOUT US
      </h1>
      
      <div className="px-10 w-full max-w-6xl mx-auto relative z-10">
        {/* Terminal window */}
        <div 
          ref={terminalRef}
          className="backdrop-blur-2xl rounded-3xl overflow-hidden my-12" 
          style={{ 
            backgroundColor: 'rgba(157, 148, 255, 0.03)', 
            boxShadow: '0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.3)' 
          }}
        >
          {/* Terminal header */}
          <div 
            ref={terminalHeaderRef}
            className="flex items-center justify-center px-6 py-3 backdrop-blur-xl border-b border-white/30 rounded-t-3xl relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:to-white/10 before:rounded-t-3xl before:pointer-events-none" 
            style={{ 
              backgroundColor: 'rgba(28, 31, 48, 0.52)'
            }}
          >
            <div className="flex gap-3">
              <div className="w-2 h-2 md:w-4 md:h-4 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-4 md:h-4 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 md:w-4 md:h-4 bg-green-500 rounded-full"></div>
            </div>
            <div
              className="text-white font-bold text-center flex-1 relative z-20 text-[1rem] md:[1.5rem]" 
              style={{
                fontFamily: 'monospace',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)',
              }}
            >
              terminal ~ /about_us
            </div>
          </div>

          {/* Terminal content */}
          <div 
            ref={terminalContentRef}
            className="flex flex-col md:flex-row items-start gap-0 md:gap-3 p-9 md:p-15 relative z-10 backdrop-blur-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:to-transparent before:pointer-events-none" 
            style={{ 
              backgroundColor: 'rgba(157, 148, 255, 0.30)'
            }}
          >
            {/* Left side - Text content */}
            <div className="flex-1 text-left">
              <div
                ref={commandRef}
                className="mb-9 font-semibold text-[1.2rem] md:text-[1.8rem]"
                style={{
                  fontFamily: 'monospace',
                  color: '#39FF14',
                }}
              >
                <span>&gt; </span>
                <span className="text-white text-lg md:text-2xl command-text"></span>
                <span className="animate-pulse">|</span>
              </div>
              
              <div
                ref={textContentRef}
                className="text-slate-200 pb-2 text-md md:text-xl whitespace-pre-line font-thin leading-relaxed"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1.3,
                  fontWeight: 100,
                  color: '#e2e6f3',
                }}
              >
                VinnovateIT is the one stop destination for
                all you curious cats and satisfy your hunger
                in the diverse world of computer science.

                <br /><br />

                To put it simply... we are the answer to the
                question &quot;What if Elon Musk and Albert
                Einstein had a brain child?&quot;

                <br /><br />

                So come immerse yourself, in what we like
                to believe is the closest thing to Hogwarts
              </div>
            </div>
            
            {/* Right side - Robot image */}
            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center items-center md:mt-0">
              <Image
                ref={robotImageRef}
                src="/robot.png"
                alt="Robot Character"
                width={512}
                height={448}
                className="object-contain mr-[0] md:mr-[-3rem] mt-6 w-[18rem] h-[16rem] md:w-[24rem] md:h-[21rem] lg:w-[32rem] lg:h-[28rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}