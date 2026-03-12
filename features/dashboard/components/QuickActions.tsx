"use client";

import { motion } from "framer-motion";
import { Search, Upload, CheckCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    icon: Search,
    title: "Cari Visa",
    description: "Temukan visa yang sesuai",
    href: "/visa",
    color: "bg-blue-50 text-blue-600 hover:bg-blue-100"
  },
  {
    icon: Upload,
    title: "Upload Dokumen",
    description: "Upload dokumen visa",
    href: "/dashboard/documents",
    color: "bg-green-50 text-green-600 hover:bg-green-100"
  },
  {
    icon: CheckCircle,
    title: "Cek Status",
    description: "Pantau progress aplikasi",
    href: "/dashboard/orders",
    color: "bg-orange-50 text-orange-600 hover:bg-orange-100"
  },
  {
    icon: HelpCircle,
    title: "Quiz Visa",
    description: "Tes pengetahuan visa",
    href: "/tools/quiz",
    color: "bg-purple-50 text-purple-600 hover:bg-purple-100"
  }
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="font-poppins font-bold text-xl text-navy mb-6">Jalan Pintas</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            >
              <Link
                href={action.href}
                className="block p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 group text-center"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors ${action.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-poppins font-semibold text-base text-navy mb-2 group-hover:text-orange transition-colors">
                  {action.title}
                </h3>
                <p className="font-dm-sans text-sm text-gray-600">
                  {action.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}