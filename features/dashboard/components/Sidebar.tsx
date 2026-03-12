"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  UsersIcon,
  WalletIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { icon: HomeIcon, label: "Beranda", href: "/dashboard" },
  { icon: ShoppingBagIcon, label: "Order Saya", href: "/dashboard/orders" },
  { icon: DocumentTextIcon, label: "Dokumen", href: "/dashboard/documents" },
  { icon: UsersIcon, label: "Profil & Keluarga", href: "/dashboard/profile" },
  { icon: WalletIcon, label: "Saldo & Voucher", href: "/dashboard/wallet" },
  { icon: BellIcon, label: "Notifikasi", href: "/dashboard/notifications" },
  { icon: QuestionMarkCircleIcon, label: "Bantuan", href: "/dashboard/help" },
];

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={`fixed left-0 top-0 h-full bg-navy transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-60'
    }`}>
      {/* Logo */}
      <div className="p-6 border-b border-navy-mid">
        {collapsed ? (
          <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
            <span className="text-white font-poppins font-bold text-sm">W</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-poppins font-bold text-sm">W</span>
            </div>
            <span className="text-white font-poppins font-bold text-xl">WePose</span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-navy-mid text-orange border-l-4 border-orange ml-0' 
                      : 'text-gray-300 hover:text-white hover:bg-navy-mid/50'
                  }`}
                >
                  <IconComponent className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? 'text-orange' : 'text-gray-300 group-hover:text-white'
                  }`} />
                  {!collapsed && (
                    <span className="font-dm-sans font-medium text-sm">{item.label}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-navy-mid">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 text-gray-300 hover:text-white hover:bg-navy-mid/50 rounded-xl transition-colors"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}