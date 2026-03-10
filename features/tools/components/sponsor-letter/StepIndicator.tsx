'use client';

import { CheckIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
  completedSteps: number[];
}

const steps = [
  { number: 1, label: 'Pilih Template' },
  { number: 2, label: 'Review & Edit' },
  { number: 3, label: 'Generate PDF' },
];

export function StepIndicator({ currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 py-4 px-6 z-30">
      <div className="max-w-4xl mx-auto">
        {/* Steps */}
        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 rounded-full" />
          
          {/* Animated Progress Line */}
          <motion.div
            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-orange to-orange-dark rounded-full"
            initial={{ width: "0%" }}
            animate={{ 
              width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" 
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Step Circles */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.number);
              const isActive = currentStep === step.number;

              return (
                <div key={step.number} className="flex flex-col items-center">
                  {/* Circle */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-gradient-to-r from-orange to-orange-dark shadow-lg shadow-orange/30'
                        : isActive
                        ? 'bg-gradient-to-r from-orange to-orange-dark shadow-lg shadow-orange/30'
                        : 'bg-white border-2 border-gray-200 shadow-sm'
                    }`}
                  >
                    {/* Animated Ring for Active Step */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border border-orange/50"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Icon/Number */}
                    <div className="relative z-10">
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", bounce: 0.5 }}
                        >
                          <CheckIcon className="w-6 h-6 text-white" />
                        </motion.div>
                      ) : (
                        <span
                          className={`text-sm font-poppins font-bold ${
                            isActive ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          {step.number}
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Label */}
                  <motion.div
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    className="mt-2 text-center"
                  >
                    <span
                      className={`text-xs font-dm-sans font-medium whitespace-nowrap ${
                        isCompleted
                          ? 'text-orange'
                        : isActive
                          ? 'text-orange font-semibold'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Step Description */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-3"
        >
          <p className="text-xs text-gray-500 font-dm-sans">
            {currentStep === 1 && "Pilih template yang sesuai kebutuhan"}
            {currentStep === 2 && "Lengkapi data untuk surat sponsor"}
            {currentStep === 3 && "Generate dan unduh PDF"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
