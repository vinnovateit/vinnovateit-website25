"use client";
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import SectionHeading from './SectionHeading';
import AnimatedStarsBackground from './AnimatedStarsBackground';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const projectsRef = useRef([]);
  const buttonsRef = useRef([]);
  const [currentProject, setCurrentProject] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const currentProjectRef = useRef(currentProject); // Ref to track current project without re-renders

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      name: "NEURAL NEXUS",
      description: "An advanced AI-powered platform that revolutionizes data processing and machine learning workflows with cutting-edge neural network architectures.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Python", "TensorFlow", "Node.js"],
      viewLink: "#",
      sourceLink: "#"
    },
    {
      id: 2,
      name: "QUANTUM SYNC",
      description: "A real-time collaboration platform utilizing quantum encryption protocols to ensure secure data transmission across distributed teams.",
      image: "/api/placeholder/600/400",
      technologies: ["Vue.js", "Express", "WebRTC", "MongoDB"],
      viewLink: "#",
      sourceLink: "#"
    },
    {
      id: 3,
      name: "CYBER FORGE",
      description: "A comprehensive cybersecurity toolkit featuring automated threat detection, vulnerability assessment, and real-time monitoring capabilities.",
      image: "/api/placeholder/600/400",
      technologies: ["Angular", "Django", "PostgreSQL", "Docker"],
      viewLink: "#",
      sourceLink: "#"
    },
    {
      id: 4,
      name: "VOID RUNNER",
      description: "An immersive 3D gaming experience built with advanced graphics rendering and physics simulation for next-generation entertainment.",
      image: "/api/placeholder/600/400",
      technologies: ["Unity", "C#", "WebGL", "Blender"],
      viewLink: "#",
      sourceLink: "#"
    },
    {
      id: 5,
      name: "DATA STREAM",
      description: "A powerful analytics dashboard that processes massive datasets in real-time, providing actionable insights through interactive visualizations.",
      image: "/api/placeholder/600/400",
      technologies: ["D3.js", "FastAPI", "Redis", "Kubernetes"],
      viewLink: "#",
      sourceLink: "#"
    },
    {
      id: 6,
      name: "CLOUD MATRIX",
      description: "A distributed cloud infrastructure management system offering automated scaling, monitoring, and optimization for enterprise applications.",
      image: "/api/placeholder/600/400",
      technologies: ["AWS", "Terraform", "Go", "Prometheus"],
      viewLink: "#",
      sourceLink: "#"
    },
    {
      id: 7,
      name: "PIXEL FORGE",
      description: "An innovative image processing and manipulation platform featuring AI-enhanced editing tools and automated content generation.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "OpenCV", "Flask", "PyTorch"],
      viewLink: "#",
      sourceLink: "#"
    },
    {
      id: 8,
      name: "CODE NEXUS",
      description: "A collaborative development environment with integrated version control, code review, and automated deployment pipelines.",
      image: "/api/placeholder/600/400",
      technologies: ["TypeScript", "Git", "CI/CD", "Docker"],
      viewLink: "#",
      sourceLink: "#"
    }
  ];

 // Update ref when state changes
  useEffect(() => {
    currentProjectRef.current = currentProject;
  }, [currentProject]);

  // Check mobile on mount and resize
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
      // FIXED STARS: Remove animation, keep static positions
      const stars = gsap.utils.toArray(".star");
      stars.forEach(star => {
        gsap.set(star, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.5 + 0.3,
          scale: Math.random() * 0.7 + 0.3
        });
      });

      // FIXED SCROLLING: Calculate proper scroll distance
      const scrollDistance = window.innerHeight * (projects.length - 0.5);

      // Main ScrollTrigger for project showcase
      const trigger = ScrollTrigger.create({
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

            // Animation for project change
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

            buttonsRef.current.forEach((buttonContainer, index) => {
              if (buttonContainer) {
                const buttons = buttonContainer.querySelectorAll('button');
                const isEven = newProjectIndex % 2 === 0;

                buttons.forEach(button => {
                  if (isEven) {
                    button.className = button.className.replace(/bg-black|text-purple-400|border-purple-400/g, '');
                    button.className += ' bg-purple-600 text-black border-purple-600 hover:bg-purple-500 hover:border-purple-500';
                  } else {
                    button.className = button.className.replace(/bg-purple-600|text-black|border-purple-600|hover:bg-purple-500|hover:border-purple-500/g, '');
                    button.className += ' bg-black text-purple-400 border-purple-400 hover:bg-gray-900 hover:border-purple-300';
                  }
                });
              }
            });
          }
        }
      });

      // Animate heading on load
      const headingText = new SplitType('.main-heading', { types: 'chars' });
      gsap.from(headingText.chars, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.5
      });

      return () => {
        trigger.kill();
      };
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects.length, isMobile]);

  return (

    <div id='projects' ref={containerRef} className="min-h-screen text-white overflow-hidden flex justify-center relative z-20">
      <AnimatedStarsBackground 
        variant="simple" 
        starCount={300}
        zIndex={0}
      />


      <div className="w-full max-w-7xl flex flex-col items-center z-30 px-4 relative">
        {/* Projects Showcase */}
        <section ref={stickyRef} className="relative z-40 min-h-screen w-full flex flex-col items-center justify-center py-16">
          <div className="w-full">
            <div className="mb-8 sm:mb-12 md:mb-16 flex justify-center">
              <SectionHeading 
                title="PROJECTS" 
                className="text-5xl md:text-7xl"
              />
            </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-purple-900/30 rounded-full mb-6 sm:mb-8 overflow-hidden">
            <div className="progress-fill h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500 ease-out" style={{ width: '12.5%' }}></div>
          </div>

          {/* Project Content */}
          <div className="project-content flex flex-col-reverse md:grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Project Info */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-4">
                <span 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400"
                  style={{ fontFamily: "Orbitron, monospace" }}
                >
                  {String(projects[currentProject].id).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
              </div>

              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wider mt-2 sm:mt-0"
                style={{ fontFamily: "Orbitron, monospace" }}
              >
                {projects[currentProject].name}
              </h2>

              <p 
                className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {projects[currentProject].description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {projects[currentProject].technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-900/30 border border-purple-600/30 rounded-full text-xs sm:text-sm font-medium text-purple-300 backdrop-blur-sm"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div ref={el => buttonsRef.current[currentProject] = el} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                <button 
                  className="px-6 py-2.5 sm:px-8 sm:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  VIEW PROJECT
                </button>
                <button 
                  className="px-6 py-2.5 sm:px-8 sm:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  SOURCE CODE
                </button>
              </div>
            </div>

            {/* Project Image */}
            <div className="relative group w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900/50 rounded-xl sm:rounded-2xl overflow-hidden border border-purple-600/20 backdrop-blur-sm">
                <img 
                  src={projects[currentProject].image}
                  alt={projects[currentProject].name}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Project Counter */}
          <div className="flex justify-center mt-8 sm:mt-12">
            <div 
              className="text-xs sm:text-sm text-purple-400 tracking-widest"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectShowcase;