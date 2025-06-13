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
    
    const cardWidth = screenSize === 'mobile' ? 360 : screenSize === 'tablet' ? 320 : 340;
    const totalWidth = cardWidth * totalCards;
    const containerWidth = container.offsetWidth;
    
    // Calculate initial offset to center the first card for desktop/tablet
    let initialOffset = 0;
    if (screenSize !== 'mobile') {
      initialOffset = containerWidth / 2 - cardWidth / 2;
    }
    
    // Calculate scroll distance to ensure last cards can reach center
    let scrollDistance;
    if (screenSize === 'mobile') {
      scrollDistance = totalWidth - containerWidth;
    } else {
      // For desktop/tablet: we need to scroll from first card centered to last card centered
      // This means we need to move the entire width minus the space needed to center the last card
      scrollDistance = totalWidth - cardWidth + initialOffset;
    }

    // Set initial position of carousel
    gsap.set(carousel, {
      x: initialOffset
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1.5,
        start: "center center",
        end: () => `+=${scrollDistance * 1.8}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        refreshPriority: 1,
        onUpdate: (self) => {
          const containerCenter = containerWidth / 2;
          
          cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
            
            const distanceFromCenter = Math.abs(cardCenter - containerCenter) / containerCenter;
            const clampedDistance = Math.min(distanceFromCenter, 1);
            
            const minScale = 0.6;
            const maxScale = 1.3;
            const scale = maxScale - (clampedDistance * (maxScale - minScale));
            
            const minOpacity = 0.4;
            const maxOpacity = 1;
            const opacity = maxOpacity - (clampedDistance * (maxOpacity - minOpacity));
            
            const maxBlur = 3;
            const blur = clampedDistance * maxBlur;
            
            const maxYOffset = screenSize === 'mobile' ? 30 : screenSize === 'tablet' ? 40 : 50;
            const yOffset = Math.sin(clampedDistance * Math.PI / 2) * maxYOffset;
            
            gsap.set(card, {
              scale: scale,
              opacity: opacity,
              filter: `blur(${blur}px)`,
              y: yOffset,
              zIndex: Math.round((1 - clampedDistance) * 100),
              transformOrigin: "center center",
            });
          });
        }
      }
    });

    tl.to(carousel, {
      x: initialOffset - scrollDistance,
      ease: "none",
      duration: 1
    });

    // Initial setup for card effects
    const containerCenter = containerWidth / 2;
    cards.forEach((card, index) => {
      // Wait for next frame to ensure proper positioning after gsap.set
      requestAnimationFrame(() => {
        const cardRect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
        const distanceFromCenter = Math.abs(cardCenter - containerCenter) / containerCenter;
        const clampedDistance = Math.min(distanceFromCenter, 1);
        
        const minScale = 0.6;
        const maxScale = 1.3;
        const scale = maxScale - (clampedDistance * (maxScale - minScale));
        const opacity = 1 - (clampedDistance * 0.6);
        const blur = clampedDistance * 3;
        const maxYOffset = screenSize === 'mobile' ? 30 : screenSize === 'tablet' ? 40 : 50;
        const yOffset = Math.sin(clampedDistance * Math.PI / 2) * maxYOffset;
        
        gsap.set(card, {
          scale: scale,
          opacity: opacity,
          filter: `blur(${blur}px)`,
          y: yOffset,
          zIndex: Math.round((1 - clampedDistance) * 100),
          transformOrigin: "center center",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [screenSize, boardMembers.length]);
};