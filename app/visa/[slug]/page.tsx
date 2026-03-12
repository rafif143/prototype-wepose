"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/shared/layout/Navbar";
import Footer from "@/shared/layout/Footer";
import { HeroHeader } from "@/features/visa/components/HeroHeader";
import { StickyTabBar } from "@/features/visa/components/StickyTabBar";
import { OverviewTab } from "@/features/visa/components/OverviewTab";
import { RequirementsTab } from "@/features/visa/components/RequirementsTab";
import { PricingTab } from "@/features/visa/components/PricingTab";
import { FaqTab } from "@/features/visa/components/FaqTab";
import { TravelInfoTab } from "@/features/visa/components/TravelInfoTab";
import { AddonsTab } from "@/features/visa/components/AddonsTab";
import { visaDatabase } from "@/features/visa/lib/data";

type TabType = 'overview' | 'requirements' | 'pricing' | 'faq' | 'travel-info' | 'addons';

export default function VisaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const visaData = visaDatabase[slug];

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'requirements', 'pricing', 'faq', 'travel-info', 'addons'];
      const scrollPosition = window.scrollY + 200; // offset for sticky elements

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section as TabType);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle 404 if visa not found
  if (!visaData) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 pt-16 flex flex-col items-center justify-center">
          {/* Background Pattern */}
          <div
            className="fixed inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#1a2b5e 1px, transparent 1px), linear-gradient(90deg, #1a2b5e 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          
          <div className="relative z-10 text-center py-20 px-6 max-w-2xl mx-auto">
            {/* 404 Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-orange to-orange-dark rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange/25">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl font-poppins font-bold text-navy mb-4">
              Visa Tidak Ditemukan
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-600 font-dm-sans mb-8 leading-relaxed">
              Maaf, visa yang kamu cari tidak tersedia atau mungkin URL-nya salah. 
              Silakan pilih visa dari daftar yang tersedia.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/visa"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange to-orange-dark text-white font-poppins font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Lihat Semua Visa
              </a>
              <a
                href="/"
                className="px-8 py-3 rounded-xl border border-gray-200 text-navy font-poppins font-semibold hover:border-orange hover:bg-orange-50 transition-all duration-200"
              >
                Kembali ke Home
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <HeroHeader visa={visaData} />
      
      <StickyTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 md:px-8 max-w-[1280px] py-10 md:py-16">
        {/* Main Content - Full Width */}
        <div className="max-w-4xl mx-auto space-y-16">
          <OverviewTab visa={visaData} />
          <RequirementsTab visa={visaData} />
          <PricingTab visa={visaData} />
          <FaqTab visa={visaData} />
          <TravelInfoTab visa={visaData} />
          <AddonsTab visa={visaData} />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
