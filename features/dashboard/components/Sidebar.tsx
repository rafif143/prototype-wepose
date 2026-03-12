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
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon
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
  const userName = "User"; // This would come from auth context in real app

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log("Logging out...");
    // Redirect to login page
    window.location.href = "/auth";
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-navy transition-all duration-300 z-50 flex flex-col ${
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

      {/* User Info */}
      <div className="p-4 border-b border-navy-mid">
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-5 h-5 text-orange" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <UserCircleIcon className="w-6 h-6 text-orange" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-poppins font-semibold text-sm truncate">
                {userName}
              </p>
              <p className="text-gray-400 font-dm-sans text-xs">
                Member
              </p>
            </div>
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

      {/* Bottom Section */}
      <div className="border-t border-navy-mid">
        {/* Logout Button */}
        <div className="p-3">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group text-gray-300 hover:text-red-400 hover:bg-red-500/10 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="font-dm-sans font-medium text-sm">Logout</span>
            )}
            
            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>

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
    </div>
  );
}