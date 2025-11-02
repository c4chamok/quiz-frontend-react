import { useQuiz } from '@/contexts/QuizContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, FileText, Tag, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const QuizList = () => {
  const { quizzes, questions } = useQuiz();

  const handleDelete = (id: number, title: string) => {
    // if (window.confirm(`Are you sure you want to delete "${title}"? This will also delete all associated questions.`)) {
      // deleteQuiz(id);
      console.log(id, title);
      toast.success('Quiz deleted successfully');
    // }
  };

  if (quizzes.length === 0) {
    return (
      <Card className="shadow-md border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">No quizzes created yet</p>
          <p className="text-sm text-muted-foreground">Create your first quiz to get started</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">All Quizzes</h3>
        <p className="text-sm text-muted-foreground">
          Total: {quizzes.length} quizzes, {questions.length} questions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz, index) => {
          return (
            <Card 
              key={quiz.id} 
              className="shadow-md border-border/50 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                    <BookOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(quiz.id, quiz.title)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {quiz.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span> {quiz.numOfQuestions} questions</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuizList;
