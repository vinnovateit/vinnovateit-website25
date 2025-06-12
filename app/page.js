import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Domains from "./components/Domains";
import Events from "./components/Events";
import Projects from "./components/Projects";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Stars from "./components/Stars";
import Navbar from "./components/Navbar";

export default function Home() {
  return (

    <Stars>
      <Navbar/>
      <Hero/>
     <AboutUs/>
     <Domains/>
     <Events/>
     <Projects/>
     <Board/>
     <Footer/>
    </Stars>
  );
}
