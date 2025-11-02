import { useQuiz } from '@/contexts/QuizContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

const QuestionList = () => {
  const { questions } = useQuiz();

  const handleDelete = (id: number, questionTitle: string) => {
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
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">All Questions</h3>
        <p className="text-sm text-muted-foreground">
          Total: {questions.length} questions
        </p>
      </div>

      <Card className="shadow-md border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Question Bank
          </CardTitle>
          <CardDescription>Manage all questions across all quizzes</CardDescription>
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
                              :"destructive"
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
                          onClick={() => handleDelete(question.id, question.questionTitle)}
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
