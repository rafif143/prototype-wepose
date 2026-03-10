'use client';

import { useState } from 'react';

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  isUnlocked: boolean;
  showPaywall: boolean;
  showResult: boolean;
}

export function useQuizState() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = () => {
    setHasStarted(true);
  };

  const answerQuestion = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  };

  const goToNext = () => {
    // Check if we need to show paywall at question 4 (index 3)
    if (currentQuestion === 2 && !isUnlocked) {
      setShowPaywall(true);
      return;
    }

    // Check if we've completed all questions
    if (currentQuestion === 7) {
      setShowResult(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const unlock = () => {
    setIsUnlocked(true);
    setShowPaywall(false);
    // Move to question 4 after unlocking
    setCurrentQuestion(3);
  };

  const closePaywall = () => {
    setShowPaywall(false);
  };

  const restart = () => {
    setHasStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const canGoBack = currentQuestion > 0;
  const hasAnswered = answers[currentQuestion] !== undefined;

  return {
    hasStarted,
    currentQuestion,
    answers,
    isUnlocked,
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
  };
}
