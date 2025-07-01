import React from 'react';

const SectionHeading = ({ 
  title, 
  className = "",
  containerClassName = "relative inline-block mb-20",
  isMultiline = false
}) => {
  
  return (
    <div className={containerClassName}>
      {/* Top-left corner */}
      <span className="absolute top-[-18] left-[-26] w-10 h-2 bg-purple-300"></span>
      <span className="absolute top-[-18] left-[-26] w-2 h-10 bg-purple-300"></span>

      {/* Bottom-right corner */}
      <span className="absolute bottom-15 right-[-20] w-10 h-2 bg-purple-300"></span>
      <span className="absolute bottom-15 right-[-20] w-2 h-10 bg-purple-300"></span>

      {/* Heading */}
      <h1
        className={`text-3xl md:text-6xl font-bold text-purple-200 mb-20 tracking-widest relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] font-orbitron ${className}`}
      >
        {isMultiline ? (
          title.split(' ').map((word, index) => (
            <span key={index} className="block lg:inline">
              {word}
              {index < title.split(' ').length - 1 && <span className="lg:ml-4"></span>}
            </span>
          ))
        ) : (
          title
        )}
      </h1>
    </div>
  );
};

export default SectionHeading;