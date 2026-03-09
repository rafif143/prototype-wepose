'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/shared/lib/utils';

export interface AccordionItem {
  id: string | number;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | number;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, defaultOpen, allowMultiple = false, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string | number>>(
    defaultOpen ? new Set([defaultOpen]) : new Set()
  );

  const toggleItem = (id: string | number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 flex-1">
                {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
                <span className="font-poppins font-semibold text-[15px] text-navy">
                  {item.title}
                </span>
              </div>
              <ChevronDownIcon
                className={cn(
                  'w-5 h-5 text-gray-400 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 font-dm-sans text-[14px] text-gray-600 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
