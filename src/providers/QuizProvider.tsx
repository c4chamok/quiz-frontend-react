import { useEffect, useState } from 'react';
import { QuizContext, type Question, type Quiz } from '../contexts/QuizContext';
import axios from 'axios';
import { BASE_URL } from '@/config';

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuizAndQuestions = async () => {
    const [quizList, questionlist] = await Promise.all([
      axios.get<Quiz[]>(`${BASE_URL}/quiz/allQuizzes`),
      axios.get<Question[]>(`${BASE_URL}/question/allQuestions`)
    ]);
    setQuizzes(quizList.data);
    setQuestions(questionlist.data);
  }
  useEffect(()=>{
    fetchQuizAndQuestions();
  }, [])

  const shuffleQuestions = async () => {
    const { data } = await axios.get<Question[]>(`${BASE_URL}/question/questions/shuffle`);
    setQuestions(data);
  }

  const createQuiz = async (quiz: Omit<Quiz, 'id' | 'questions'>) => {
    try {
      const { data } = await axios.post<number>(
        `${BASE_URL}/quiz/create?category=${quiz.category}&numQ=${quiz.numOfQuestions}&title=${quiz.title}`);
        fetchQuizAndQuestions();
        return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating quiz:', error.response?.data || error.message);
      }
      return null;
    }

  };

  const addQuestion = async (question: Omit<Question, 'id' | 'quizId'>) => {
    try {      
      const { data } = await axios.post<string>(`${BASE_URL}/question/add`, question);
      fetchQuizAndQuestions();
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating Question:', error.response?.data || error.message);
      }
      return null;
    }
  };

  const getQuizById = async (id: number) => {
    const { data } = await axios.get<Quiz | null>(`${BASE_URL}/quiz/${id}`);
    return data; 
  };

  // const deleteQuiz = (id: number) => {
  //   setQuizzes(quizzes.filter(quiz => quiz.id !== id));
  //   setQuestions(questions.filter(question => question.quizId !== id));
  // };

  // const deleteQuestion = (id: number) => {
  //   setQuestions(questions.filter(question => question.id !== id));
  // };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        questions,
        shuffleQuestions,
        createQuiz,
        addQuestion,
        getQuizById,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};