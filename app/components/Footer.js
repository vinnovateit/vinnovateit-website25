'use client'

import Image from 'next/image'
import FooterBottom from './FooterBottom'
import LetsWork from './LetsWork'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedStarsBackground from './AnimatedStarsBackground'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const blobRefs = useRef([])
  const glassRefs = useRef([])
  const footerRef = useRef(null)

  useEffect(() => {
    // Oscillatory animation for blobs
    blobRefs.current.forEach((blob, index) => {
      if (blob) {
        // Create a timeline for each blob with different parameters
        const tl = gsap.timeline({ repeat: -1, yoyo: true })
        
        // Different oscillation patterns for each blob
        const oscillationConfigs = [
          { x: 20, y: 15, rotation: 10, duration: 2.5 },
          { x: -25, y: 20, rotation: -15, duration: 3 },
          { x: 15, y: -18, rotation: 12, duration: 2.8 },
          { x: -20, y: 25, rotation: -8, duration: 3.2 }
        ]
        
        const config = oscillationConfigs[index] || oscillationConfigs[0]
        
        tl.to(blob, {
          x: config.x,
          y: config.y,
          rotation: config.rotation,
          duration: config.duration,
          ease: "sine.inOut"
        })
      }
    })

    // Glass elements slide in from sides
    const ctx = gsap.context(() => {
      // Top left glass slides in from left
      gsap.fromTo(glassRefs.current[0], 
        { x: -300, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Top right glass slides in from right
      gsap.fromTo(glassRefs.current[1], 
        { x: 300, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 1.2,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Bottom left glass slides in from left
      if (glassRefs.current[2]) {
        gsap.fromTo(glassRefs.current[2], 
          { x: -400, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 1.4,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 60%",
              end: "top 10%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Bottom right glass slides in from right
      if (glassRefs.current[3]) {
        gsap.fromTo(glassRefs.current[3], 
          { x: 400, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 1.4,
            ease: "power2.out",
            delay: 0.6,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 60%",
              end: "top 10%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, footerRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <div ref={footerRef} className="relative text-white overflow-hidden pt-20 flex flex-col">
      <AnimatedStarsBackground
        variant="simple" 
        starCount={80}
        zIndex={1}
      />
      {/* Glass Border PNGs - Animated from sides */}
      <div 
        ref={el => glassRefs.current[0] = el}
        className="absolute top-0 left-0 pointer-events-none z-5 w-[50%] max-w-[300px] md:max-w-[500px]"
      >
        <Image 
          src="/footer-topleft.png" 
          alt="Top Left Glass" 
          width={591} 
          height={943}
          className="w-full h-auto"
          sizes="(max-width: 768px) 50vw, 300px"
        />
      </div>

      <div 
        ref={el => glassRefs.current[1] = el}
        className="absolute top-0 right-0 pointer-events-none z-10 w-[50%] max-w-[300px] md:max-w-[500px]"
      >
        <Image 
          src="/footer-topright.png" 
          alt="Top Right Glass" 
          width={591} 
          height={943}
          className="w-full h-auto"
          sizes="(max-width: 768px) 50vw, 300px"
        />
      </div>

      <div 
        ref={el => glassRefs.current[2] = el}
        className="hidden lg:block absolute top-[50rem] md:left-0 pointer-events-none z-10 w-[60%] max-w-[400px] md:max-w-[600px] transform -translate-y-1/2"
      >
        <Image 
          src="/footer-bottomleft.png" 
          alt="Bottom Left Glass" 
          width={929} 
          height={969}
          className="w-full h-auto"
          sizes="(max-width: 768px) 60vw, 400px"
        />
      </div>

      <div 
        ref={el => glassRefs.current[3] = el}
        className="absolute hidden lg:block top-[40rem] right-0 pointer-events-none z-5 w-[60%] max-w-[500px] transform -translate-y-1/2"
      >
        <Image 
          src="/footer-bottomright.png" 
          alt="Bottom Right Glass" 
          width={969} 
          height={929}
          className="w-full h-auto"
          sizes="500px"
        />
      </div>

      <div className="absolute top-70 md:top-[20rem] right-0 pointer-events-none z-0 w-full max-w-[850px]">
        <Image 
          src="/footer_block.png" 
          alt="Rect Block" 
          width={850} 
          height={400}
          className="w-full h-auto"
          sizes="100vw"
        />
      </div>
      
      {/* Decorative Blobs - With GSAP oscillatory animation */}
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
            className={`absolute h-[150px] w-[150px] md:h-[200px] md:w-[200px] ${className}`}
            ref={el => blobRefs.current[index] = el}
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
            &quot;Step into the realm of <br/>innovation–  where creativity and <br/>imagination meet skills to lead to <br/> ever–lasting changes.&quot;
          </h2>
        </div>
      </div>

      {/* Footer Bottom Component - Pushed lower with more space */}
      <div className='relative z-20 mt-auto'>
        <FooterBottom/>
      </div>
    </div>
  )
}