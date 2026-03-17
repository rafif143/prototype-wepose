"use client";

import { motion } from "framer-motion";
import { Clock, Eye } from "lucide-react";
import Link from "next/link";
import { Flag } from '@/shared/ui/Flag';

interface Order {
  id: string;
  country: string;
  type: string;
  status: 'processing' | 'review' | 'approved' | 'ready';
  statusLabel: string;
  submittedDate: string;
  countryCode: string;
}

const mockOrders: Order[] = [
  {
    id: "WP-2024-001",
    country: "Jepang",
    type: "Tourist Visa",
    status: "review",
    statusLabel: "Dokumen Direview",
    submittedDate: "15 Mar 2024",
    countryCode: "jp"
  },
  {
    id: "WP-2024-002", 
    country: "Korea Selatan",
    type: "Business Visa",
    status: "processing",
    statusLabel: "Sedang Diproses",
    submittedDate: "12 Mar 2024",
    countryCode: "kr"
  }
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'review': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'approved': return 'bg-green-100 text-green-700 border-green-200';
    case 'ready': return 'bg-purple-100 text-purple-700 border-purple-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function ActiveOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-2xl shadow-md p-6 h-fit"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-poppins font-bold text-xl text-navy">Order Aktif</h2>
        <Link 
          href="/dashboard/orders"
          className="font-dm-sans text-sm text-orange hover:text-orange-dark transition-colors"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Flag countryCode={order.countryCode} size="lg" />
                <div>
                  <h3 className="font-poppins font-semibold text-base text-navy group-hover:text-orange transition-colors">
                    {order.country}
                  </h3>
                  <p className="font-dm-sans text-sm text-gray-600">{order.type}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-dm-sans font-medium border ${getStatusColor(order.status)}`}>
                {order.statusLabel}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="font-dm-sans">{order.submittedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-orange opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
                <span className="font-dm-sans font-medium">Lihat Detail</span>
              </div>
            </div>
          </motion.div>
        ))}

        {mockOrders.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-dm-sans text-gray-500">Belum ada order aktif</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}