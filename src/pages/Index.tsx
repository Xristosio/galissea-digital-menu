import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import QrShareSection from "@/components/QrShareSection";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
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
        <Location />
        <QrShareSection />
        <Contact />
        <Footer />
        <BackToTopButton />
      </div>
    </LangProvider>
  );
};

export default Index;
