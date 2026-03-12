"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, ClockIcon, DocumentTextIcon, EyeIcon, TruckIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  time?: string;
  note?: string;
  icon: React.ComponentType<any>;
}

interface TrackingTimelineProps {
  orderId: string;
  steps: TimelineStep[];
}

const defaultSteps: TimelineStep[] = [
  {
    id: "1",
    title: "Dokumen Diterima",
    description: "Dokumen visa telah diterima dan sedang diverifikasi",
    status: "completed",
    date: "15 Mar 2024",
    time: "09:30",
    note: "Semua dokumen lengkap dan sesuai persyaratan",
    icon: DocumentTextIcon
  },
  {
    id: "2", 
    title: "Dokumen Direview",
    description: "Tim ahli sedang mereview kelengkapan dokumen",
    status: "completed",
    date: "16 Mar 2024", 
    time: "14:20",
    note: "Review dokumen selesai, siap untuk diajukan",
    icon: EyeIcon
  },
  {
    id: "3",
    title: "Diajukan ke Kedutaan",
    description: "Aplikasi visa sedang diproses di kedutaan",
    status: "current",
    date: "17 Mar 2024",
    time: "10:15",
    note: "Estimasi proses 7-10 hari kerja",
    icon: ClockIcon
  },
  {
    id: "4",
    title: "Visa Disetujui", 
    description: "Visa telah disetujui oleh kedutaan",
    status: "pending",
    icon: CheckCircleIcon
  },
  {
    id: "5",
    title: "Paspor Siap",
    description: "Paspor dengan visa siap untuk diambil",
    status: "pending", 
    icon: ArchiveBoxIcon
  }
];

export function TrackingTimeline({ orderId, steps = defaultSteps }: TrackingTimelineProps) {
  const getStepColor = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500 border-green-500';
      case 'current': return 'bg-orange border-orange animate-pulse';
      case 'pending': return 'bg-gray-300 border-gray-300';
      default: return 'bg-gray-300 border-gray-300';
    }
  };

  const getLineColor = (currentStatus: TimelineStep['status'], nextStatus?: TimelineStep['status']) => {
    if (currentStatus === 'completed') return 'bg-green-500';
    if (currentStatus === 'current') return 'bg-gradient-to-b from-green-500 to-gray-300';
    return 'bg-gray-300';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="mb-6">
        <h2 className="font-poppins font-bold text-xl text-navy mb-2">Status Tracking</h2>
        <p className="font-dm-sans text-gray-600">Order ID: {orderId}</p>
      </div>

      <div className="relative">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isLast = index === steps.length - 1;
          const nextStep = steps[index + 1];

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-6 top-12 w-0.5 h-full -translate-x-0.5">
                  <div className={`w-full h-full ${getLineColor(step.status, nextStep?.status)}`} />
                </div>
              )}

              {/* Timeline Dot */}
              <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${getStepColor(step.status)}`}>
                <IconComponent className={`w-5 h-5 ${
                  step.status === 'completed' || step.status === 'current' ? 'text-white' : 'text-gray-500'
                }`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className={`font-poppins font-semibold text-base ${
                    step.status === 'current' ? 'text-orange' : 
                    step.status === 'completed' ? 'text-navy' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {step.date && (
                    <div className="text-right flex-shrink-0">
                      <p className="font-dm-sans text-sm text-gray-600">{step.date}</p>
                      {step.time && (
                        <p className="font-dm-sans text-xs text-gray-500">{step.time}</p>
                      )}
                    </div>
                  )}
                </div>

                <p className={`font-dm-sans text-sm mb-3 ${
                  step.status === 'pending' ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>

                {step.note && (
                  <div className={`p-3 rounded-lg text-sm font-dm-sans ${
                    step.status === 'current' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                    step.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-200' :
                    'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}>
                    <span className="font-medium">Catatan: </span>
                    {step.note}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Final Status - Show confetti animation if completed */}
      {steps.some(step => step.status === 'completed' && step.title === 'Paspor Siap') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="font-poppins font-bold text-lg text-green-700 mb-1">
            Selamat! Visa Anda Siap
          </h3>
          <p className="font-dm-sans text-sm text-green-600">
            Paspor dengan visa dapat diambil di kantor kami
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}