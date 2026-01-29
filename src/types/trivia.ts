/**
 * Represents a single trivia question with its answer
 */
export interface TriviaQuestion {
  id: string;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * Collection of trivia questions
 */
export interface TriviaData {
  title: string;
  description: string;
  questions: TriviaQuestion[];
}
