import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { LangProvider } from "@/context/LangContext";

const Index = () => {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <MenuSection />
        <About />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </LangProvider>
  );
};

export default Index;
