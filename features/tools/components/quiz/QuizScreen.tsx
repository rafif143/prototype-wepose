'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { QuizQuestion } from '@/lib/tools/quiz/questions';
import { slideHorizontal } from '@/utils/animations';

interface QuizScreenProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
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
  canGoBack,
  questionNumber,
  totalQuestions,
}: QuizScreenProps) {
  return (
    <>
      {/* Question Counter */}
      <div className="fixed top-4 right-6 z-50 text-[13px] font-dm-sans text-white/50">
        {questionNumber} / {totalQuestions}
      </div>

      {/* Back Button */}
      {canGoBack && (
        <button
          onClick={onBack}
          className="fixed top-4 left-6 z-50 text-white/60 hover:text-white/100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-16 z-50 text-white/60 hover:text-white/100 transition-colors"
        aria-label="Close quiz"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      {/* Question Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          variants={slideHorizontal}
          initial="enter"
          animate="center"
          exit="exit"
          className="max-w-xl mx-auto px-6 py-16 flex flex-col items-center justify-center min-h-screen"
        >
          {/* Category Label */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <span className="text-[12px] font-dm-sans text-white/60 uppercase tracking-wide">
              {question.category}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-[28px] md:text-[28px] sm:text-[22px] font-poppins font-bold text-white text-center mb-8 leading-[1.3] max-w-2xl">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div
            className={`w-full grid gap-4 mb-8 ${
              question.options.length === 4 ? 'grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {question.options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => onSelectAnswer(option.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectAnswer(option.value);
                  }
                }}
                className={`min-h-[120px] md:min-h-[120px] sm:min-h-[96px] rounded-2xl flex flex-col items-center justify-center gap-3 p-6 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-navy ${
                  selectedAnswer === option.value
                    ? 'bg-orange border-2 border-orange scale-[1.02]'
                    : 'bg-white/8 border-2 border-white/15 hover:border-orange/60 hover:bg-orange/10'
                }`}
                whileHover={{ scale: selectedAnswer === option.value ? 1.02 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={selectedAnswer === option.value}
              >
                <span className="text-[40px]" aria-hidden="true">{option.icon}</span>
                <span className="text-[15px] font-poppins font-medium text-white text-center">
                  {option.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <AnimatePresence>
            {selectedAnswer && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onClick={onNext}
                className="bg-orange text-white font-poppins font-semibold text-[15px] py-3 px-8 rounded-full hover:shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
              >
                Lanjut →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
