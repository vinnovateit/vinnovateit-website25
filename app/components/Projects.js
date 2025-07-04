"use client"

import { useRef, useEffect, useState, useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"
import SectionHeading from "./SectionHeading"
import AnimatedStarsBackground from "./AnimatedStarsBackground"

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

const ProjectShowcase = () => {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const projectsRef = useRef([])
  const buttonsRef = useRef([])
  const [currentProject, setCurrentProject] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const currentProjectRef = useRef(currentProject)

  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      name: "MESSIT",
      description:
        "Check what's cooking before you commit. MESSIT shows the full mess menu so you know when it's worth the trip — and when to make other 'arrangements'.",
      image: "messit.png",
      viewLink: "https://messit.vinnovateit.com/",
    },
    {
      id: 2,
      name: "STUDYHUB",
      description:
        "Your saviour during exams and assignment panic! Find notes, study material — basically everything you need to survive (and maybe ace) your courses.",
      image: "studyhub2.png",
      viewLink: "https://studyhub.vinnovateit.com/",
      sourceLink: "https://github.com/vinnovateit/StudyHub2",
    },
    {
      id: 3,
      name: "BUNKBUDDIES",
      description:
        "No one likes rooming with a random stranger. Find your perfect hostel roommate *before* counselling — because good company makes hostel life way better!",
      image: "bunkbuddies.png",
      viewLink: "https://bunkbuddies.vinnovateit.com/",
    },
    {
      id: 4,
      name: "SWAPIT",
      description:
        "A hassle-free platform to manage course add and drop after allocation. Connect with peers looking to swap courses and optimize your timetable smoothly.",
      image: "swapit.png",
      viewLink: "https://swapit.vinnovateit.com/",
    },
  ]

  // Update ref when state changes
  useEffect(() => {
    currentProjectRef.current = currentProject
  }, [currentProject])

  // Check mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // REMOVED MANUAL STAR ANIMATION - Using AnimatedStarsBackground component instead

      // Calculate proper scroll distance
      const scrollDistance = window.innerHeight * (projects.length - 0.5)

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
          const progress = self.progress
          const newProjectIndex = Math.min(Math.floor(progress * projects.length), projects.length - 1)

          if (newProjectIndex !== currentProjectRef.current) {
            setCurrentProject(newProjectIndex)

            // Animation for project change
            const duration = isMobile ? 0.2 : 0.3

            gsap.to(".project-content", {
              opacity: 0,
              y: isMobile ? 10 : 20,
              duration,
              onComplete: () => {
                gsap.to(".project-content", {
                  opacity: 1,
                  y: 0,
                  duration: duration + 0.2,
                  ease: "power2.out",
                })
              },
            })

            gsap.to(".progress-fill", {
              width: `${((newProjectIndex + 1) / projects.length) * 100}%`,
              duration: 0.5,
              ease: "power2.out",
            })

            buttonsRef.current.forEach((buttonContainer, index) => {
              if (buttonContainer) {
                const buttons = buttonContainer.querySelectorAll("button")
                const isEven = newProjectIndex % 2 === 0
                buttons.forEach((button) => {
                  if (isEven) {
                    button.className = button.className.replace(/bg-black|text-purple-400|border-purple-400/g, "")
                    button.className +=
                      " bg-purple-600 text-black border-purple-600 hover:bg-purple-500 hover:border-purple-500"
                  } else {
                    button.className = button.className.replace(
                      /bg-purple-600|text-black|border-purple-600|hover:bg-purple-500|hover:border-purple-500/g,
                      "",
                    )
                    button.className +=
                      " bg-black text-purple-400 border-purple-400 hover:bg-gray-900 hover:border-purple-300"
                  }
                })
              }
            })
          }
        },
      })

      // Animate heading on load
      const headingText = new SplitType(".main-heading", { types: "chars" })
      gsap.from(headingText.chars, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.5,
      })

      return () => {
        trigger.kill()
      }
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [projects.length, isMobile])

  return (
    <div
      id="projects"
      ref={containerRef}
      className="min-h-screen text-white overflow-hidden flex justify-center relative z-20"
    >
      {/* Animated Stars Background */}
      <AnimatedStarsBackground />

      {/* Projects Showcase */}
      {/* Projects Showcase */}
      <section
        ref={stickyRef}
        className="relative z-40 min-h-screen w-full max-w-7xl flex flex-col items-center justify-center py-4 sm:py-8 md:py-16 px-4"
      >
        <div className="w-full">
          <div className="mb-4 sm:mb-8 md:mb-12 lg:mb-16 flex justify-center">
            <SectionHeading title="PROJECTS" containerClassName="relative inline-block mt-0 sm:mt-2 md:mt-6 lg:mt-8" />
          </div>

          {/* Project card view */}
          <div>
            {/* Progress Bar */}
            <div className="w-full h-1 bg-purple-900/30 rounded-full mb-3 sm:mb-6 md:mb-8 overflow-hidden">
              <div
                className="progress-fill h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: "25%" }}
              ></div>
            </div>

            {/* Project Content */}
            <div className="project-content flex flex-col-reverse md:grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
              {/* Project Info */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400 font-orbitron">
                    {String(projects[currentProject].id).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider mt-1 sm:mt-2 font-orbitron">
                  {projects[currentProject].name}
                </h2>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed font-jakarta">
                  {projects[currentProject].description}
                </p>

                {/* Conditional Buttons */}
                {(projects[currentProject].viewLink || projects[currentProject].sourceLink) && (
                  <div
                    ref={(el) => (buttonsRef.current[currentProject] = el)}
                    className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4"
                  >
                    {projects[currentProject].viewLink && (
                      <button
                        className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base font-jakarta bg-purple-600 text-black border-purple-600 hover:bg-purple-500 hover:border-purple-500"
                        onClick={() => window.open(projects[currentProject].viewLink, "_blank")}
                      >
                        VIEW PROJECT
                      </button>
                    )}
                    {projects[currentProject].sourceLink && (
                      <button
                        className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base font-jakarta bg-purple-600 text-black border-purple-600 hover:bg-purple-500 hover:border-purple-500"
                        onClick={() => window.open(projects[currentProject].sourceLink, "_blank")}
                      >
                        SOURCE CODE
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Project Image */}
              <div className="relative group w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl md:rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/50 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-purple-600/20 backdrop-blur-sm">
                  <img
                    src={projects[currentProject].image || "/placeholder.svg"}
                    alt={projects[currentProject].name}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Project Counter */}
            <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 lg:mt-12">
              <div className="text-xs sm:text-sm text-purple-400 tracking-widest font-orbitron">
                {String(currentProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectShowcase
