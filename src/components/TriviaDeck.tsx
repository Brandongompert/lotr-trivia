import { TriviaCard } from './TriviaCard';
import { ProgressBar } from './ProgressBar';
import type { TriviaQuestion } from '../types/trivia';
import { useTrivia } from '../hooks/useTrivia';
import { useConfetti } from '../hooks/useConfetti';

interface TriviaDeckProps {
  questions: TriviaQuestion[];
}

/**
 * Main trivia deck component managing question progression
 */
export function TriviaDeck({ questions }: TriviaDeckProps) {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    isAnswerRevealed,
    progress,
    goToNext,
    goToPrevious,
    toggleAnswer,
    resetProgress,
    canGoNext,
    canGoPrevious,
  } = useTrivia(questions);

  const { confettiShown, fireConfetti, resetConfetti } = useConfetti();
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleNextOrConfetti = () => {
    if (canGoNext) {
      goToNext();
    } else if (!confettiShown) {
      fireConfetti();
    } else {
      resetProgress();
      resetConfetti();
    }
  };

  const getNextButtonContent = () => {
    if (canGoNext) {
      return 'Next →';
    } else if (!confettiShown) {
      return '🎉 Finish!';
    } else {
      return '🔄 Reset';
    }
  };

  if (!currentQuestion) {
    return (
      <div className="text-center text-slate-400">
        <p>No trivia questions available.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      <ProgressBar
        progress={progress}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
      />

      <TriviaCard
        question={currentQuestion}
        isAnswerRevealed={isAnswerRevealed}
        onToggleAnswer={toggleAnswer}
      />

      {/* Completion Message */}
      {isLastQuestion && confettiShown && (
        <div className="mt-8 p-6 bg-linear-to-r from-purple-900/50 to-pink-900/50 rounded-xl border-2 border-purple-500/50 text-center">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400 mb-2">
            🎉 Quest Complete! 🎉
          </h3>
          <p className="text-slate-300">
            You've mastered all {totalQuestions} trivia questions! Your
            knowledge of Middle-earth is impressive.
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={goToPrevious}
          disabled={!canGoPrevious}
          className="px-6 py-3 rounded-lg bg-slate-700 text-slate-200 font-medium transition-all duration-200 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="Previous question"
        >
          ← Previous
        </button>

        <button
          onClick={toggleAnswer}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium transition-all duration-200 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label={isAnswerRevealed ? 'Hide answer' : 'Reveal answer'}
        >
          {isAnswerRevealed ? 'Hide Answer' : 'Reveal Answer'}
        </button>

        <button
          onClick={handleNextOrConfetti}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            !canGoNext && !confettiShown
              ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 focus:ring-purple-500 animate-pulse'
              : !canGoNext && confettiShown
                ? 'bg-green-600 text-white hover:bg-green-500 focus:ring-green-500'
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-blue-500'
          }`}
          aria-label={
            canGoNext
              ? 'Next question'
              : confettiShown
                ? 'Reset quiz'
                : 'Finish quiz'
          }
        >
          {getNextButtonContent()}
        </button>
      </div>

      {/* Keyboard Hints */}
      <div className="text-center mt-6 text-xs text-slate-500">
        <p>Keyboard: ← → to navigate | Space/Enter to reveal</p>
      </div>
    </div>
  );
}
