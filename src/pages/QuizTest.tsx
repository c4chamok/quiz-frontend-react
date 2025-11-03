import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuiz, type Quiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '@/config';
import quizIllustration from '@/assets/quiz-illustration.jpg';
import { cn } from '@/lib/utils';


const QuizTest = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuizById } = useQuiz();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewedAnswers, setReviewedAnswers] = useState
    <{ id: number, response: string, correctAnswer: string, check: string }[]>();


  useEffect(() => {
    if (!id) return;
    const fetchQuizAndQuestions = async () => {
      const quiz = await getQuizById(parseInt(id || '0'));
      setQuiz(quiz);
    }
    fetchQuizAndQuestions();
  }, [getQuizById, id])

  const questions = quiz?.questions;

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-muted-foreground mb-4">Quiz not found</p>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions == null || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-muted-foreground mb-4">No questions available for this quiz</p>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error('Please answer all questions before submitting', { autoClose: 2000 , position: 'top-center' });
      return;
    }
    const submissionReq = Object.keys(answers).map((id) => {
      return { id, response: answers[parseInt(id)] }
    })

    const { data } = await axios.post<{
      totall_Right_Answer: number,
      user_Responses: { id: number, response: string, correctAnswer: string, check: string }[]
    }>
      (`${BASE_URL}/quiz/submit/${quiz.id}`, submissionReq);

    console.log(data);
    setSubmitted(true);
    setReviewedAnswers(data.user_Responses);
    setScore(data.totall_Right_Answer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    const percentage = (score / questions.length) * 100;
    console.log("percentagwe : " + percentage, score, questions.length);

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <Card className="shadow-lg border-border/50 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <CardHeader className="text-center">
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${percentage >= 70 ? 'bg-green-300/80' : percentage >= 50 ? 'bg-yellow-500/80' : 'bg-red-400/80'
                }`}>
                <span className="text-4xl font-bold text-white">{score}/{questions.length}</span>
              </div>
              <CardTitle className="text-3xl">Quiz Results</CardTitle>
              <CardDescription className="text-lg">
                You scored {percentage.toFixed(0)}%
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-4">Answer Review</h3>
            {questions.map((question, index) => {
              //dfsdgdh
              const userAnswer = reviewedAnswers?.find(ans => ans.id === question.id);
              const isCorrect = userAnswer?.check === 'correct answer';

              return (
                <Card
                  key={question.id}
                  className={`shadow-md border-2 ${isCorrect ? 'border-green-400/50 bg-green-200/15' : 'border-red-400/50 bg-red-200/15'
                    } animate-in fade-in slide-in-from-bottom-4`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                        <CardDescription className="text-base mt-2">{question.questionTitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="p-3 bg-background rounded-lg border border-border/50">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Your answer:</p>
                      <p className={`font-medium ${isCorrect ? 'text-green-400/80' : 'text-red-400/80'}`}>
                        {userAnswer?.response}
                      </p>
                    </div>
                    {!isCorrect && (
                      <div className="p-3 bg-success/10 rounded-lg border border-success/30">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Correct answer:</p>
                        <p className="font-medium text-green-400/80">{userAnswer?.correctAnswer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="outline"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <Card className="shadow-lg border-border/50 mb-8 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="relative h-40 bg-gradient-secondary">
            <img 
              src={quizIllustration} 
              alt="Quiz questions" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <CardTitle className="text-3xl text-white drop-shadow-lg">{quiz.title}</CardTitle>
              <CardDescription className="text-lg text-white/90 drop-shadow-md mt-2">
                {quiz.category} • {questions.length} questions
              </CardDescription>
            </div>
          </div>
        </Card>

        <div className="space-y-6 mb-8">
          {questions.map((question, index) => (
            <Card
              key={question.id}
              className="shadow-md border-border/50 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                <CardDescription className="text-base mt-2">{question.questionTitle}</CardDescription>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-500 rounded">
                    {question.difficultyLevel}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[question.id] || ''}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="space-y-3">
                    {[question.option1, question.option2, question.option3, question.option4].map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={cn(`flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-all duration-200 cursor-pointer`, answers[question.id] === option ? 'bg-primary/15 border-primary/50' : '')}
                      >
                        <RadioGroupItem value={option} id={`q${question.id}-opt${optIndex}`} />
                        <Label
                          htmlFor={`q${question.id}-opt${optIndex}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="sticky bottom-6 flex justify-center">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 shadow-lg transition-all duration-200 text-lg px-8"
          >
            Submit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizTest;
