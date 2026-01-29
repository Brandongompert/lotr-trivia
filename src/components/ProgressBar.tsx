interface ProgressBarProps {
  progress: number;
  currentIndex: number;
  totalQuestions: number;
}

/**
 * Visual progress indicator showing current position in the deck
 */
export function ProgressBar({ progress, currentIndex, totalQuestions }: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-400">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-slate-400">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
