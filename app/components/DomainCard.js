import React from 'react';
import Image from 'next/image';

const DomainCard = ({ 
  title, 
  icon,
  className = ""
}) => {
  return (
    <div
      className={`
        w-80 h-40 rounded-2xl flex flex-col items-center justify-center 
        hover:shadow-[0_0_2rem_rgba(147,51,234,0.6)] 
        transition-all duration-300 relative overflow-hidden
        ${className}
      `}
      style={{ 
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 0.5rem 2rem rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <Image 
        src={icon} 
        alt="" 
        width={64} 
        height={64} 
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mb-3 object-contain"
      />
      <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium px-2 text-center text-white relative z-10">
        {title}
      </div>
      {/* Purple gradient at bottom of card */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 md:h-12 lg:h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(147, 51, 234, 0.3) 0%, transparent 100%)'
        }}
      />
    </div>
  );
};

export default DomainCard;