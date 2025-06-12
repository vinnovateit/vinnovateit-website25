import React from 'react';

const BackgroundDecorations = () => {
  return (
    <>
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
    </>
  );
};

export default BackgroundDecorations;