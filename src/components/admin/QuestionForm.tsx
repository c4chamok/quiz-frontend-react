import { useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const QuestionForm = () => {
  const { addQuestion } = useQuiz();
  const [category, setCategory] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [rightAnswer, setRightAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if ( !category.trim() || !difficultyLevel || !questionTitle.trim() ||
        !option1.trim() || !option2.trim() || !option3.trim() || !option4.trim() || !rightAnswer) {
      toast.error('Please fill in all fields');
      return;
    }

    const options = [option1, option2, option3, option4];
    if (!options.includes(rightAnswer)) {
      toast.error('Right answer must match one of the options exactly');
      return;
    }

    addQuestion({
      category: category.trim(),
      difficultyLevel,
      questionTitle: questionTitle.trim(),
      option1: option1.trim(),
      option2: option2.trim(),
      option3: option3.trim(),
      option4: option4.trim(),
      rightAnswer: rightAnswer.trim(),
    });

    toast.success('Question added successfully!');
    setCategory('');
    setDifficultyLevel('');
    setQuestionTitle('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setRightAnswer('');
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-lg border-border/50">
      <CardHeader>
        <CardTitle>Add Question</CardTitle>
        <CardDescription>Add a new question to an existing quiz</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {/* <Label htmlFor="quizId">Select Quiz</Label> */}
            {/* <Select value={quizId} onValueChange={setQuizId}>
              <SelectTrigger className="transition-all duration-200 focus:shadow-md">
                <SelectValue placeholder="Choose a quiz" />
              </SelectTrigger>
              <SelectContent>
                {quizzes.map(quiz => (
                  <SelectItem key={quiz.id} value={quiz.id.toString()}>
                    {quiz.title} ({quiz.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              placeholder="Question category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="transition-all duration-200 focus:shadow-md"
            />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="difficultyLevel">Difficulty Level</Label>
            <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
              <SelectTrigger className="transition-all duration-200 focus:shadow-md">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent align='start' className='w-full z-50 bg-white'>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="questionTitle">Question</Label>
            <Textarea
              id="questionTitle"
              placeholder="Enter your question"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className="min-h-[80px] transition-all duration-200 focus:shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="option1">Option 1</Label>
              <Input
                id="option1"
                type="text"
                placeholder="First option"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="transition-all duration-200 focus:shadow-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="option2">Option 2</Label>
              <Input
                id="option2"
                type="text"
                placeholder="Second option"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="transition-all duration-200 focus:shadow-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="option3">Option 3</Label>
              <Input
                id="option3"
                type="text"
                placeholder="Third option"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                className="transition-all duration-200 focus:shadow-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="option4">Option 4</Label>
              <Input
                id="option4"
                type="text"
                placeholder="Fourth option"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                className="transition-all duration-200 focus:shadow-md"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rightAnswer">Correct Answer</Label>
            <Input
              id="rightAnswer"
              type="text"
              placeholder="Enter the correct answer (must match one option exactly)"
              value={rightAnswer}
              onChange={(e) => setRightAnswer(e.target.value)}
              className="transition-all duration-200 focus:shadow-md"
            />
            <p className="text-xs text-muted-foreground">Must match one of the options exactly</p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200"
          >
            Add Question
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
