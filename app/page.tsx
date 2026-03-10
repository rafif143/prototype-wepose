import Navbar from "@/shared/layout/Navbar";
import { HeroSection } from "@/features/landing/components/HeroSection";
import AboutSection from "@/features/landing/components/about-section";
import HowItWorksSection from "@/features/landing/components/how-it-works-section";
import PopularVisaSection from "@/features/landing/components/popular-visa-section";
import ExtraServicesSection from "@/features/landing/components/extra-services-section";
import SupportedCountriesSection from "@/features/landing/components/supported-countries-section";
import TestimonialsSection from "@/features/landing/components/testimonials-section";
import BlogSection from "@/features/landing/components/blog-section";
import ContactSection from "@/features/landing/components/contact-section";
import CtaDualSection from "@/features/landing/components/cta-dual-section";
import FaqSection from "@/features/landing/components/faq-section";
import CtaSection from "@/features/landing/components/cta-section";
import Footer from "@/shared/layout/Footer";
import { PromoPopup } from "@/shared/ui/PromoPopup";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <div id="popular-visa">
        <PopularVisaSection />
      </div>
      <div id="extra-services">
        <ExtraServicesSection />
      </div>
      <SupportedCountriesSection />
      <TestimonialsSection />
      <BlogSection />
      <div id="contact">
        <ContactSection />
      </div>
      <CtaDualSection />
      <FaqSection />
      <CtaSection />
      <Footer />
      <PromoPopup />
    </main>
  );
}
