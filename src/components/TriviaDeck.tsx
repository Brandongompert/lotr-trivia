import { TriviaCard } from './TriviaCard';
import { ProgressBar } from './ProgressBar';
import type { TriviaQuestion } from '../types/trivia';
import { useTrivia } from '../hooks/useTrivia';

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
    canGoNext,
    canGoPrevious,
  } = useTrivia(questions);

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
          onClick={goToNext}
          disabled={!canGoNext}
          className="px-6 py-3 rounded-lg bg-slate-700 text-slate-200 font-medium transition-all duration-200 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="Next question"
        >
          Next →
        </button>
      </div>

      {/* Keyboard Hints */}
      <div className="text-center mt-6 text-xs text-slate-500">
        <p>Keyboard: ← → to navigate | Space/Enter to reveal</p>
      </div>
    </div>
  );
}
