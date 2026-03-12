"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  InformationCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import type { VisaData } from "@/features/visa/lib/data";

interface ProcessTabProps {
  visa: VisaData;
}

export function ProcessTab({ visa }: ProcessTabProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2)); // March 2026

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1));

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const currentMonthIndex = currentMonth.getMonth();
  const currentYear = currentMonth.getFullYear();

  // Process timeline data
  const processSteps = [
    {
      date: "13 Maret",
      title: "Deadline untuk menyiapkan semua dokumen",
      description: "Lengkapi dokumen hari ini untuk estimasi penyelesaian pada 6 April",
      status: "deadline",
      color: "orange"
    },
    {
      date: "14 Maret - 5 April",
      title: "Visa diproses",
      description: "Kami akan memproses aplikasi visa Anda.",
      status: "processing",
      color: "blue"
    },
    {
      date: "6 April",
      title: "Visa diterima",
      description: "Kami akan mengirimkan visa langsung kepada Anda atau dapat diambil di kantor kami.",
      status: "completed",
      color: "green"
    }
  ];

  // Highlighted dates
  const highlightedDates = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const completedDates = [6]; // April dates would be in next month

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <div id="process" className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="font-poppins font-semibold text-2xl text-navy mb-4">Proses</h3>
        
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8"
        >
          <div className="flex items-start gap-3">
            <InformationCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="font-dm-sans text-sm text-blue-700">
              Ini adalah estimasi waktu pemrosesan. Keterlambatan dari sisi applicant akan 
              mengakibatkan keterlambatan dalam proses aplikasi.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-poppins font-semibold text-lg text-navy">
              {monthNames[currentMonthIndex]} {currentYear}
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center py-2">
                <span className="font-dm-sans text-sm text-gray-500 font-medium">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const dayNumber = day.getDate();
              const isCurrentMonth = day.getMonth() === currentMonthIndex;
              const isHighlighted = isCurrentMonth && highlightedDates.includes(dayNumber);
              const isCompleted = isCurrentMonth && completedDates.includes(dayNumber);
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm font-dm-sans rounded-lg transition-colors
                    ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                    ${isHighlighted ? 'bg-orange-100 text-orange-700 font-semibold' : ''}
                    ${isCompleted ? 'bg-green-100 text-green-700 font-semibold' : ''}
                    ${isToday ? 'bg-navy text-white font-semibold' : ''}
                  `}
                >
                  {dayNumber}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <h4 className="font-poppins font-semibold text-lg text-navy mb-6">Jadwal Proses</h4>
          
          <div className="space-y-6">
            {processSteps.map((step, index) => {
              const isLast = index === processSteps.length - 1;
              
              return (
                <div key={index} className="relative">
                  {/* Timeline Line */}
                  {!isLast && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />
                  )}
                  
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${step.color === 'orange' ? 'bg-orange-100' : ''}
                      ${step.color === 'blue' ? 'bg-blue-100' : ''}
                      ${step.color === 'green' ? 'bg-green-100' : ''}
                    `}>
                      {step.status === 'deadline' && (
                        <CalendarDaysIcon className={`w-6 h-6 text-orange-600`} />
                      )}
                      {step.status === 'processing' && (
                        <ClockIcon className={`w-6 h-6 text-blue-600`} />
                      )}
                      {step.status === 'completed' && (
                        <CheckCircleIcon className={`w-6 h-6 text-green-600`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className={`
                        inline-block px-3 py-1 rounded-full text-xs font-dm-sans font-medium mb-2
                        ${step.color === 'orange' ? 'bg-orange-100 text-orange-700' : ''}
                        ${step.color === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                        ${step.color === 'green' ? 'bg-green-100 text-green-700' : ''}
                      `}>
                        {step.date}
                      </div>
                      <h5 className="font-poppins font-semibold text-base text-navy mb-1">
                        {step.title}
                      </h5>
                      <p className="font-dm-sans text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Process Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <ClockIcon className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-lg text-navy mb-2">
              Estimasi Total Waktu Proses
            </h4>
            <p className="font-dm-sans text-base text-gray-700 mb-3">
              Proses visa {visa.country} membutuhkan waktu sekitar <span className="font-semibold text-orange-600">{visa.processDays}</span> 
              dari dokumen lengkap hingga visa siap.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <InformationCircleIcon className="w-4 h-4" />
              <span className="font-dm-sans">
                Waktu dapat bervariasi tergantung kelengkapan dokumen dan kondisi kedutaan
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}