import React from 'react';
import Image from 'next/image';

const DomainCard = ({ 
  title, 
  icon, 
  width = "w-[320px]", 
  height = "h-[160px]", 
  iconSize = "w-10 h-10",
  textSize = "text-lg",
  gradientHeight = "h-12",
  className = ""
}) => {
  return (
    <div
      className={`${width} ${height} rounded-2xl flex flex-col items-center justify-center hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-shadow duration-300 relative overflow-hidden ${className}`}
      style={{ 
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <Image 
        src={icon} 
        alt="" 
        width={64} 
        height={64} 
        className={`${iconSize} mb-3 object-contain`}
      />
      <div className={`${textSize} font-medium px-2 text-center text-white relative z-10`}>
        {title}
      </div>
      {/* Purple gradient at bottom of card */}
      <div 
        className={`absolute bottom-0 left-0 right-0 ${gradientHeight} pointer-events-none`}
        style={{
          background: 'linear-gradient(to top, rgba(147, 51, 234, 0.3) 0%, transparent 100%)'
        }}
      />
    </div>
  );
};

export default DomainCard;