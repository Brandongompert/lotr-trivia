import { useState, useEffect, useCallback } from 'react';
import type { TriviaQuestion } from '../types/trivia';

interface UseTriviaReturn {
  currentQuestion: TriviaQuestion | null;
  currentIndex: number;
  totalQuestions: number;
  isAnswerRevealed: boolean;
  progress: number;
  goToNext: () => void;
  goToPrevious: () => void;
  toggleAnswer: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const STORAGE_KEY = 'lotr-trivia-progress';

/**
 * Custom hook to manage trivia deck state and navigation
 */
export function useTrivia(questions: TriviaQuestion[]): UseTriviaReturn {
  // Initialize state with saved progress
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      const index = parseInt(savedProgress, 10);
      if (index >= 0 && index < questions.length) {
        return index;
      }
    }
    return 0;
  });
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // Save progress to localStorage whenever index changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentIndex.toString());
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex] || null;
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const goToNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerRevealed(false);
    }
  }, [currentIndex, questions.length]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsAnswerRevealed(false);
    }
  }, [currentIndex]);

  const toggleAnswer = useCallback(() => {
    setIsAnswerRevealed((prev) => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, toggleAnswer]);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    isAnswerRevealed,
    progress,
    goToNext,
    goToPrevious,
    toggleAnswer,
    canGoNext: currentIndex < questions.length - 1,
    canGoPrevious: currentIndex > 0,
  };
}
