import React from 'react';
import { motion, useInView } from 'framer-motion';

const LetsWork = () => {
  const images = [
    '/letswork_3.png',
    '/letswork_1.png',
    '/letswork.png',
    '/letswork4.png',
    '/letswork_2.png'
  ];

  const AnimatedImage = ({ src, index, alt }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { 
      once: true, 
      margin: "-20% 0px -20% 0px" 
    });

    return (
      <motion.img
        ref={ref}
        src={src}
        alt={alt}
        className="w-full block"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        loading="lazy"
      />
    );
  };

  return (
    <div className="flex flex-col bg-[#0b0013]">
      {images.map((src, index) => (
        <AnimatedImage
          key={index}
          src={src}
          index={index}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default LetsWork;