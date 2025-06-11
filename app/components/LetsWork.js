import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LetsWork = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  
  const images = [
    '/letswork_3.png',
    '/letswork_1.png',
    '/letswork.png', // Central image (index 2)
  ];

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const imageElements = imagesRef.current;

    if (!container || imageElements.length === 0) return;

    // Set initial states - hide all images except central
    gsap.set(imageElements, { 
      opacity: 0
    });

    // Show only the central image initially (index 2)
    gsap.set(imageElements[2], { 
      opacity: 1
    });

    // Create scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        pin: false,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Move central image from top to center (transform Y)
          const centralOffset = progress < 0.5 ? -100 + (progress * 2 * 100) : 0;
          gsap.set(imageElements[2], {
            y: centralOffset
          });

          // Reveal images above central image first (indices 0, 1)
          [0, 1].forEach((index) => {
            const startProgress = 0.1 + (index * 0.15);
            const endProgress = startProgress + 0.2;
            
            if (progress >= startProgress && progress <= endProgress) {
              const localProgress = (progress - startProgress) / (endProgress - startProgress);
              gsap.set(imageElements[index], {
                opacity: localProgress
              });
            } else if (progress > endProgress) {
              gsap.set(imageElements[index], {
                opacity: 1
              });
            } else {
              gsap.set(imageElements[index], {
                opacity: 0
              });
            }
          });              
        }
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="h-[40vh] md:h-[75vh] bg-[#0b0013]">
      <div 
        ref={containerRef}
        className="flex flex-col relative"
      >
        {images.map((src, index) => (
          <img
            key={index}
            ref={(el) => (imagesRef.current[index] = el)}
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full block relative"
            style={{
              zIndex: index === 2 ? 10 : 1
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LetsWork;