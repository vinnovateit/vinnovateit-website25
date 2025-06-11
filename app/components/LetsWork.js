"use client";

import React from "react";

export default function LetsWork() {
  return (
    <div className="bg-black py-15 text-center">
        <img
        src="/letswork3.png"
        alt="LET’S WORK Topmost"
        className="mx-auto w-[95%] md:w-[85%] lg:w-[91%] mb-0"
      />
      {/* Top LET’S WORK image – stays in place */}
      <img
        src="/LET’S WORK (1).png"
        alt="LET’S WORK Top"
        className="mx-auto w-[88%] md:w-[75%] lg:w-[91%] mb-35"
      />

      {/* Main white LET’S WORK image – moved upward independently */}
      <div className="-mt-40">
        <img
          src="/letswork.png"
          alt="LET’S WORK"
          className="mx-auto w-[95%] md:w-[85%] lg:w-[95%] mb-50"
        />
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-[-200px] z-0">
        <img
          src="/letswork4.png"
          alt="LET’S WORK 4"
           className="mx-auto w-[90vw] max-w-none"
        />
      </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-[-100px] z-0">
          <img
            src="/letswork4.png"
            alt="LET’S WORK 4 Bottom"
            className="mx-auto w-[90vw] max-w-none"
          />
        </div>
    </div>
  );
}
