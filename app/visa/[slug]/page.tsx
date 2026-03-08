"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroHeader } from "@/components/visa-detail/HeroHeader";
import { StickyTabBar } from "@/components/visa-detail/StickyTabBar";
import { OverviewTab } from "@/components/visa-detail/OverviewTab";
import { RequirementsTab } from "@/components/visa-detail/RequirementsTab";
import { PricingTab } from "@/components/visa-detail/PricingTab";
import { FaqTab } from "@/components/visa-detail/FaqTab";
import { AddonsTab } from "@/components/visa-detail/AddonsTab";
import { OrderSummary } from "@/components/visa-detail/OrderSummary";
import { StickyCTAMobile } from "@/components/visa-detail/StickyCTAMobile";
import { visaDatabase } from "@/lib/visa-data";

type TabType = 'overview' | 'requirements' | 'pricing' | 'faq' | 'addons';

export default function VisaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const visaData = visaDatabase[slug];

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'requirements', 'pricing', 'faq', 'addons'];
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
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Navbar />
        <div className="text-center py-20">
          <h1 className="font-poppins font-bold text-4xl text-navy mb-4">Visa Tidak Ditemukan</h1>
          <p className="font-dm-sans text-gray-600">Visa yang kamu cari tidak tersedia.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <HeroHeader visa={visaData} />
      
      <StickyTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 md:px-8 max-w-[1280px] py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Main Content */}
          <div className="space-y-16">
            <OverviewTab visa={visaData} />
            <RequirementsTab visa={visaData} />
            <PricingTab visa={visaData} />
            <FaqTab visa={visaData} />
            <AddonsTab visa={visaData} />
          </div>

          {/* Sidebar */}
          <div>
            <OrderSummary visa={visaData} />
          </div>
        </div>
      </div>

      <StickyCTAMobile visa={visaData} />
      
      <Footer />
    </main>
  );
}
