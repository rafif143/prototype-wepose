import Navbar from "@/shared/layout/Navbar";
import { HeroSection } from "@/features/landing/components/HeroSection";
import AboutSection from "@/shared/landing/components/about-section";
import TrackVisaSection from "@/shared/landing/components/track-visa-section";
import HowItWorksSection from "@/shared/landing/components/how-it-works-section";
import PopularVisaSection from "@/features/landing/components/popular-visa-section";
import ExtraServicesSection from "@/shared/landing/components/extra-services-section";
import SupportedCountriesSection from "@/shared/landing/components/supported-countries-section";
import TestimonialsSection from "@/shared/landing/components/testimonials-section";
import BlogSection from "@/shared/landing/components/blog-section";
import ContactSection from "@/shared/landing/components/contact-section";
import CtaDualSection from "@/shared/landing/components/cta-dual-section";
import FaqSection from "@/shared/landing/components/faq-section";
import CtaSection from "@/shared/landing/components/cta-section";
import Footer from "@/shared/layout/Footer";
import { PromoPopup } from "@/shared/ui/PromoPopup";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <div id="home">
        <HeroSection />
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
      <div id="about">
        <AboutSection />
      </div>
      <TrackVisaSection />
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
