import { useQuiz } from '@/contexts/QuizContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, HelpCircle, Shuffle } from 'lucide-react';
import { toast } from 'sonner';
import questionsIllustration from '@/assets/questions-illustration.jpg';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const QuestionList = () => {
  const { questions, shuffleQuestions } = useQuiz();

  const handleDelete = ( questionTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${questionTitle}"?`)) {
      // deleteQuestion(id);
      toast.success('Question deleted successfully');
    }
  };

  if (questions.length === 0) {
    return (
      <Card className="shadow-md border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <HelpCircle className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">No questions created yet</p>
          <p className="text-sm text-muted-foreground">Add questions to your quizzes to get started</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg">
        <div className="absolute inset-0 bg-gradient-secondary opacity-80"></div>
        <img
          src={questionsIllustration}
          alt="Question bank illustration"
          className="w-full h-48 object-cover opacity-30"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">All Questions</h3>
          <p className="text-white drop-shadow-md">
            Total: {questions.length} questions in your question bank
          </p>
        </div>
      </div>

      <Card className="shadow-md border-border/50">
        <CardHeader className='w-full flex justify-between'>
          <div>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Question Bank
            </CardTitle>
            <CardDescription>Manage all questions across all quizzes</CardDescription>
          </div>
          <div>
            <Button variant='default' onClick={async ()=> await shuffleQuestions()}>
              <Tooltip>
                <TooltipTrigger><Shuffle/></TooltipTrigger>
                <TooltipContent>
                  <p>Shuffle</p>
                </TooltipContent>
              </Tooltip>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  {/* <TableHead>Quiz</TableHead> */}
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Correct Answer</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => {
                  return (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium max-w-md">
                        {question.questionTitle}
                      </TableCell>
                      {/* <TableCell>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          {quiz?.title || 'Unknown Quiz'}
                        </div>
                      </TableCell> */}
                      <TableCell>
                        <Badge variant="outline">{question.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            question.difficultyLevel === 'easy'
                              ? 'default'
                              : question.difficultyLevel === 'medium'
                                ? 'secondary'
                                : "destructive"
                          }
                        >
                          {question.difficultyLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{question.rightAnswer}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(question.questionTitle)}
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionList;
