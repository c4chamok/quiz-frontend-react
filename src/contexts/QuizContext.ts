import { createContext, useContext } from 'react';

export interface Quiz {
  id: number;
  title: string;
  category: string;
  numOfQuestions: number;
  questions: Question[];
}

export interface Question {
  id: number;
  quizId: number;
  category: string;
  difficultyLevel: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  questionTitle: string;
  rightAnswer: string;
}

export interface QuizContextType {
  quizzes: Quiz[];
  questions: Question[];
  createQuiz: (quiz: Omit<Quiz, 'id' | 'questions'>) => Promise<number | null>;
  addQuestion: (question: Omit<Question, 'id' | 'quizId'>) => Promise<string | null>;
  shuffleQuestions: () => Promise<void>;
  getQuizById: (id: number) => Promise<Quiz | null>;
  // deleteQuiz: (id: number) => Promise<void>;
  // deleteQuestion: (id: number) => Promise<void>;
}

export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }

    return context;
};
