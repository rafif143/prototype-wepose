'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, variant = 'default', className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={cn('w-full', className)}>
      {/* Tab List */}
      <div
        className={cn(
          'flex gap-2',
          variant === 'underline' && 'border-b border-gray-200'
        )}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2.5 font-dm-sans font-medium text-sm transition-all duration-200',
                variant === 'default' &&
                  (isActive
                    ? 'bg-orange text-white rounded-lg'
                    : 'text-gray-600 hover:text-navy hover:bg-gray-50 rounded-lg'),
                variant === 'pills' &&
                  (isActive
                    ? 'bg-orange-100 text-orange rounded-full'
                    : 'text-gray-600 hover:text-navy hover:bg-gray-50 rounded-full'),
                variant === 'underline' &&
                  (isActive ? 'text-orange' : 'text-gray-600 hover:text-navy')
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              {tab.label}
              {variant === 'underline' && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6" role="tabpanel" id={`panel-${activeTab}`}>
        {activeTabContent}
      </div>
    </div>
  );
}
