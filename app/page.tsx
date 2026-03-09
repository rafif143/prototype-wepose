import Navbar from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import AboutSection from "@/components/section/about-section";
import HowItWorksSection from "@/components/section/how-it-works-section";
import PopularVisaSection from "@/components/section/popular-visa-section";
import ExtraServicesSection from "@/components/section/extra-services-section";
import SupportedCountriesSection from "@/components/section/supported-countries-section";
import TestimonialsSection from "@/components/section/testimonials-section";
import BlogSection from "@/components/section/blog-section";
import ContactSection from "@/components/section/contact-section";
import CtaDualSection from "@/components/section/cta-dual-section";
import FaqSection from "@/components/section/faq-section";
import CtaSection from "@/components/section/cta-section";
import Footer from "@/components/layout/Footer";
import { PromoPopup } from "@/components/ui/PromoPopup";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <PopularVisaSection />
      <ExtraServicesSection />
      <SupportedCountriesSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
      <CtaDualSection />
      <FaqSection />
      <CtaSection />
      <Footer />
      <PromoPopup />
    </main>
  );
}
