'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { QuizQuestion } from '@/features/tools/lib/quiz/questions';
import { slideHorizontal } from '@/shared/utils/animations';

interface QuizScreenProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  onDevModeEndTest?: () => void;
  canGoBack: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizScreen({
  question,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onBack,
  onClose,
  onDevModeEndTest,
  canGoBack,
  questionNumber,
  totalQuestions,
}: QuizScreenProps) {
  return (
    <>
      {/* Question Counter */}
      <div className="fixed top-20 right-6 z-50 text-[13px] font-dm-sans text-gray-500">
        {questionNumber} / {totalQuestions}
      </div>

      {/* Back Button */}
      {canGoBack && (
        <button
          onClick={onBack}
          className="fixed top-20 left-6 z-50 text-gray-500 hover:text-navy transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      )}

      {/* Back Button */}
      <button
        onClick={onClose}
        className="fixed top-20 right-6 z-50 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-navy hover:border-orange transition-colors font-dm-sans text-sm font-medium shadow-sm"
        aria-label="Kembali ke intro"
      >
        Kembali
      </button>

      {/* Question Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          variants={slideHorizontal}
          initial="enter"
          animate="center"
          exit="exit"
          className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-screen"
        >
          {/* Category Label */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6">
            <span className="text-[12px] font-dm-sans text-orange uppercase tracking-wide font-medium">
              {question.category}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy text-center mb-12 leading-tight max-w-3xl">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div
            className={`w-full grid gap-6 mb-12 ${
              question.options.length === 4 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {question.options.map((option, index) => {
              const IconComponent = option.icon;
              const isSelected = selectedAnswer === option.value;
              
              return (
                <motion.button
                  key={option.value}
                  onClick={() => onSelectAnswer(option.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectAnswer(option.value);
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`relative min-h-[160px] rounded-2xl flex flex-col items-center justify-center gap-4 p-8 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 border-2 overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-br from-orange to-orange-dark border-orange text-white shadow-2xl shadow-orange/30 scale-[1.02]'
                      : 'bg-white border-gray-200 hover:border-orange hover:shadow-xl hover:shadow-orange/10 hover:scale-[1.02] text-navy hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100/50'
                  }`}
                  whileHover={{ scale: isSelected ? 1.02 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-pressed={isSelected}
                >
                  {/* Animated Icon Background */}
                  <motion.div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-2 ${
                      isSelected 
                        ? 'bg-white/20' 
                        : 'bg-orange-50 group-hover:bg-orange-100 border border-orange-100'
                    }`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent className={`w-8 h-8 ${isSelected ? 'text-white' : 'text-orange'}`} />
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl blur-sm transition-all duration-300 ${
                      isSelected ? 'bg-white/10' : 'bg-orange/10 group-hover:bg-orange/20'
                    }`} />
                  </motion.div>
                  
                  {/* Text */}
                  <span className={`text-lg font-poppins font-bold text-center relative z-10 ${
                    isSelected ? 'text-white' : 'text-navy group-hover:text-navy'
                  }`}>
                    {option.label}
                  </span>
                  
                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", bounce: 0.6 }}
                      className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg z-10"
                    >
                      <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                  
                  {/* Hover Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-orange/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center w-full max-w-md">
            {/* Previous Button */}
            {canGoBack ? (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBack}
                className="px-6 py-3 rounded-xl border border-gray-200 text-navy font-poppins font-semibold text-sm hover:border-orange hover:bg-orange-50 transition-all duration-200 flex items-center gap-2"
              >
                <span>←</span> Sebelumnya
              </motion.button>
            ) : (
              <div className="flex gap-3">
                {/* Dev Mode Button - Only show on first question */}
                {questionNumber === 1 && onDevModeEndTest && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={onDevModeEndTest}
                    className="px-4 py-2 rounded-lg bg-navy text-white font-dm-sans font-medium text-xs hover:bg-navy-dark transition-all duration-200 flex items-center gap-2"
                  >
                    <span>🔧</span> Dev Mode End Test
                  </motion.button>
                )}
              </div>
            )}

            {/* Next Button */}
            <AnimatePresence>
              {selectedAnswer && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onClick={onNext}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange to-orange-dark text-white font-poppins font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                >
                  Lanjut <span>→</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
