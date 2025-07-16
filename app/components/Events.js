"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { AnimatedTestimonials } from "./animated-testimonials"
import SectionHeading from "./SectionHeading"
import AnimatedStarsBackground from "./AnimatedStarsBackground"
import { gsap } from "gsap"

const events = [
  {
    name: "VINHACK",
    description:
      "Our flagship hackathon challenges participants to develop creative, user-friendly solutions to real-world social issues...with top teams winning exciting rewards.",
    image: "/events1.png",
  },
  {
    name: "VINCODE",
    description:
      "The competition which not only tests your logical thinking but also your speed to find the least time consuming program for the problem statement. With the leaderboard constantly changing places, to keep the pressure high.",
    image: "/events2.png",
  },
  {
    name: "VINPREP",
    description:
      "This 3-day event focuses on delivering a full fledged campus placement mock to the participants, right from the coding and aptitude round to the HR interview.",
    image: "/vinprep.png",
  },
  {
    name: "CODE ALONG",
    description:
      "Inspiring talks by industry leaders and experts sharing insights on the latest trends in technology and innovation.",
    image: "/codealong.png",
  },
]

export default function Events() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const flowerY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const flowerRotation = useTransform(scrollYProgress, [0, 1], [0, 20])

  const headingInView = useInView(containerRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  })

  const testimonialsInView = useInView(containerRef, {
    once: true,
    margin: "-30% 0px -30% 0px",
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      id="events"
      className="relative flex flex-col items-center justify-center min-h-screen px-4 md:px-12 py-16 md:py-20 overflow-hidden"
    >
      {/* Flower Parallax Image */}
      <motion.div
        style={{ y: flowerY, rotate: flowerRotation }}
        className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 md:-top-30 md:-right-16 w-24 sm:w-40 md:w-60 lg:w-72 xl:w-80 h-auto pointer-events-none select-none z-10"
      >
        <Image
          src="/events_flower.png"
          alt="Flower"
          width={550}
          height={550}
          className="w-full h-auto object-contain"
          priority={false}
          loading="lazy"
        />
      </motion.div>

      {/* Star Background */}
      <AnimatedStarsBackground variant="simple" starCount={80} zIndex={1} />

      {/* Glow Background */}
      

      {/* Content Section */}
      <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 max-w-screen-xl lg:max-w-none w-full text-center z-10 px-4 pb-20 sm:pb-24 md:pb-32">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: headingInView ? 1 : 0,
            y: headingInView ? 0 : 50,
          }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <SectionHeading title="EVENTS" className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" />
        </motion.div>

        {/* Testimonials Section - Increased width on desktop */}
        <motion.div
          className="mt-10 mb-24 w-full max-w-none lg:max-w-[140rem] xl:max-w-[160rem] 2xl:max-w-[180rem] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: testimonialsInView ? 1 : 0,
            y: testimonialsInView ? 0 : 30,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <AnimatedTestimonials events={events} />
        </motion.div>
      </div>
    </div>
  )
}