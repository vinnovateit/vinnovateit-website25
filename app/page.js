import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Domains from "./components/Domains";
import Events from "./components/Events";
import Board from "./components/Board";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";


export default function Home() {
  return (
<div className="overflow-hidden">
  <Navbar/>
      <Hero/>
     <AboutUs/>
     <Domains/>
     <Events/>
     <Projects/>
     <Board/>
     <Footer/>
</div>
      
  );
}
