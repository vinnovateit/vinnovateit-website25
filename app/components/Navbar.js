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
    initAnimations();
  }, []);

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
        { x: "100%", opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            const links = sidebarRef.current?.querySelectorAll(".sidebar-link");
            if (links) {
              gsap.fromTo(
                links,
                { x: 50, opacity: 0 },
                {
                  x: 0,
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
      <nav ref={navRef} className="z-100 fixed top-4 left-1/2 transform -translate-x-1/2 w-full lg:w-2/3 max-w-4xl bg-black/90 backdrop-blur-md shadow-[0_0_30px_rgba(147,51,234,0.3)] rounded-full border border-purple-500/20">
        <div className="relative">
          <div className="px-8 py-2 flex justify-between items-center">
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
              {navigationLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-white/90 hover:text-purple-400 transition-all font-medium text-sm tracking-wider"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  {link.text}
                </Link>
              ))}
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

        {/* Drawer for Mobile */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              ref={sidebarRef}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-4 right-4 w-80 bg-black/95 backdrop-blur-md z-[200] shadow-[0_0_40px_rgba(147,51,234,0.4)] rounded-2xl text-white border border-purple-500/30"
              style={{ height: "calc(100vh - 2rem)" }}
            >
              <div className="flex justify-end items-center p-6 border-b border-gray-800">
                <button onClick={toggleDrawer} className="p-2">
                  <div className="flex flex-col items-center justify-center w-8 h-8 space-y-1">
                    <div className="w-6 h-0.5 bg-white transform rotate-45 translate-y-1" />
                    <div className="w-6 h-0.5 bg-white transform -rotate-45 -translate-y-1" />
                  </div>
                </button>
              </div>

              <div className="px-6 py-8">
                <div className="space-y-3">
                  {navigationLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="sidebar-link block hover:text-purple-400 font-medium py-3 px-4 rounded-lg transition-all tracking-wider"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-6 py-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 text-center mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>Connect with us</p>
                <div className="flex space-x-6 justify-center">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-white ${social.hoverColor} transition-all transform hover:scale-125`}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop for mobile drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[90] rounded-2xl"
              onClick={toggleDrawer}
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default MainNavbar;