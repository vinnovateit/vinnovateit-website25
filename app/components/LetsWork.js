import React from 'react';

const LetsWork = () => {
  const images = [
    '/letswork_3.png',
    '/letswork_1.png',
    '/letswork.png',
    '/letswork4.png',
    '/letswork_2.png'
  ];

  return (
    <div className="flex flex-col bg-[#0b0013]">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index + 1}`}
          className="w-full block"
        />
      ))}
    </div>
  );
};

export default LetsWork;