"use client";

import { useLayoutEffect, useState } from "react";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Domains from "./components/Domains";
import Events from "./components/Events";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Loading from "./components/Loading";
import CustomCursor from "./components/CustomCursor";
import AnimatedStarsBackground from "./components/AnimatedStarsBackground";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  // useLayoutEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) return <Loading />;

  return (
    <div className="overflow-hidden relative">
      {/* Common stars background for all sections except Hero */}
      <AnimatedStarsBackground 
        variant="simple" 
        starCount={100}
        zIndex={0}
        className="fixed inset-0"
      />
      
      <CustomCursor/>
      <Navbar />
      <Hero />
      <AboutUs />
      <Domains />
      <Events />
      <Projects />
      <Board />
      <Footer />
    </div>
  );
}