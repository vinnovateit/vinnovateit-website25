import { useLayoutEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useCarouselAnimation = (containerRef, carouselRef, screenSize, boardMembers) => {
  const getVisibleCount = () => {
    switch (screenSize) {
      case 'mobile': return 1;
      case 'tablet': return 3;
      default: return 5;
    }
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    const carousel = carouselRef.current;
    if (!container || !carousel) return;

    const cards = gsap.utils.toArray(carousel.children);
    const totalCards = cards.length;
    
    const cardWidth = screenSize === 'mobile' ? 360 : screenSize === 'tablet' ? 360 : 400;
    const cardGap = screenSize === 'mobile' ? 20 : screenSize === 'tablet' ? 40 : 80; // Increased gap for desktop
    const totalWidth = (cardWidth * totalCards) + (cardGap * (totalCards - 1));
    const containerWidth = container.offsetWidth;
    
    // Calculate initial offset to center the first card
    let initialOffset = 0;
    if (screenSize !== 'mobile') {
      initialOffset = containerWidth / 2 - cardWidth / 2;
    } else {
      // For mobile, center the first card
      initialOffset = containerWidth / 2 - cardWidth / 2;
    }
    
    // Calculate scroll distance - improved with proper gap consideration
    let scrollDistance;
    if (screenSize === 'mobile') {
      // Ensure we can scroll to show the last card centered
      scrollDistance = totalWidth - containerWidth + initialOffset;
      // Add extra padding to ensure last card is fully visible and centered
      scrollDistance += cardWidth / 2;
    } else {
      // For desktop/tablet: account for gaps when calculating scroll distance
      const effectiveCardWidth = cardWidth + cardGap;
      scrollDistance = totalWidth - containerWidth + initialOffset;
      // Ensure last card can be properly centered with gap consideration
      scrollDistance += cardWidth / 2;
      
    }

    // Set initial position of carousel
    gsap.set(carousel, {
      x: initialOffset
    });

    // Smoother animation with better easing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.8, // Reduced from 1.5 for smoother feel
        start: "center center",
        end: () => `+=${scrollDistance * 2}`, // Increased multiplier for more control
        invalidateOnRefresh: true,
        anticipatePin: 1,
        preventOverlaps: true,
        onUpdate: (self) => {
          const containerCenter = containerWidth / 2;
          
          cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
            
            // Adjust distance calculation to account for larger gaps in desktop
            const distanceFromCenter = Math.abs(cardCenter - containerCenter) / containerCenter;
            const clampedDistance = Math.min(distanceFromCenter, 1);
            
            // More pronounced effects for desktop due to increased spacing
            const minScale = screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.65 : 0.6;
            const maxScale = screenSize === 'mobile' ? 1.1 : screenSize === 'tablet' ? 1.25 : 1.4;
            const scaleCurve = 1 - Math.pow(clampedDistance, 1.4); // Slightly adjusted curve
            const scale = minScale + (scaleCurve * (maxScale - minScale));
            
            // Enhanced opacity transition for better depth perception with spacing
            const minOpacity = screenSize === 'mobile' ? 0.6 : screenSize === 'tablet' ? 0.45 : 0.3;
            const maxOpacity = 1;
            const opacityCurve = 1 - Math.pow(clampedDistance, 0.75);
            const opacity = minOpacity + (opacityCurve * (maxOpacity - minOpacity));
            
            // Adjusted blur for desktop spacing
            const maxBlur = screenSize === 'mobile' ? 1.5 : screenSize === 'tablet' ? 2.5 : 4;
            const blur = Math.pow(clampedDistance, 2) * maxBlur;
            
            // Enhanced Y offset for desktop to complement spacing
            const maxYOffset = screenSize === 'mobile' ? 20 : screenSize === 'tablet' ? 35 : 55;
            const yOffset = Math.sin(clampedDistance * Math.PI / 2) * maxYOffset;
            
            // Enhanced rotation for desktop view with spacing
            const maxRotation = screenSize === 'mobile' ? 0 : screenSize === 'tablet' ? 12 : 18;
            
            gsap.set(card, {
              scale: scale,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              y: yOffset,
              zIndex: Math.round((1 - clampedDistance) * 100),
              transformOrigin: "center center",
              rotationY: clampedDistance * maxRotation,
            });
          });
        }
      }
    });

    // Smoother timeline animation with better easing
    tl.to(carousel, {
      x: initialOffset - scrollDistance,
      ease: "none",
      duration: 1
    });

    // Enhanced initial setup for card effects
    const setupInitialCardEffects = () => {
      const containerCenter = containerWidth / 2;
      
      cards.forEach((card, index) => {
        // Use multiple frames for more reliable positioning
        const setupCard = () => {
          const cardRect = card.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
          const distanceFromCenter = Math.abs(cardCenter - containerCenter) / containerCenter;
          const clampedDistance = Math.min(distanceFromCenter, 1);
          
          const minScale = screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.65 : 0.6;
          const maxScale = screenSize === 'mobile' ? 1.1 : screenSize === 'tablet' ? 1.25 : 1.4;
          const scaleCurve = 1 - Math.pow(clampedDistance, 1.4);
          const scale = minScale + (scaleCurve * (maxScale - minScale));
          
          const minOpacity = screenSize === 'mobile' ? 0.6 : screenSize === 'tablet' ? 0.45 : 0.3;
          const opacity = minOpacity + ((1 - Math.pow(clampedDistance, 0.75)) * (1 - minOpacity));
          
          const blur = Math.pow(clampedDistance, 2) * (screenSize === 'mobile' ? 1.5 : screenSize === 'tablet' ? 2.5 : 4);
          const maxYOffset = screenSize === 'mobile' ? 20 : screenSize === 'tablet' ? 35 : 55;
          const yOffset = Math.sin(clampedDistance * Math.PI / 2) * maxYOffset;
          
          const maxRotation = screenSize === 'mobile' ? 0 : screenSize === 'tablet' ? 12 : 18;
        };
        
        // Setup with multiple animation frames for reliability
        requestAnimationFrame(() => {
          requestAnimationFrame(setupCard);
        });
      });
    };

    // Delay initial setup to ensure proper positioning
    setTimeout(setupInitialCardEffects, 100);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [screenSize, boardMembers.length]);
};