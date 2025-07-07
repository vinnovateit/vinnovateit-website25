"use client";
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import SectionHeading from './SectionHeading';
import AnimatedStarsBackground from './AnimatedStarsBackground';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const buttonsRef = useRef([]);
  const [currentProject, setCurrentProject] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const currentProjectRef = useRef(currentProject);

  const projects = [
    {
      id: 1,
      name: "MESSIT",
      description: "Check what's cooking before you commit. MESSIT shows the full mess menu so you know when it's worth the trip — and when to make other 'arrangements'.",
      image: "messit.png",
      viewLink: "https://messit.vinnovateit.com/",
    },
    {
      id: 2,
      name: "STUDYHUB",
      description: "Your saviour during exams and assignment panic! Find notes, study material — basically everything you need to survive (and maybe ace) your courses.",
      image: "studyhub2.png",
      viewLink: "https://studyhub.vinnovateit.com/",
      sourceLink: "https://github.com/vinnovateit/StudyHub2"
    },
    {
      id: 3,
      name: "BUNKBUDDIES",
      description: "No one likes rooming with a random stranger. Find your perfect hostel roommate *before* counselling — because good company makes hostel life way better!",
      image: "bunkbuddies.png",
      viewLink: "https://bunkbuddies.vinnovateit.com/",
    },
    {
      id: 4,
      name: "SWAPIT",
      description: "A hassle-free platform to manage course add and drop after allocation. Connect with peers looking to swap courses and optimize your timetable smoothly.",
      image: "swapitt.png",
      viewLink: "https://swapit.vinnovateit.com/",
    }
  ];

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

          <div className="hidden md:block absolute top-0 lg:-top-15 -left-10 w-35 h-35 md:w-64 md:h-64 lg:w-80 lg:h-80 pointer-events-none z-150 transform rotate-5">
            <Image src="/3d_Projects.png" alt="Flower" fill/>
          </div>

          {/* Main Content */}
          <div className="w-full z-20">
            <div className="mb-4 sm:mb-8 md:mb-12 lg:mb-16 flex justify-center">
              <SectionHeading
                title="PROJECTS"
                containerClassName="relative inline-block mt-0 sm:mt-2 md:mt-6 lg:mt-8"
              />
            </div>

            <div>
              <div className="w-full flex justify-center px-5">
  <div className="w-full max-w-6xl h-1 bg-purple-900/30 rounded-full mb-3 sm:mb-6 md:mb-8 overflow-hidden">
    <div className="progress-fill h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500 ease-out" style={{ width: '12.5%' }}></div>
  </div>
</div>

              <div className="project-content flex flex-col-reverse md:grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center max-w-6xl mx-auto px-10">
                <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400 font-orbitron">
                      {String(projects[currentProject].id).padStart(2, '0')}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider mt-1 sm:mt-2 font-orbitron">
                    {projects[currentProject].name}
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed font-jakarta">
                    {projects[currentProject].description}
                  </p>

                  {(projects[currentProject].viewLink || projects[currentProject].sourceLink) && (
                    <div ref={el => buttonsRef.current[currentProject] = el} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4">
                      {projects[currentProject].viewLink && (
                        <button
                          className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base font-jakarta"
                          onClick={() => window.open(projects[currentProject].viewLink, '_blank')}
                        >
                          VIEW PROJECT
                        </button>
                      )}
                      {projects[currentProject].sourceLink && (
                        <button
                          className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base font-jakarta"
                          onClick={() => window.open(projects[currentProject].sourceLink, '_blank')}
                        >
                          SOURCE CODE
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="relative group w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl md:rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-purple-600/20 backdrop-blur-sm">
                    <img
                      src={projects[currentProject].image}
                      alt={projects[currentProject].name}
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-fill transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-12">
                <div className="text-xs sm:text-sm text-purple-400 tracking-widest font-orbitron">
                  {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectShowcase;