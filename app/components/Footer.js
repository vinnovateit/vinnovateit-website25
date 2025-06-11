"use client";

import React from "react";
import LetsWork from "./LetsWork"; // ✅ Importing it correctly

// Google Fonts
const googleFontsLink = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap');
`;

export default function Footer() {
  return (
    <>
      {/* Inject Google Fonts */}
      <style jsx global>{googleFontsLink}</style>

      {/* Footer content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1
            className="text-3xl md:text-3xl font-bold text-white mb-12 tracking-wider transform transition-transform duration-500"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            FOOTER
          </h1>

          {/* Paragraph */}
          <div
            className="text-gray-200 text-lg md:text-xl leading-relaxed space-y-8 max-w-3xl mx-auto"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            jakarta sans
          </div>
        </div>
      </div>

      {/* ✅ LetsWork appears visually *after* the main footer */}
      <LetsWork />
    </>
  );
}
