import { motion } from 'framer-motion';
import type { TriviaQuestion } from '../types/trivia';

interface TriviaCardProps {
  question: TriviaQuestion;
  isAnswerRevealed: boolean;
  onToggleAnswer: () => void;
}

/**
 * Animated flashcard component that flips to reveal the answer
 */
export function TriviaCard({
  question,
  isAnswerRevealed,
  onToggleAnswer,
}: TriviaCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000">
      <motion.div
        className="relative w-full h-96 cursor-pointer"
        onClick={onToggleAnswer}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-umami-event={`flip-card-${question.id}`}
      >
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-2xl shadow-2xl"
          style={{
            backgroundColor: isAnswerRevealed ? '#1e293b' : '#334155',
            borderWidth: '2px',
            borderColor: isAnswerRevealed ? '#10b981' : '#60a5fa',
          }}
          initial={false}
          animate={{
            rotateY: isAnswerRevealed ? 180 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
        >
          <div
            style={{
              transform: isAnswerRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {!isAnswerRevealed ? (
              <>
                <div className="text-sm font-semibold text-blue-400 mb-4 uppercase tracking-wide">
                  Question
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-50 mb-8 leading-relaxed">
                  {question.question}
                </h2>
                <div className="flex gap-3 text-xs text-slate-400">
                  {question.category && (
                    <span className="px-3 py-1 rounded-full bg-slate-700/50">
                      {question.category}
                    </span>
                  )}
                  {question.difficulty && (
                    <span className="px-3 py-1 rounded-full bg-slate-700/50 capitalize">
                      {question.difficulty}
                    </span>
                  )}
                </div>
                <div className="absolute bottom-6 text-sm text-slate-400">
                  Click to reveal answer
                </div>
              </>
            ) : (
              <>
                <div className="text-sm font-semibold text-green-400 mb-4 uppercase tracking-wide">
                  Answer
                </div>
                <p className="text-xl md:text-2xl text-center text-slate-50 leading-relaxed">
                  {question.answer}
                </p>
                <div className="absolute bottom-6 text-sm text-slate-400">
                  Click to see question
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
