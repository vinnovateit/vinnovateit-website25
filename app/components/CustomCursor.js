import { useEffect, useRef } from "react";
import Image from 'next/image'

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Set up cursor styles
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.position = 'fixed';
    cursor.style.top = '0';
    cursor.style.left = '0';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';

    const updateCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Event listeners
    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <div
        ref={cursorRef}
        className="pointer-events-none"
      >
        {/* Replace this with your desired image */}
        <div className="w-24 h-24 relative">
  <Image 
    src="/cursor_pin 1.svg" 
    alt="cursor" 
    fill 
    className="object-contain" 
  />
</div>
      </div>
    </div>
  );
};

export default CustomCursor;