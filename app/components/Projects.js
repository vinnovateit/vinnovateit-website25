
"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const progressRef = useRef(null);
  const projectsRef = useRef([]);
  const buttonsRef = useRef([]);
  const progressItemsRef = useRef([]);
  const [currentProject, setCurrentProject] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  // Deterministic star generation function
  const generateDeterministicStars = useCallback(() => {
    const stars = [];
    const gridCols = 20;
    const gridRows = 15;

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        // Use a simple hash function based on position for deterministic properties
        const hash = (row * gridCols + col) * 2654435761;
        const shouldShow = (hash % 100) < 25; // 25% chance to show star

        if (shouldShow) {
          const x = (col / gridCols) * 100;
          const y = (row / gridRows) * 100;
          const size = 1 + ((hash % 1000) / 1000) * 2; // Size between 1-3px
          const opacity = 0.3 + ((hash % 700) / 1000) * 0.5; // Opacity 0.3-0.8
          const delay = (hash % 3000) / 1000; // Delay 0-3s
          const duration = 2 + ((hash % 2000) / 1000); // Duration 2-4s

          stars.push({
            id: `star-${row}-${col}`,
            x,
            y,
            size,
            opacity,
            delay,
            duration
          });
        }
      }
    }
    return stars;
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update progress highlighting
  const updateProgressHighlighting = useCallback((newIndex) => {
    progressItemsRef.current.forEach((item, index) => {
      if (item) {
        if (index === newIndex) {
          item.classList.add('progress-active');
          item.classList.remove('progress-inactive');
        } else {
          item.classList.add('progress-inactive');
          item.classList.remove('progress-active');
        }
      }
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Configure GSAP for mobile optimization
      gsap.config({
        force3D: true,
        nullTargetWarn: false
      });

      // Create deterministic starfield animation
      const stars = generateDeterministicStars();

      stars.forEach(star => {
        const starElement = document.getElementById(star.id);
        if (starElement) {
          gsap.set(starElement, {
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity
          });

          // Animate stars with deterministic properties
          gsap.to(starElement, {
            duration: star.duration,
            opacity: star.opacity * 0.3,
            scale: 0.7,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: star.delay
          });
        }
      });

      // Mobile-optimized ScrollTrigger configuration
      const scrollTriggerConfig = {
        trigger: stickyRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (isMobile ? 1.5 : 2)}`,
        pin: true,
        pinSpacing: true,
        preventOverlaps: true,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newProjectIndex = Math.min(
            Math.floor(progress * projects.length),
            projects.length - 1
          );

          if (newProjectIndex !== currentProject) {
            setCurrentProject(newProjectIndex);
            updateProgressHighlighting(newProjectIndex);

            // Optimized animations for mobile
            const animationDuration = isMobile ? 0.2 : 0.3;
            const animationEase = isMobile ? "power1.out" : "power2.out";

            // Animate project content
            gsap.to(".project-content", {
              opacity: 0,
              y: isMobile ? 10 : 20,
              duration: animationDuration,
              ease: animationEase,
              onComplete: () => {
                gsap.to(".project-content", {
                  opacity: 1,
                  y: 0,
                  duration: animationDuration * 1.5,
                  ease: animationEase
                });
              }
            });

            // Animate progress bar
            gsap.to(".progress-fill", {
              width: `${((newProjectIndex + 1) / projects.length) * 100}%`,
              duration: animationDuration * 2,
              ease: animationEase
            });

            // Apply alternating button styles with mobile optimization
            buttonsRef.current.forEach((buttonContainer) => {
              if (buttonContainer) {
                const buttons = buttonContainer.querySelectorAll('button');
                const isEven = newProjectIndex % 2 === 0;

                buttons.forEach(button => {
                  // Remove all existing classes
                  button.className = button.className.replace(
                    /bg-(black|purple-600|gray-900) text-(black|purple-400|purple-300) border-(black|purple-600|purple-400) hover:(bg-(gray-900|purple-500)|border-(purple-300|purple-500))/g, 
                    ''
                  );

                  // Apply new classes based on even/odd
                  if (isEven) {
                    button.className += ' bg-purple-600 text-black border-purple-600 hover:bg-purple-500 hover:border-purple-500';
                  } else {
                    button.className += ' bg-black text-purple-400 border-purple-400 hover:bg-gray-900 hover:border-purple-300';
                  }
                });
              }
            });
          }
        }
      };

      // Add mobile-specific configurations
      if (isMobile) {
        scrollTriggerConfig.normalizeScroll = false;
        scrollTriggerConfig.ignoreMobileResize = true;
      }

      ScrollTrigger.create(scrollTriggerConfig);

      // Animate heading on load with mobile optimization
      const headingText = new SplitType('.main-heading', { types: 'chars' });
      gsap.from(headingText.chars, {
        opacity: 0,
        y: isMobile ? 30 : 50,
        duration: isMobile ? 0.6 : 0.8,
        stagger: isMobile ? 0.03 : 0.05,
        ease: "power2.out",
        delay: 0.3
      });

      // Initialize progress highlighting
      updateProgressHighlighting(0);

    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [currentProject, projects.length, isMobile, generateDeterministicStars, updateProgressHighlighting]);

  const stars = generateDeterministicStars();

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Deterministic Starfield Background */}
      <div className="fixed inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            id={star.id}
            className="absolute bg-white rounded-full will-change-transform"
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <div className="relative inline-block mb-12 sm:mb-20">
            {/* Top-left corner */}
            <span className="absolute -top-3 sm:-top-4 -left-4 sm:-left-6 w-8 sm:w-10 h-0.5 bg-purple-400 shadow-lg shadow-purple-400/50"></span>
            <span className="absolute -top-3 sm:-top-4 -left-4 sm:-left-6 w-0.5 h-8 sm:h-10 bg-purple-400 shadow-lg shadow-purple-400/50"></span>

            {/* Bottom-right corner */}
            <span className="absolute -bottom-3 sm:-bottom-4 -right-4 sm:-right-6 w-8 sm:w-10 h-0.5 bg-purple-400 shadow-lg shadow-purple-400/50"></span>
            <span className="absolute -bottom-3 sm:-bottom-4 -right-4 sm:-right-6 w-0.5 h-8 sm:h-10 bg-purple-400 shadow-lg shadow-purple-400/50"></span>

            {/* Heading */}
            <h1
              className="main-heading text-4xl sm:text-6xl md:text-8xl font-bold text-purple-200 tracking-widest relative z-10 drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              PROJECTS
            </h1>
          </div>

          <p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Explore a collection of innovative digital experiences crafted with cutting-edge technologies
          </p>
        </div>
      </section>

      {/* Projects Showcase */}
      <section ref={stickyRef} className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">

          {/* Progress Sidebar */}
          <div className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <div className="bg-black/20 backdrop-blur-md border border-purple-600/20 rounded-2xl p-6 max-w-xs">
              <h3 
                className="text-sm font-bold text-purple-400 mb-4 tracking-wider"
                style={{ fontFamily: "Orbitron, monospace" }}
              >
                PROGRESS
              </h3>
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    ref={el => progressItemsRef.current[index] = el}
                    className="progress-item text-sm transition-all duration-300 cursor-pointer"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-purple-400 font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="progress-text">
                        {project.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Progress Indicator */}
          <div className="lg:hidden mb-6">
            <div className="flex justify-center">
              <div className="bg-black/20 backdrop-blur-md border border-purple-600/20 rounded-full px-4 py-2">
                <span 
                  className="text-sm text-purple-400 tracking-widest"
                  style={{ fontFamily: "Orbitron, monospace" }}
                >
                  {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-purple-900/30 rounded-full mb-8 overflow-hidden">
            <div className="progress-fill h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500 ease-out" style={{ width: '12.5%' }}></div>
          </div>

          {/* Project Content */}
          <div className="project-content grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Project Info */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-4">
                <span 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-400"
                  style={{ fontFamily: "Orbitron, monospace" }}
                >
                  {String(projects[currentProject].id).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
              </div>

              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-wider leading-tight"
                style={{ fontFamily: "Orbitron, monospace" }}
              >
                {projects[currentProject].name}
              </h2>

              <p 
                className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {projects[currentProject].description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {projects[currentProject].technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-900/30 border border-purple-600/30 rounded-full text-xs sm:text-sm font-medium text-purple-300 backdrop-blur-sm"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div ref={el => buttonsRef.current[currentProject] = el} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <button 
                  className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  VIEW PROJECT
                </button>
                <button 
                  className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  SOURCE CODE
                </button>
              </div>
            </div>

            {/* Project Image */}
            <div className="relative group order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-gray-900/50 rounded-2xl overflow-hidden border border-purple-600/20 backdrop-blur-sm">
                <img 
                  src={projects[currentProject].image}
                  alt={projects[currentProject].name}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for progress highlighting */}
      <style jsx>{`
        .progress-active .progress-text {
          font-weight: 700;
          color: #A855F7;
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
        }
        .progress-inactive .progress-text {
          font-weight: 400;
          color: #9CA3AF;
        }
        .progress-item:hover .progress-text {
          color: #C084FC;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .project-content {
            gap: 1.5rem;
          }

          .star {
            animation-duration: 3s !important;
          }
        }

        /* Performance optimizations */
        .star,
        .progress-fill,
        .project-content {
          will-change: transform;
        }

        /* Reduce animations on low-end devices */
        @media (prefers-reduced-motion: reduce) {
          .star {
            animation: none !important;
          }

          .project-content,
          .progress-fill {
            transition-duration: 0.1s !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectShowcase;
