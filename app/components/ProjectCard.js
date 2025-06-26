"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

const CardGrid = () => {
  const [selectedCards, setSelectedCards] = useState(new Set());
  const overlayRefs = useRef({});

  const projects = [
    {
      id: 1,
      name: "AI Assistant Platform",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
      description: "A comprehensive AI-powered assistant platform that helps users with various tasks including writing, coding, and analysis. Built with modern React architecture and integrated with multiple AI models for enhanced functionality."
    },
    {
      id: 2,
      name: "E-Commerce Dashboard",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center",
      description: "A powerful e-commerce dashboard providing real-time analytics, inventory management, and customer insights. Features include interactive charts, automated reporting, and seamless integration with payment gateways."
    },
    {
      id: 3,
      name: "Mobile Fitness App",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      description: "A comprehensive fitness tracking application with personalized workout plans, nutrition tracking, and social features. Includes AI-powered form correction and progress analytics."
    },
    {
      id: 4,
      name: "Data Visualization Tool",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
      description: "An advanced data visualization platform that transforms complex datasets into interactive, beautiful charts and graphs. Supports multiple data sources and real-time updates."
    },
    {
      id: 5,
      name: "Social Media Scheduler",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
      description: "A smart social media management tool that allows scheduling posts across multiple platforms, analyzing engagement metrics, and optimizing content strategy with AI insights."
    },
    {
      id: 6,
      name: "Cloud Storage Solution",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop&crop=center",
      description: "A secure, scalable cloud storage platform with advanced file sharing capabilities, real-time collaboration features, and enterprise-grade security protocols."
    }
  ];

  useEffect(() => {
    // Initialize all overlays to be hidden at the top
    projects.forEach(project => {
      if (overlayRefs.current[project.id]) {
        gsap.set(overlayRefs.current[project.id], { 
          y: '-100%',
          opacity: 0
        });
      }
    });
  }, []);

  const toggleCard = (projectId) => {
    const overlay = overlayRefs.current[projectId];
    if (!overlay) return;

    const newSelectedCards = new Set(selectedCards);
    
    if (selectedCards.has(projectId)) {
      // Close the card
      gsap.to(overlay, {
        duration: 0.5,
        y: '-100%',
        opacity: 0,
        ease: "power2.in",
        onComplete: () => {
          newSelectedCards.delete(projectId);
          setSelectedCards(newSelectedCards);
        }
      });
    } else {
      // Open the card
      newSelectedCards.add(projectId);
      setSelectedCards(newSelectedCards);
      
      gsap.to(overlay, {
        duration: 0.6,
        y: '0%',
        opacity: 1,
        ease: "power2.out"
      });
    }
  };

  return (
    <>
      <div className="min-h-screen p-8 font-jakarta">
        <div className="max-w-7xl mx-auto">
          
          
          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  height: '320px'
                }}
                onClick={() => toggleCard(project.id)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      Click for more info
                    </div>
                  </div>

                  {/* Description Overlay */}
                  <div
                    ref={el => overlayRefs.current[project.id] = el}
                    className="absolute inset-0 text-white p-6 flex flex-col justify-between"
                    style={{ 
                      transform: 'translateY(-100%)', 
                      opacity: 0,
                      background: 'rgba(128, 90, 213, 0.15)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(128, 90, 213, 0.2)'
                    }}
                  >
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCard(project.id);
                        }}
                        className="absolute top-4 right-4 rounded-full p-2 transition-all duration-200 hover:scale-110"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                      
                      <h3 className="text-xl font-bold mb-4 pr-12 text-purple-300 font-orbitron">
                        {project.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-purple-100 font-jakarta">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 text-purple-300 hover:text-white font-jakarta"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        View Project
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 text-purple-300 hover:text-white font-jakarta"
                        style={{
                          background: 'rgba(128, 90, 213, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(128, 90, 213, 0.3)'
                        }}
                        }}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-purple-300 group-hover:text-purple-200 transition-colors duration-300 font-orbitron">
                    {project.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardGrid;