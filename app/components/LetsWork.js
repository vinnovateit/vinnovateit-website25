"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

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
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{
          duration: 0.8,
          delay: index * 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="w-full relative aspect-[16/9] mb-4" // maintains responsive ratio
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={index === 0}
        />
      </motion.div>
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
