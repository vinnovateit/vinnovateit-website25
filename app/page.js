"use client";

import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Domains from "./components/Domains";
import Events from "./components/Events";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Loading from "./components/Loading";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Loading />;

  return (
    <div className="overflow-hidden">
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
