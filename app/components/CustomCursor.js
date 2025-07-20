import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const coordsRef = useRef({ x: 0, y: 0 });
  const circlesRef = useRef([]);
  const animationRef = useRef();

  const colors = [
    "#c8a8ff", "#d0b3ff", "#d8beff", "#e0c9ff", "#e8d4ff", "#f0dfff",
    "#f8eaff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
    "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff",
    "#ffffff", "#ffffff", "#ffffff", "#ffffff"
  ];

  useEffect(() => {

    // Initialize circle positions
    circlesRef.current.forEach((circle) => {
      if (circle) {
        circle.x = 0;
        circle.y = 0;
      }
    });

    const handleMouseMove = (e) => {
      coordsRef.current.x = e.clientX;
      coordsRef.current.y = e.clientY;
    };

    const animateCircles = () => {
      let x = coordsRef.current.x;
      let y = coordsRef.current.y;

      circlesRef.current.forEach((circle, index) => {
        if (circle) {
          circle.style.left = x - 12 + "px";
          circle.style.top = y - 12 + "px";
          
          const scale = (circlesRef.current.length - index) / circlesRef.current.length;
          const blur = (1 - scale) * 6; // More blur for smaller circles
          circle.style.transform = `scale(${scale})`;
          circle.style.filter = `blur(${blur}px)`;

          circle.x = x;
          circle.y = y;

          const nextCircle = circlesRef.current[index + 1] || circlesRef.current[0];
          if (nextCircle) {
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animateCircles);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {Array.from({ length: 20 }, (_, index) => (
        <div
          key={index}
          ref={(el) => (circlesRef.current[index] = el)}
          className="fixed top-0 left-0 pointer-events-none w-6 h-6 rounded-full"
          style={{
            backgroundColor: colors[index % colors.length],
            boxShadow: index < 3 ? '0 0 15px rgba(200, 168, 255, 0.8), 0 0 30px rgba(200, 168, 255, 0.4)' : 'none',
            zIndex: 99999999,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;