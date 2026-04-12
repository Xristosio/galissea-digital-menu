import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import QrShareSection from "@/components/QrShareSection";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import { LangProvider, useLang } from "@/context/LangContext";
import type { Lang } from "@/i18n/types";

const IndexContent = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">
        {t("Μετάβαση στο περιεχόμενο", "Skip to content")}
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <MenuSection />
        <About />
        <Gallery />
        <Location />
        <Reviews />
        <QrShareSection />
        <Contact />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

const Index = ({ initialLang }: { initialLang: Lang }) => {
  return (
    <LangProvider initialLang={initialLang}>
      <IndexContent />
    </LangProvider>
  );
};

export default Index;
