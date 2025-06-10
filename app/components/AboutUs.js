"use client"

import React from 'react';

export default function AboutUs() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full"
      style={{
        background: 'none',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
        overflow: 'hidden',
      }}
    >
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
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.72rem',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-line',
                  fontWeight: 300,
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
                  width: '27rem',
                  height: '22.5rem',
                 // filter: 'drop-shadow(0 0 4.5px #bdbdbd)',
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
