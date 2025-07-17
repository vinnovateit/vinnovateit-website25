import { useEffect, useRef } from "react";

const CustomCursor = () => {
  // Update the ref type to be explicit about the elements it contains
  const cursorsRef = useRef([]);
  const cursorPoints = Array(8).fill(null);

  useEffect(() => {
    const cursors = cursorsRef.current;
    const cursorPositions = cursorPoints.map(() => ({ x: 0, y: 0 }));

    // Set up initial cursor styles with purple color and progressive blur
    cursors.forEach((cursor, index) => {
      if (cursor) {
        // Use inline styles for GSAP compatibility
        cursor.style.width = (20 - index * 1.5) + 'px';
        cursor.style.height = (20 - index * 1.5) + 'px';
        
        // Purple gradient with white edge at the end
        if (index === cursors.length - 1) {
          cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
          cursor.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.6)';
        } else {
          cursor.style.backgroundColor = `rgba(147, 51, 234, ${1 - index * 0.12})`;
        }
        
        cursor.style.filter = `blur(${index * 1.5}px)`;
        cursor.style.position = 'fixed';
        cursor.style.top = '0';
        cursor.style.left = '0';
        cursor.style.borderRadius = '50%';
        cursor.style.pointerEvents = 'none';
        cursor.style.mixBlendMode = 'difference';
        cursor.style.zIndex = '50';
      }
    });

    // Animation ticker for smoother cursor trail
    const animationTicker = setInterval(() => {
      // Update positions with minimal delay
      cursorPositions.forEach((pos, index) => {
        if (index === 0) return;
        const prevPos = cursorPositions[index - 1];
        if (!prevPos) return;
        
        // Smooth interpolation for trail effect
        pos.x += (prevPos.x - pos.x) * 0.3;
        pos.y += (prevPos.y - pos.y) * 0.3;
      });

      // Animate each cursor with tighter spacing
      cursors.forEach((cursor, index) => {
        const position = cursorPositions[index];
        if (!cursor || !position) return;
        
        cursor.style.transform = `translate(${position.x - (10 - index * 0.3)}px, ${position.y - (10 - index * 0.3)}px)`;
      });
    }, 8);

    const updateCursor = (e) => {
      const firstPosition = cursorPositions[0];
      if (firstPosition) {
        firstPosition.x = e.clientX;
        firstPosition.y = e.clientY;
      }
    };

    // Interactive effects
    const handleMouseEnter = (e) => {
      const target = e.target;
      
      if (target.tagName === 'A') {
        cursors.forEach((cursor, index) => {
          if (cursor) {
            if (index === 0) {
              cursor.style.width = '20px';
              cursor.style.height = '20px';
              cursor.style.backgroundColor = 'white';
              cursor.style.opacity = '1';
              cursor.style.filter = 'blur(0px)';
            } else {
              cursor.style.opacity = '0';
            }
          }
        });
      } else if (target.tagName === 'IMG') {
        cursors.forEach((cursor, index) => {
          if (cursor) {
            if (index === 0) {
              cursor.style.width = '32px';
              cursor.style.height = '32px';
              cursor.style.backgroundColor = 'transparent';
              cursor.style.border = '2px solid rgb(147, 51, 234)';
              cursor.style.opacity = '1';
              cursor.style.filter = 'blur(0px)';
            } else {
              cursor.style.opacity = '0';
            }
          }
        });
      } else if (target.tagName === 'BUTTON') {
        cursors.forEach((cursor, index) => {
          if (cursor) {
            if (index === 0) {
              cursor.style.width = '32px';
              cursor.style.height = '32px';
              cursor.style.backgroundColor = 'rgba(147, 51, 234, 0.8)';
              cursor.style.opacity = '1';
              cursor.style.filter = 'blur(0px)';
            } else {
              cursor.style.opacity = '0';
            }
          }
        });
      }
    };

    const handleMouseLeave = () => {
      // Reset to original trail state
      cursors.forEach((cursor, index) => {
        if (cursor) {
          cursor.style.width = (20 - index * 1.5) + 'px';
          cursor.style.height = (20 - index * 1.5) + 'px';
          
          // Purple gradient with white edge at the end
          if (index === cursors.length - 1) {
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            cursor.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.6)';
          } else {
            cursor.style.backgroundColor = `rgba(147, 51, 234, ${1 - index * 0.12})`;
            cursor.style.boxShadow = 'none';
          }
          
          cursor.style.border = 'none';
          cursor.style.filter = `blur(${index * 1.5}px)`;
          cursor.style.opacity = '1';
        }
      });
    };

    // Event listeners
    window.addEventListener('mousemove', updateCursor);
    document.querySelectorAll('a, button, img').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      clearInterval(animationTicker);
      window.removeEventListener('mousemove', updateCursor);
      document.querySelectorAll('a, button, img').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="hidden lg:block">
      {cursorPoints.map((_, index) => (
        <div
          key={index}
          ref={el => {
            if (cursorsRef.current) {
              cursorsRef.current[index] = el;
            }
          }}
        />
      ))}
      
      {/* Demo content to test the cursor */}
      
    </div>
  );
};

export default CustomCursor;