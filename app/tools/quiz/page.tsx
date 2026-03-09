'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/features/tools/components/quiz/ProgressBar';
import { QuizScreen } from '@/features/tools/components/quiz/QuizScreen';
import { QuizPaywall } from '@/features/tools/components/quiz/QuizPaywall';
import { QuizResult } from '@/features/tools/components/quiz/QuizResult';
import { quizQuestions } from '@/features/tools/lib/quiz/questions';
import { calculateRecommendation } from '@/features/tools/lib/quiz/recommendation';
import { useQuizState } from '@/features/visa/hooks/useQuizState';

export default function QuizPage() {
  const router = useRouter();
  const {
    currentQuestion,
    answers,
    showPaywall,
    showResult,
    canGoBack,
    hasAnswered,
    answerQuestion,
    goToNext,
    goToPrevious,
    unlock,
    closePaywall,
    restart,
  } = useQuizState();

  const [showExitModal, setShowExitModal] = useState(false);

  const currentQuestionData = quizQuestions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  const handleClose = () => {
    // In a real app, show confirmation modal
    router.push('/');
  };

  const handlePurchase = () => {
    // In a real app, integrate with payment gateway
    console.log('Purchase quiz access');
    unlock();
  };

  const handleBundleWithVisa = () => {
    // In a real app, navigate to visa order page
    console.log('Bundle with visa order');
    router.push('/');
  };

  const handleApply = () => {
    // In a real app, navigate to visa application
    console.log('Apply for visa');
    router.push('/');
  };

  const handleSave = () => {
    // In a real app, save results to user account
    console.log('Save results');
  };

  const handleRestart = () => {
    restart();
  };

  // Calculate recommendation when showing results
  const recommendation = showResult
    ? calculateRecommendation(answers)
    : null;

  if (showResult && recommendation) {
    return (
      <QuizResult
        recommendation={recommendation}
        onRestart={handleRestart}
        onApply={handleApply}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-mid to-navy relative">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Progress Bar */}
      <ProgressBar current={currentQuestion + 1} total={quizQuestions.length} />

      {/* Quiz Screen */}
      <QuizScreen
        question={currentQuestionData}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={answerQuestion}
        onNext={goToNext}
        onBack={goToPrevious}
        onClose={handleClose}
        canGoBack={canGoBack}
        questionNumber={currentQuestion + 1}
        totalQuestions={quizQuestions.length}
      />

      {/* Paywall Modal */}
      <QuizPaywall
        isOpen={showPaywall}
        onClose={closePaywall}
        onPurchase={handlePurchase}
        onBundleWithVisa={handleBundleWithVisa}
      />
    </div>
  );
}
