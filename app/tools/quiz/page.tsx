'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/features/tools/components/quiz/ProgressBar';
import { QuizScreen } from '@/features/tools/components/quiz/QuizScreen';
import { QuizPaywall } from '@/features/tools/components/quiz/QuizPaywall';
import { QuizResult } from '@/features/tools/components/quiz/QuizResult';
import { DevModeResultModal } from '@/features/tools/components/quiz/DevModeResultModal';
import { quizQuestions } from '@/features/tools/lib/quiz/questions';
import { calculateRecommendation } from '@/features/tools/lib/quiz/recommendation';
import { useQuizState } from '@/features/visa/hooks/useQuizState';
import { QuizIntro } from '@/features/tools/components/quiz/QuizIntro';
import Navbar from '@/shared/layout/Navbar';

export default function QuizPage() {
  const router = useRouter();
  const {
    hasStarted,
    currentQuestion,
    answers,
    showPaywall,
    showResult,
    canGoBack,
    hasAnswered,
    startQuiz,
    answerQuestion,
    goToNext,
    goToPrevious,
    unlock,
    closePaywall,
    restart,
  } = useQuizState();

  const [showExitModal, setShowExitModal] = useState(false);
  const [showDevModeResult, setShowDevModeResult] = useState(false);

  const currentQuestionData = quizQuestions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  const handleClose = () => {
    // Go back to quiz intro instead of closing completely
    restart();
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

  const handleDevModeEndTest = () => {
    setShowDevModeResult(true);
  };

  const handleCloseDevModeResult = () => {
    setShowDevModeResult(false);
  };

  // Calculate recommendation when showing results
  const recommendation = showResult
    ? calculateRecommendation(answers)
    : null;

  // Show intro screen if quiz hasn't started
  if (!hasStarted) {
    return (
      <>
        <Navbar />
        <QuizIntro onStart={startQuiz} />
      </>
    );
  }

  if (showResult && recommendation) {
    return (
      <>
        <Navbar />
        <QuizResult
          recommendation={recommendation}
          onRestart={handleRestart}
          onApply={handleApply}
          onSave={handleSave}
        />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 pt-16 relative">
        {/* Background Pattern */}
        <div
          className="fixed inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#1a2b5e 1px, transparent 1px), linear-gradient(90deg, #1a2b5e 1px, transparent 1px)",
            backgroundSize: "60px 60px",
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
          onDevModeEndTest={handleDevModeEndTest}
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

        {/* Dev Mode Result Modal */}
        <DevModeResultModal
          isOpen={showDevModeResult}
          onClose={handleCloseDevModeResult}
        />
      </div>
    </>
  );
}
