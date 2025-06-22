import React from 'react';
import Image from 'next/image';

const DomainCard = ({ 
  title, 
  icon,
}) => {
  return (
    <div
      className="w-80 h-40 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden
                 border bg-gradient-to-b from-[#8a2be21D] to-[#4c187c4D]"
      style={{ 
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
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 mb-3 object-contain z-10"
      />
      <div className="text-sm sm:text-base md:text-lg lg:text-xl font-medium px-2 text-center text-white z-10">
        {title}
      </div>
    </div>
  );
};

export default DomainCard;
