"use client"

import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import gsap from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import AnimatedStarsBackground from './AnimatedStarsBackground';
import SectionHeading from './SectionHeading';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function AboutUs() {
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const textContentRef = useRef(null);
  const robotImageRef = useRef(null);
  const commandTextRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            toggleActions: "play none none reverse",
          }
        });

        gsap.set(terminalRef.current, { scale: 0.8, opacity: 0 });
        gsap.set(textContentRef.current, { opacity: 0, y: 20 });
        gsap.set(robotImageRef.current, { opacity: 0, y: 50 });
        gsap.set(commandTextRef.current, { text: "" });

        tl
          .to(terminalRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.4)"
          })
          .to(commandTextRef.current, {
            duration: 1.5,
            text: "ls -a about_us",
            ease: "none",
          }, "+=0.5")
          .to(textContentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          }, "+=0.3")
          .to(robotImageRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
          }, "-=0.5");

      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      id="aboutus"
      ref={containerRef}
      className="pt-10 flex flex-col items-center justify-center min-h-screen w-full relative p-0 m-0 overflow-visible"
    >
      <AnimatedStarsBackground 
        variant="simple" 
        starCount={100}
        zIndex={0}
      />
      
      <SectionHeading 
        title="ABOUT US"
      />

      <div className="px-10 w-full max-w-6xl mx-auto relative z-10 -mt-20">
        {/* Terminal window */}
        <div 
          ref={terminalRef}
          className="relative rounded-3xl overflow-hidden my-12 border border-purple-500/30" 
          style={{ 
            boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)',
          }}
        >
          {/* Glassmorphic backdrop - similar to navbar */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/20 rounded-3xl" />
          
          {/* SVG mask for proper glass effect */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <mask id="terminalMask">
                <rect
                  width="100%"
                  height="100%"
                  fill="white"
                  rx="24"
                  ry="24"
                />
              </mask>
            </defs>
          </svg>
          
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-black/40 to-purple-900/15 rounded-3xl" />
          {/* Terminal header */}
          <div 
            className="relative flex items-center justify-center px-6 py-3 border-b border-white/30 rounded-t-3xl z-20" 
            style={{ 
              background: 'rgba(28, 31, 48, 0.52)',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Header backdrop blur */}
            <div className="absolute inset-0 backdrop-blur-md bg-black/30 rounded-t-3xl border border-white/15 border-b-0" />
            
            <div className="flex gap-3 relative z-10">
              <div className="w-2 h-2 md:w-4 md:h-4 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-4 md:h-4 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 md:w-4 md:h-4 bg-green-500 rounded-full"></div>
            </div>
            <div
              className="text-white font-bold text-center flex-1 relative z-10 text-[1rem] md:text-[1.5rem]" 
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)',
              }}
            >
              terminal ~ /about_us
            </div>
          </div>

          {/* Terminal content */}
          <div 
            className="relative flex flex-col md:flex-row items-start gap-0 md:gap-3 p-9 md:p-15 z-20" 
          >
            {/* Content backdrop blur */}
            <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-purple-900/10 via-black/20 to-purple-900/10" />
            {/* Left side - Text content */}
            <div className="flex-1 text-left relative z-10">
              <div
                className="mb-9 font-semibold text-[1.2rem] md:text-[1.8rem] relative z-10"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#33C265',
                }}
              >
                <span>&gt; </span>
                <span ref={commandTextRef} className="text-white text-lg md:text-2xl"></span>
                <span className="animate-pulse">|</span>
              </div>
              
              <div
                ref={textContentRef}
                className="text-slate-200 pb-2 text-md md:text-xl whitespace-pre-line font-thin leading-relaxed relative z-10"
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
            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center items-center md:mt-0 relative z-10">
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