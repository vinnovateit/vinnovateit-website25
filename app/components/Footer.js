'use client'

import Image from 'next/image'
import FooterBottom from './FooterBottom'
import LetsWork from './LetsWork'

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
      
      {/* Decorative Blobs - Positioned higher to create space below */}
      <div className="absolute top-0 left-0 w-full h-96 z-10">
        <Image 
          src="/assets/blob1.png" 
          alt="Blob 1" 
          width={300} 
          height={300} 
          className="absolute h-[150px] w-[150px] md:h-[300px] md:w-[300px] top-20 left-1/6" 
        />
        <Image 
          src="/assets/blob2.png" 
          alt="Blob 2" 
          width={200} 
          height={200} 
          className="absolute h-[100px] w-[100px] md:h-[200px] md:w-[200px] top-70 left-2/6" 
        />
        <Image 
          src="/assets/blob3.png" 
          alt="Blob 3" 
          width={300} 
          height={300} 
          className="absolute h-[150px] w-[150px] md:h-[300px] md:w-[300px] top-20 left-4/6 md:left-7/12 transform -translate-x-1/2" 
        />
        <Image 
          src="/assets/blob4.png" 
          alt="Blob 4" 
          width={200} 
          height={200} 
          className="absolute top-70 left-4/6 h-[100px] w-[100px] md:h-[200px] md:w-[200px]" 
        />
      </div>

      {/* Main Content - Pushed lower */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow mt-95">
        <div className="text-center max-w-4xl mx-auto">
          <h2 
            className="text-md sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-15 text-white"
            style={{ 
              fontFamily: "Plus Jakarta Sans, sans-serif",
              textShadow: "0 0 10px rgba(255,255,255,0.7)"
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
     <LetsWork/>
    </div>
  )
}