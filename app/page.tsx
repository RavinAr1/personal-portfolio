import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import About from "./components/About";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About/>
      <Projects />
      <Contact />

    </>
  );
}
