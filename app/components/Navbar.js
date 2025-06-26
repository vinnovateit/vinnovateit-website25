"use client";

import React, { useState, useEffect, useRef } from "react";
import { Facebook, Instagram, Mail, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

const MainNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);
  const sidebarRef = useRef(null);
  const socialIconsRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('#aboutus, #domains, #events, #projects, #board');
    
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = '';
        let maxRatio = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            visibleSection = entry.target.id;
          }
        });
        
        if (visibleSection) {
          setActiveSection(visibleSection);
        } else if (window.scrollY < 200) {
          // Clear active section when at the top (hacky ik)
          setActiveSection('');
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-100px 0px -100px 0px' // cuz navbar
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    initAnimations();
  }, []);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const initAnimations = () => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }

    if (socialIconsRef.current) {
      const socialIcons = socialIconsRef.current.children;
      gsap.fromTo(
        socialIcons,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
    if (!isDrawerOpen && sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { y: "-100vh", opacity: 0 },
        {
          y: "0vh",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            const links = sidebarRef.current?.querySelectorAll(".sidebar-link");
            if (links) {
              gsap.fromTo(
                links,
                { y: 50, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                  stagger: 0.1,
                  ease: "power2.out",
                }
              );
            }
          },
        }
      );
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetSection = document.querySelector(href);
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  };

  const socialLinks = [
    {
      icon: <Facebook size={20} />,
      href: "https://github.com/AyushK0808",
      hoverColor: "hover:text-purple-400",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/_ayush.0808",
      hoverColor: "hover:text-fuchsia-500",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/ayush-kumar-061a58251/",
      hoverColor: "hover:text-purple-400",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:theofficialayush.kumar@gmail.com",
      hoverColor: "hover:text-fuchsia-500",
    },
  ];

  const navigationLinks = [
    { href: "#aboutus", text: "About Us" },
    { href: "#domains", text: "Domains" },
    { href: "#events", text: "Events" },
    { href: "#projects", text: "Projects" },
    { href: "#board", text: "Board Members" }
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
      `}</style>
      
      {/* Main Navbar */}
      <nav ref={navRef} className="z-[100] fixed top-4 left-1/2 transform -translate-x-1/2 w-full lg:w-2/3 max-w-4xl rounded-full px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-full border border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.3)]">
          {/* Glassmorphism backdrop */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/20 rounded-full" />
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <mask id="navbarMask">
                <rect
                  width="100%"
                  height="100%"
                  fill="white"
                  rx="50"
                  ry="50"
                />
              </mask>
            </defs>
          </svg>
          <div className="relative px-8 py-2 flex justify-between items-center bg-gradient-to-r from-purple-900/10 via-black/30 to-purple-900/10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Image
                src="/whiteLogoViit.svg"
                alt="VIIT Logo"
                width={isMobile ? 60 : 100}
                height={isMobile ? 60 : 100}
                priority
              />
            </motion.div>

            <div className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link, index) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`transition-all font-medium text-sm tracking-wider cursor-pointer font-orbitron ${
                      isActive 
                        ? 'text-purple-400 scale-105' 
                        : 'text-white/90 hover:text-purple-400'
                    }`}
                  >
                    {link.text}
                  </a>
                );
              })}
              {/* <div ref={socialIconsRef} className="flex items-center space-x-4 ml-6">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white/80 ${social.hoverColor} transition-all transform hover:scale-110`}
                  >
                    <div className="text-lg">
                      {social.icon}
                    </div>
                  </Link>
                ))}
              </div> */}
            </div>

            {/* Mobile and tablet hamburger menu */}
            <div className="lg:hidden">
              <button 
                onClick={toggleDrawer} 
                className="p-1 flex flex-col items-center justify-center w-6 h-6 space-y-0.5"
                aria-label="Toggle Menu"
              >
                <motion.div 
                  className="w-4 h-0.5 bg-white/90 origin-center"
                  animate={isDrawerOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="w-4 h-0.5 bg-white/90"
                  animate={isDrawerOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="w-4 h-0.5 bg-white/90 origin-center"
                  animate={isDrawerOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-[500]"
              onClick={toggleDrawer}
            />
            
            {/* Full Page Drawer */}
            <motion.div
              ref={sidebarRef}
              initial={{ y: "-100vh" }}
              animate={{ y: "0vh" }}
              exit={{ y: "-100vh" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-full text-white z-[600] overflow-hidden"
            >
              <div className="absolute inset-0 backdrop-blur-md bg-black/80" />
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-black/80 to-purple-900/50" />
              
              <div className="relative h-full flex flex-col">
                <div className="flex justify-between items-center p-4 sm:p-6 pt-8 sm:pt-12">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center"
                  >
                    <Image
                      src="/whiteLogoViit.svg"
                      alt="VIIT Logo"
                      width={80}
                      height={80}
                      priority
                      className="sm:w-24 sm:h-24"
                    />
                  </motion.div>
                  
                  <motion.button 
                    onClick={toggleDrawer} 
                    className="p-2 sm:p-3 hover:bg-purple-900/30 rounded-full transition-colors backdrop-blur-sm bg-white/10 border border-white/20"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-white sm:w-6 sm:h-6"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation Links - Centered */}
                <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6">
                  <div className="space-y-6 sm:space-y-8 md:space-y-10 text-center">
                    {navigationLinks.map((link, index) => {
                      const sectionId = link.href.replace('#', '');
                      const isActive = activeSection === sectionId;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        >
                          <a
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`sidebar-link block font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-xl transition-all tracking-wider hover:bg-purple-900/20 hover:scale-105 cursor-pointer font-orbitron ${
                              isActive 
                                ? 'text-purple-400 bg-purple-900/30 scale-105' 
                                : 'hover:text-purple-400'
                            }`}
                          >
                            {link.text}
                          </a>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <motion.div 
                  className="px-4 sm:px-6 py-8 sm:py-10 md:py-12 border-t border-purple-500/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 text-center mb-4 sm:mb-6 md:mb-8 font-orbitron">Connect with us</p>
                  <div className="flex space-x-6 sm:space-x-8 md:space-x-10 justify-center">
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                      >
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-white ${social.hoverColor} transition-all transform hover:scale-125 p-3 sm:p-4 rounded-full hover:bg-purple-900/30 block`}
                        >
                          <div className="text-lg sm:text-xl">
                            {social.icon}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainNavbar;