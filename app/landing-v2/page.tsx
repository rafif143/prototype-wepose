import { Metadata } from "next";
import Navbar from "@/shared/layout/Navbar";
import HeroSectionV2 from "@/features/landing-v2/components/HeroSectionV2";
import AboutSectionV2 from "@/features/landing-v2/components/AboutSectionV2";
import TrackVisaSection from "@/shared/landing/components/track-visa-section";
import HowItWorksSectionV2 from "@/features/landing-v2/components/HowItWorksSectionV2";
import PopularVisaSectionV2 from "@/features/landing-v2/components/PopularVisaSectionV2";
import ExtraServicesSectionV2 from "@/features/landing-v2/components/ExtraServicesSectionV2";
import SupportedCountriesSectionV2 from "@/features/landing-v2/components/SupportedCountriesSectionV2";
import TestimonialsSection from "@/shared/landing/components/testimonials-section";
import BlogSection from "@/shared/landing/components/blog-section";
import ContactSection from "@/shared/landing/components/contact-section";
import CtaDualSection from "@/shared/landing/components/cta-dual-section";
import FaqSectionV2 from "@/features/landing-v2/components/FaqSectionV2";
import CtaSection from "@/shared/landing/components/cta-section";
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
      <div id="how-it-works">
        <HowItWorksSectionV2 />
      </div>
      <div id="popular-visa">
        <PopularVisaSectionV2 />
      </div>
      <div id="extra-services">
        <ExtraServicesSectionV2 />
      </div>
      <SupportedCountriesSectionV2 />
      <div id="about">
        <AboutSectionV2 />
      </div>
      <TrackVisaSection />
      <TestimonialsSection />
      <BlogSection />
      <div id="contact">
        <ContactSection />
      </div>
      <CtaDualSection />
      <FaqSectionV2 />
      <CtaSection />
      <Footer />
      <PromoPopup />
    </main>
  );
}