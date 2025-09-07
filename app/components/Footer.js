"use client"

import Image from "next/image"
import FooterBottom from "./FooterBottom"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const blobRefs = useRef([])
  const glassRefs = useRef([])
  const footerRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Small delay to ensure DOM is ready for mobile
    const timer = setTimeout(() => {
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
            { x: -20, y: 25, rotation: -8, duration: 3.2 },
          ]

          const config = oscillationConfigs[index] || oscillationConfigs[0]

          tl.to(blob, {
            x: config.x,
            y: config.y,
            rotation: config.rotation,
            duration: config.duration,
            ease: "sine.inOut",
          })
        }
      })

      // Glass elements slide in from sides
      const ctx = gsap.context(() => {
        // Top left glass slides in from left
        gsap.fromTo(
          glassRefs.current[0],
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
              toggleActions: "play none none reverse",
            },
          },
        )

        // Top right glass slides in from right
        gsap.fromTo(
          glassRefs.current[1],
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
              toggleActions: "play none none reverse",
            },
          },
        )

        // Bottom left glass slides in from left
        if (glassRefs.current[2]) {
          gsap.fromTo(
            glassRefs.current[2],
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
                toggleActions: "play none none reverse",
              },
            },
          )
        }

        // Bottom right glass slides in from right
        if (glassRefs.current[3]) {
          gsap.fromTo(
            glassRefs.current[3],
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
                toggleActions: "play none none reverse",
              },
            },
          )
        }

        // Force refresh for mobile compatibility
        ScrollTrigger.refresh()
      }, footerRef)

      return () => ctx.revert() // Cleanup
    }, 100)

    return () => clearTimeout(timer)
  }, [isMounted])

  if (!isMounted) {
    return null // Prevent SSR issues
  }

  return (
    <div ref={footerRef} className="relative text-white overflow-hidden pt-20 flex flex-col">
      {/* Glass Border webps - Responsive positioning */}
      {/* Top Left Glass */}
      <div
        ref={(el) => (glassRefs.current[0] = el)}
        className="absolute top-0 left-0 pointer-events-none z-5 
                   w-[35%] max-w-[200px] sm:w-[40%] sm:max-w-[250px] 
                   md:w-[50%] md:max-w-[300px] lg:max-w-[500px]"
      >
        <Image
          src="/footer-topleft.webp"
          alt="Top Left Glass"
          width={591}
          height={943}
          className="w-full h-auto"
          sizes="(max-width: 640px) 35vw, (max-width: 768px) 40vw, (max-width: 1024px) 50vw, 300px"
        />
      </div>

      {/* Top Right Glass */}
      <div
        ref={(el) => (glassRefs.current[1] = el)}
        className="absolute top-0 right-0 pointer-events-none z-10 
                   w-[35%] max-w-[200px] sm:w-[40%] sm:max-w-[250px] 
                   md:w-[50%] md:max-w-[300px] lg:max-w-[500px]"
      >
        <Image
          src="/footer-topright.webp"
          alt="Top Right Glass"
          width={591}
          height={943}
          className="w-full h-auto"
          sizes="(max-width: 640px) 35vw, (max-width: 768px) 40vw, (max-width: 1024px) 50vw, 300px"
        />
      </div>

      {/* Bottom Left Glass - Now visible on mobile with responsive positioning */}
      <div
        ref={(el) => (glassRefs.current[2] = el)}
        className="absolute pointer-events-none z-10 
                   top-[45rem] left-0 w-[35%] max-w-[180px] transform -translate-y-1/2
                   sm:top-[40rem] sm:w-[50%] sm:max-w-[300px]
                   md:top-[45rem] md:w-[55%] md:max-w-[350px]
                   lg:top-[50rem] lg:w-[60%] lg:max-w-[400px] 
                   xl:max-w-[600px]"
      >
        <Image
          src="/footer-bottomleft.webp"
          alt="Bottom Left Glass"
          width={929}
          height={969}
          className="w-full h-auto"
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 50vw, (max-width: 1024px) 55vw, 400px"
        />
      </div>

      {/* Bottom Right Glass - Restore original positioning */}
      <div
        ref={(el) => (glassRefs.current[3] = el)}
        className="absolute pointer-events-none z-5 
           top-[47rem] right-0 w-[35%] max-w-[180px] transform -translate-y-1/2
           xs:top-[52rem]
           sm:top-[35rem] sm:w-[50%] sm:max-w-[300px]
           md:top-[38rem] md:w-[55%] md:max-w-[400px]
           lg:top-[40rem] lg:w-[60%] lg:max-w-[500px]"
      >
        <Image
          src="/footer-bottomright.webp"
          alt="Bottom Right Glass"
          width={969}
          height={929}
          className="w-full h-auto"
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 50vw, (max-width: 1024px) 55vw, 500px"
        />
      </div>

      {/* Footer Block - Adjusted vertical position for smaller screens, stays on right */}
      <div
        className="absolute pointer-events-none z-5
  top-[20rem] right-0  md:top-[25rem] lg:top-[20rem] w-full h-full"
      >
        <Image
          src="/footer_block.webp"
          alt="Rect Block"
          width={850}
          height={400}
          className="w-full h-auto"
          sizes="100vh md:100vw"
        />
      </div>

      {/* Decorative Blobs - With GSAP oscillatory animation */}
      <div className="absolute top-6 left-0 w-full h-96 z-10">
        {[
          {
            src: "/assets/blob1.webp",
            alt: "Blob 1",
            className: "top-28 left-1/6",
            delay: 0.1,
            direction: "top",
          },
          {
            src: "/assets/blob2.webp",
            alt: "Blob 2",
            className: "top-70 left-2/6",
            delay: 0.2,
            direction: "bottom",
          },
          {
            src: "/assets/blob3.webp",
            alt: "Blob 3",
            className: "top-28 left-4/6 md:left-7/12 transform -translate-x-1/2",
            delay: 0.3,
            direction: "top",
          },
          {
            src: "/assets/blob4.webp",
            alt: "Blob 4",
            className: "top-70 left-4/6",
            delay: 0.4,
            direction: "bottom",
          },
        ].map(({ src, alt, className, delay, direction }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: direction === "top" ? -50 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            className={`absolute h-[150px] w-[150px] md:h-[200px] md:w-[200px] ${className}`}
            ref={(el) => (blobRefs.current[index] = el)}
          >
            <Image src={src || "/placeholder.svg"} alt={alt} width={300} height={300} className="h-full w-full" />
          </motion.div>
        ))}
      </div>

      {/* Main Content - Responsive spacing */}
      <div
        className="relative z-20 flex flex-col items-center justify-center flex-grow 
          mt-[32rem] sm:mt-[30rem] md:mt-[35rem] lg:mt-100"
      >
        <div className="text-center max-w-4xl mx-auto px-4">
          <h2
            className="text-md sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-15 text-white font-jakarta"
            style={{
              textShadow: "0 0 20px rgba(138,43,226,0.7)",
            }}
          >
            &quot;Step into the realm of <br />
            innovation– where creativity and <br />
            imagination meet skills to lead to <br /> ever–lasting changes.&quot;
          </h2>
        </div>
      </div>

      {/* Footer Bottom Component - Responsive spacing */}
      <div className="relative z-20 mt-auto">
        <FooterBottom />
      </div>
    </div>
  )
}