import { Metadata } from "next";
import Navbar from "@/shared/layout/Navbar";
import HeroSectionV2 from "@/features/landing/components/HeroSectionV2";
import AboutSection from "@/features/landing/components/about-section";
import TrackVisaSection from "@/features/landing/components/track-visa-section";
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

export const metadata: Metadata = {
  title: "Wepose Travel V2 - Solusi Visa Terpercaya untuk Jelajahi Dunia",
  description: "Platform visa online dengan dukungan 35+ negara. Urus visa Schengen, Jepang, Korea, Amerika, Australia dengan mudah, cepat, dan aman bersama Wepose Travel.",
  keywords: "visa, travel, indonesia, schengen, jepang, korea, amerika, australia, visa online, wepose",
  openGraph: {
    title: "Wepose Travel V2 - Solusi Visa Terpercaya",
    description: "Urus visa ke 35+ negara dengan mudah dan aman",
    type: "website",
  },
};

export default function LandingV2() {
  return (
    <main className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <div id="home">
        <HeroSectionV2 />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <TrackVisaSection />
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