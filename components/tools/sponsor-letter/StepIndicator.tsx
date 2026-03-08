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
    <div className="sticky top-16 bg-white border-b border-gray-200 py-4 px-6 z-10">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isActive = currentStep === step.number;
          const isPending = !isCompleted && !isActive;

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  layoutId={isActive ? 'active-step' : undefined}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    isCompleted
                      ? 'bg-success-green'
                      : isActive
                      ? 'bg-orange'
                      : 'bg-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5 text-white" />
                  ) : (
                    <span
                      className={`text-[14px] font-poppins font-bold ${
                        isActive ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {step.number}
                    </span>
                  )}
                </motion.div>
                <span
                  className={`text-[13px] font-dm-sans mt-2 whitespace-nowrap ${
                    isCompleted
                      ? 'text-success-green font-medium'
                      : isActive
                      ? 'text-orange font-bold'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 bg-gray-200 relative">
                  <motion.div
                    className="absolute inset-0 bg-success-green"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
