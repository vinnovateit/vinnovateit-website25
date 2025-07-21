"use client";
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { motion, useInView } from 'framer-motion';
import SectionHeading from './SectionHeading';
import AnimatedStarsBackground from './AnimatedStarsBackground';

gsap.registerPlugin(ScrollTrigger);

const Projects= () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const buttonsRef = useRef([]);
  const [currentProject, setCurrentProject] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const currentProjectRef = useRef(currentProject);

  // Refs for scroll animations
  const headingRef = useRef(null);
  const progressRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const counterRef = useRef(null);

  // Check if elements are in view
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
  const isProgressInView = useInView(progressRef, { once: true, margin: "-50px" });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });
  const isCounterInView = useInView(counterRef, { once: true, margin: "-50px" });

  const projects = [
    {
      id: 1,
      name: "MESSIT",
      description: "Check what's cooking before you commit. MESSIT shows the full mess menu so you know when it's worth the trip — and when to make other 'arrangements'.",
      image: "/messit2.webp",
      viewLink: "https://messit.vinnovateit.com/",
    },
    {
      id: 2,
      name: "STUDYHUB",
      description: "Your saviour during exams and assignment panic! Find notes, study material — basically everything you need to survive (and maybe ace) your courses.",
      image: "/proj_studyhub.webp",
      viewLink: "https://studyhub.vinnovateit.com/",
      sourceLink: "https://github.com/vinnovateit/StudyHub2"
    },
    {
      id: 3,
      name: "BUNKBUDDIES",
      description: "No one likes rooming with a random stranger. Find your perfect hostel roommate *before* counselling — because good company makes hostel life way better!",
      image: "/bb2.webp",
      viewLink: "https://bunkbuddies.vinnovateit.com/",
    },
    {
      id: 4,
      name: "SWAPIT",
      description: "A hassle-free platform to manage course add and drop after allocation. Connect with peers looking to swap courses and optimize your timetable smoothly.",
      image: "/swapitt.webp",
      viewLink: "https://swapit.vinnovateit.com/",
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 60,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const fadeInLeft = {
    hidden: { 
      opacity: 0, 
      x: -60,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const fadeInRight = {
    hidden: { 
      opacity: 0, 
      x: 60,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const scaleIn = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const progressBar = {
    hidden: { width: "0%" },
    visible: { 
      width: `${((currentProject + 1) / projects.length) * 100}%`,
      transition: {
        duration: 1,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const staggerItem = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75]
      }
    }
  };

  useEffect(() => {
    currentProjectRef.current = currentProject;
  }, [currentProject]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollDistance = window.innerHeight * (projects.length - 0.5);

      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        preventOverlaps: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const newProjectIndex = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          );

          if (newProjectIndex !== currentProjectRef.current) {
            setCurrentProject(newProjectIndex);
            const duration = isMobile ? 0.2 : 0.3;

            gsap.to(".project-content", {
              opacity: 0,
              y: isMobile ? 10 : 20,
              duration,
              onComplete: () => {
                gsap.to(".project-content", {
                  opacity: 1,
                  y: 0,
                  duration: duration + 0.2,
                  ease: "power2.out"
                });
              }
            });

            gsap.to(".progress-fill", {
              width: `${((newProjectIndex + 1) / projects.length) * 100}%`,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        }
      });

      const headingText = new SplitType('.main-heading', { types: 'chars' });
      gsap.from(headingText.chars, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.5
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects.length, isMobile]);

  return (
    <div id="projects" ref={containerRef} className="relative min-h-screen text-white overflow-hidden z-20 w-screen">
      <div className="w-screen flex flex-col items-center z-30 relative">
        <section ref={stickyRef} className="relative z-40 min-h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <AnimatedStarsBackground
              variant="structured" 
              starCount={80}
              zIndex={1}
            />
          </div>

          {/* Main Content */}
          <div className="w-full z-20">
            {/* Animated Heading */}
            <motion.div 
              ref={headingRef}
              className="mb-4 sm:mb-8 md:mb-12 lg:mb-16 flex justify-center"
              initial="hidden"
              animate={isHeadingInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <SectionHeading
                title="PROJECTS"
                containerClassName="relative inline-block mt-0 sm:mt-2 md:mt-6 lg:mt-8"
              />
            </motion.div>

            <div>
              {/* Animated Progress Bar */}
              <motion.div 
                ref={progressRef}
                className="w-full flex justify-center px-5"
                initial="hidden"
                animate={isProgressInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <div className="w-full max-w-6xl h-1 bg-purple-900/30 rounded-full mb-3 sm:mb-6 md:mb-8 overflow-hidden">
                  <motion.div 
                    className="progress-fill h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500 ease-out" 
                    initial="hidden"
                    animate={isProgressInView ? "visible" : "hidden"}
                    variants={progressBar}
                  />
                </div>
              </motion.div>

              {/* Animated Project Content */}
              <div className="project-content flex flex-col-reverse md:grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center max-w-6xl mx-auto px-10">
                {/* Left Content */}
                <motion.div 
                  ref={contentRef}
                  className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6"
                  initial="hidden"
                  animate={isContentInView ? "visible" : "hidden"}
                  variants={staggerContainer}
                >
                  <motion.div 
                    className="flex items-center gap-3 sm:gap-4"
                    variants={staggerItem}
                  >
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400 font-orbitron">
                      {String(projects[currentProject].id).padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
                  </motion.div>

                  <motion.h2 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider mt-1 sm:mt-2 font-orbitron"
                    variants={staggerItem}
                  >
                    {projects[currentProject].name}
                  </motion.h2>

                  <motion.p 
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed font-jakarta"
                    variants={staggerItem}
                  >
                    {projects[currentProject].description}
                  </motion.p>

                  {(projects[currentProject].viewLink || projects[currentProject].sourceLink) && (
                    <motion.div 
                      ref={el => buttonsRef.current[currentProject] = el} 
                      className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4"
                      variants={staggerItem}
                    >
                      {projects[currentProject].viewLink && (
                        <motion.button
                          className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base font-jakarta"
                          onClick={() => window.open(projects[currentProject].viewLink, '_blank')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          VIEW PROJECT
                        </motion.button>
                      )}
                      {projects[currentProject].sourceLink && (
                        <motion.button
                          className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base font-jakarta"
                          onClick={() => window.open(projects[currentProject].sourceLink, '_blank')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          SOURCE CODE
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </motion.div>

                {/* Right Image */}
                <motion.div 
                  ref={imageRef}
                  className="relative group w-full"
                  initial="hidden"
                  animate={isImageInView ? "visible" : "hidden"}
                  variants={fadeInRight}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl md:rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-purple-600/20 backdrop-blur-sm">
                    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
                      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
                        <Image
                          src={projects[currentProject].image}
                          alt={projects[currentProject].name}
                          fill
                          quality={100}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw,
                                 (max-width: 768px) 100vw,
                                 (max-width: 1024px) 100vw,
                                 100vw"
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </motion.div>
              </div>

              {/* Animated Counter */}
              <motion.div 
                ref={counterRef}
                className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-12"
                initial="hidden"
                animate={isCounterInView ? "visible" : "hidden"}
                variants={fadeInUp}
              >
                <div className="text-xs sm:text-sm text-purple-400 tracking-widest font-orbitron">
                  {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;