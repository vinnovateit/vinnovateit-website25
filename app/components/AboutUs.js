"use client"

import React from 'react';
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative p-0 m-0 overflow-visible">
      {/* Overlay image at top-right */}
      <Image
        src="/3D_object_About_us.png"
        alt="Overlay"
        width={400}
        height={350}
        className="absolute -top-70 -right-2 z-50 pointer-events-none w-[250px] md:w-[300px] lg:w-[400px] h-auto"
      />
      
      {/* Overlay image at Bottom left */}
      <Image
        src="/3D_object1_About_us.png"
        alt="Overlay"
        width={250}
        height={200}
        className="absolute -bottom-64 -left-2 z-0 pointer-events-none w-[250px] sm:w-[200px] xs:w-[150px] h-auto"
      />
      
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
      
      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Terminal window */}
        <div className="backdrop-blur-2xl rounded-3xl overflow-hidden my-12" style={{ 
          backgroundColor: 'rgba(157, 148, 255, 0.03)', 
          boxShadow: '0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.3)' 
        }}>
          {/* Terminal header */}
          <div className="flex items-center justify-center px-6 py-3 backdrop-blur-xl border-b border-white/30 rounded-t-3xl relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:to-white/10 before:rounded-t-3xl before:pointer-events-none" style={{ 
            backgroundColor: 'rgba(28, 20, 240, 0.05)'
          }}>
            <div className="flex gap-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
            <div
              className="text-white font-bold text-center flex-1 relative z-20"
              style={{
                fontFamily: 'monospace',
                fontSize: '1.5rem',
                letterSpacing: '0.05em',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)',
              }}
            >
              terminal ~ /about_us
            </div>
          </div>

          {/* Terminal content */}
          <div className="flex flex-col md:flex-row items-start gap-0 md:gap-3 p-9 md:p-15 relative z-10 backdrop-blur-xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:to-transparent before:pointer-events-none" style={{ 
            backgroundColor: 'rgba(157, 148, 255, 0.02)'
          }}>
            {/* Left side - Text content */}
            <div className="flex-1 text-left">
              <div
                className="mb-9 font-semibold"
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  fontSize: '1.8rem',
                  color: '#39FF14',
                }}
              >
                <span>&gt; </span>
                <span className="text-white text-3xl">ls -a about_us</span>
              </div>
              
              <div
                className="text-slate-200 pb-6 whitespace-pre-line font-thin leading-relaxed"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.5rem',
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
                question "What if Elon Musk and Albert
                Einstein had a brain child?"

                <br /><br />

                So come immerse yourself, in what we like
                to believe is the closest thing to Hogwarts
              </div>
            </div>
            
            {/* Right side - Robot image */}
            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center items-center mt-12 md:mt-0">
              <Image
                src="/robot.png"
                alt="Robot Character"
                width={512}
                height={448}
                className="object-contain mr-[-3rem] mt-6 w-[18rem] h-[16rem] md:w-[24rem] md:h-[21rem] lg:w-[32rem] lg:h-[28rem]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Image
        src="/semi-sphere.png"
        alt="Ring"
        width={650}
        height={650}
        className="absolute top-125 right-0 w-[300px] sm:w-[450px] lg:w-[650px] h-auto pointer-events-none opacity-80 mix-blend-screen"
      /> */}
    </div>
  );
}