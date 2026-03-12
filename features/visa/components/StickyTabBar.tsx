"use client";

import { motion } from "framer-motion";
import {
  InformationCircleIcon,
  DocumentCheckIcon,
  BanknotesIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  PuzzlePieceIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

type TabType = 'overview' | 'requirements' | 'pricing' | 'process' | 'faq' | 'travel-info' | 'addons';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview', icon: InformationCircleIcon },
  { id: 'requirements', label: 'Persyaratan', icon: DocumentCheckIcon },
  { id: 'pricing', label: 'Harga', icon: BanknotesIcon },
  { id: 'process', label: 'Proses', icon: ClockIcon },
  { id: 'faq', label: 'FAQ', icon: QuestionMarkCircleIcon },
  { id: 'travel-info', label: 'Perjalanan', icon: MapPinIcon },
  { id: 'addons', label: 'Add-on', icon: PuzzlePieceIcon },
];

interface StickyTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function StickyTabBar({ activeTab, onTabChange }: StickyTabBarProps) {
  const handleTabClick = (tabId: TabType) => {
    onTabChange(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      const offset = 128; // navbar (64px) + tab bar (64px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
        <div className="flex items-center overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex items-center gap-1.5 px-4 md:px-6 py-3 whitespace-nowrap font-dm-sans font-medium text-sm md:text-base transition-colors duration-150 ${
                  isActive
                    ? 'text-orange'
                    : 'text-gray-500 hover:text-navy'
                }`}
              >
                <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-orange' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
