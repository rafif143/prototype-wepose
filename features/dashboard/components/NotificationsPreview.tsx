"use client";

import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertCircle, Info, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Dokumen Disetujui",
    message: "Dokumen visa Jepang Anda telah disetujui dan sedang diproses ke kedutaan",
    time: "2 jam lalu",
    read: false
  },
  {
    id: "2", 
    type: "warning",
    title: "Dokumen Perlu Diperbaiki",
    message: "Foto paspor untuk visa Korea perlu diganti dengan background putih",
    time: "5 jam lalu",
    read: false
  },
  {
    id: "3",
    type: "info",
    title: "Pembayaran Berhasil",
    message: "Pembayaran visa Singapura sebesar Rp 850.000 telah berhasil diproses",
    time: "1 hari lalu",
    read: true
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success': return CheckCircle;
    case 'warning': return AlertCircle;
    case 'info': return Info;
    default: return Bell;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'success': return 'text-green-600 bg-green-50';
    case 'warning': return 'text-orange-600 bg-orange-50';
    case 'info': return 'text-blue-600 bg-blue-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export function NotificationsPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-poppins font-bold text-xl text-navy">Notifikasi Terbaru</h2>
        <Link 
          href="/dashboard/notifications"
          className="flex items-center gap-2 font-dm-sans text-sm text-orange hover:text-orange-dark transition-colors group"
        >
          Lihat Semua
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification, index) => {
          const IconComponent = getNotificationIcon(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className={`p-4 border rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer group ${
                notification.read ? 'border-gray-200 bg-white' : 'border-orange-200 bg-orange-50/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-poppins font-semibold text-base text-navy group-hover:text-orange transition-colors">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-orange rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  
                  <p className="font-dm-sans text-sm text-gray-600 mb-2 line-clamp-2">
                    {notification.message}
                  </p>
                  
                  <span className="font-dm-sans text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {mockNotifications.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-dm-sans text-gray-500">Belum ada notifikasi</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}