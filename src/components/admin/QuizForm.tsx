import { useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface QuizFormProps {
  onSuccess?: () => void;
}

const QuizForm = ({ onSuccess }: QuizFormProps) => {
  const { createQuiz } = useQuiz();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !category.trim() || !numOfQuestions) {
      toast.error('Please fill in all fields');
      return;
    }

    const numQuestions = parseInt(numOfQuestions);
    if (numQuestions <= 0) {
      toast.error('Number of questions must be greater than 0');
      return;
    }

    createQuiz({
      title: title.trim(),
      category: category.trim(),
      numOfQuestions: numQuestions,
    });

    toast.success('Quiz created successfully!');
    setTitle('');
    setCategory('');
    setNumOfQuestions('');
    onSuccess?.();
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg border-border/50">
      <CardHeader>
        <CardTitle>Create New Quiz</CardTitle>
        <CardDescription>Add a new quiz to your collection</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="transition-all duration-200 focus:shadow-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              placeholder="e.g., Science, Math, History"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="transition-all duration-200 focus:shadow-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numOfQuestions">Number of Questions</Label>
            <Input
              id="numOfQuestions"
              type="number"
              min="1"
              placeholder="Enter number of questions"
              value={numOfQuestions}
              onChange={(e) => setNumOfQuestions(e.target.value)}
              className="transition-all duration-200 focus:shadow-md"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200"
          >
            Create Quiz
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuizForm;
