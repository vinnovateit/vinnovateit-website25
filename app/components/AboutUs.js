"use client"

import React from 'react';

export default function AboutUs() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full relative"
      style={{
        background: 'none',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
        overflow: 'visible',
      }}
    >
      {/* Overlay image at top-right */}
      <img
        src="/3D_object_About_us.png" // replace with your image path
        alt="Overlay"
        style={{
          position: 'absolute',
          top: -325,
          right: -10,
          width: '650px', // adjust size as needed
          height: 'auto',
          zIndex: 50, // high enough to be above all content
          pointerEvents: 'none', // so it doesn't block clicks
        }}
      />
      {/* Overlay image at Bottom left */}
      <img
        src="/3D_object1_About_us.png" // replace with your image path
        alt="Overlay"
        style={{
          position: 'absolute',
          bottom: -250,
          left: -10,
          width: '250px', // adjust size as needed
          height: 'auto',
          zIndex: 0, // high enough to be above all content
          pointerEvents: 'none', // so it doesn't block clicks
        }}
      />
      <h1
        className="text-6xl md:text-8xl font-bold mb-12 tracking-wider transform transition-transform duration-500"
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
      <div
        className="w-full max-w-6xl mx-auto"
        style={{
          position: 'relative',
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            background: 'rgba(34, 34, 51, 0.98)',
            border: '2.2px solid #bdbdbd',
            boxShadow: '0 0 12px 8px rgba(255,255,255,0.25)',
            borderRadius: '2rem',
            overflow: 'hidden',
            margin: '3rem 0',
            position: 'relative',
          }}
        >
          {/* Terminal header with perfectly matched top corners */}
          <div
            className="flex items-center px-6 py-3"
            style={{
              background: 'rgba(44, 44, 66, 0.95)',
              borderBottom: '2.2px solid #39395e',
              borderTopLeftRadius: '2rem',
              borderTopRightRadius: '2rem',
            }}
          >
            <div className="flex gap-3">
              <div className="w-4.5 h-4.5 bg-red-500 rounded-full"></div>
              <div className="w-4.5 h-4.5 bg-yellow-400 rounded-full"></div>
              <div className="w-4.5 h-4.5 bg-green-500 rounded-full"></div>
            </div>
            <div
              className="text-gray-400 ml-6"
              style={{
                fontFamily: 'monospace',
                fontSize: '1.5rem',
                opacity: 0.85,
                letterSpacing: '0.05em',
              }}
            >
              terminal ~ /about_us
            </div>
          </div>

          {/* Terminal content */}
          <div className="flex flex-col md:flex-row items-start gap-0 md:gap-3 p-9 md:p-15 relative">
            {/* Left side - Text content */}
            <div className="flex-1 text-left">
              <div
                className="mb-9"
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  fontSize: '1.8rem',
                  color: '#39FF14',
                }}
              >
                <span>&gt; </span>
                <span style={{ color: '#fff', fontSize: '1.8rem' }}>ls -a about_us</span>
              </div>
              <div
                style={{
                  color: '#e2e6f3',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '1.72rem',
                  lineHeight: 1.3,
                  whiteSpace: 'pre-line',
                  fontWeight: 100,
                  paddingBottom: '1.5rem',
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
              <img
                src="/robot.png"
                alt="Robot Character"
                className="object-contain"
                style={{
                  width: '32rem',
                  height: '28rem',
                  marginRight: '-3rem',
                  marginTop: '1.5rem',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
