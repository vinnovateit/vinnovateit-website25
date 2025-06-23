'use client'

import Image from 'next/image'
import FooterBottom from './FooterBottom'
import LetsWork from './LetsWork'
import { motion } from 'framer-motion'


export default function Footer() {
  return (
    <div className="relative text-white overflow-hidden pt-20 px-6 min-h-[100vh] flex flex-col">
      {/* Glass Border PNGs - Pushed lower */}
      <Image 
        src="/assets/glass/border-top-left.png" 
        alt="Top Left Glass" 
        width={350} 
        height={500}
        className="absolute top-0 -left-25 md:left-0 pointer-events-none z-10" 
      />
       <Image 
        src="/assets/glass/border-top-right.png" 
        alt="Top Right Glass" 
        width={600} 
        height={600}
        className="absolute top-0 -right-30 md:right-[15rem] pointer-events-none z-10" 
      />
      
      <Image 
        src="/assets/glass/border-middle-left.png" 
        alt="Middle Left Glass" 
        width={700} 
        height={100}
        className="absolute top-[35rem] md:top-[30rem] -left-35 md:left-0 transform -translate-y-1/2 pointer-events-none z-0" 
      />
      
      <Image 
        src="/assets/glass/border-middle-right.png" 
        alt="Middle Right Glass" 
        width={850} 
        height={200}
        className="absolute hidden md:block top-[20rem] right-0 transform -translate-y-1/2 pointer-events-none z-5" 
      />
      
      <Image 
        src="/footer_block.png" 
        alt="Rect Block" 
        width={850} 
        height={400}
        className="absolute top-60 md:top-[20rem] w-full right-0 transform -translate-y-1/2 pointer-events-none z-0" 
      />
     
      <Image 
        src="/assets/glass/border-bottom-center.png" 
        alt="Bottom Center Glass" 
        width={500} 
        height={100}
        className="absolute top-[15rem] md:top-[10rem] -right-[16rem] md:right-0 transform pointer-events-none z-0" 
      /> 
      
{/* Decorative Blobs - Animated on scroll */}
<div className="absolute top-6 left-0 w-full h-96 z-10">
  {[
    {
      src: '/assets/blob1.png',
      alt: 'Blob 1',
      className: 'top-28 left-1/6',
      delay: 0.1,
      direction: 'top',
    },
    {
      src: '/assets/blob2.png',
      alt: 'Blob 2',
      className: 'top-70 left-2/6',
      delay: 0.2,
      direction: 'bottom',
    },
    {
      src: '/assets/blob3.png',
      alt: 'Blob 3',
      className: 'top-28 left-4/6 md:left-7/12 transform -translate-x-1/2',
      delay: 0.3,
      direction: 'top',
    },
    {
      src: '/assets/blob4.png',
      alt: 'Blob 4',
      className: 'top-70 left-4/6',
      delay: 0.4,
      direction: 'bottom',
    },
  ].map(({ src, alt, className, delay, direction }, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: direction === 'top' ? -50 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`absolute h-[100px] w-[100px] md:h-[200px] md:w-[200px] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className="h-full w-full"
      />
    </motion.div>
  ))}
</div>


      {/* Main Content - Pushed lower */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow mt-100">
        <div className="text-center max-w-4xl mx-auto">
          <h2 
            className="text-md sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-15 text-white"
            style={{ 
              fontFamily: "Plus Jakarta Sans, sans-serif",
              textShadow: "0 0 20px rgba(138,43,226,0.7)"
            }}
          >
            &quot;Step into the realm of innovation– where creativity and imagination meet skills to lead to ever–lasting changes.&quot;
          </h2>
        </div>
      </div>

      {/* Footer Bottom Component - Pushed lower with more space */}
      <div className='relative z-20 mt-auto pb-16 pt-24'>
        <FooterBottom/>
      </div>
     {/* <LetsWork/> */}
    </div>
  )
}