import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuiz } from '@/contexts/QuizContext';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, LogOut, Search, FileText, Tag } from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { quizzes } = useQuiz();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [questionsFilter, setQuestionsFilter] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(quizzes.map(q => q.category)));
    return cats;
  }, [quizzes]);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || quiz.category === categoryFilter;
      const matchesQuestions = questionsFilter === 'all' ||
        (questionsFilter === '5' && quiz.numOfQuestions <= 5) ||
        (questionsFilter === '10' && quiz.numOfQuestions <= 10) ||
        (questionsFilter === '15' && quiz.numOfQuestions > 10);

      return matchesSearch && matchesCategory && matchesQuestions;
    });
  }, [quizzes, searchQuery, categoryFilter, questionsFilter]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const startQuiz = (quizId: number) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="bg-card border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">QuizMaster</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.username}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <h2 className="text-3xl font-bold text-foreground mb-2">Available Quizzes</h2>
          <p className="text-muted-foreground">Choose a quiz to test your knowledge</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-all duration-200 focus:shadow-md"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="transition-all duration-200 focus:shadow-md">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={questionsFilter} onValueChange={setQuestionsFilter}>
            <SelectTrigger className="transition-all duration-200 focus:shadow-md">
              <SelectValue placeholder="Filter by questions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Lengths</SelectItem>
              <SelectItem value="5">Up to 5 questions</SelectItem>
              <SelectItem value="10">Up to 10 questions</SelectItem>
              <SelectItem value="15">More than 10 questions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredQuizzes.length === 0 ? (
          <Card className="shadow-md border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No quizzes found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz, index) => (
              <Card
                key={quiz.id}
                className="shadow-md border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{quiz.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {quiz.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{quiz.numOfQuestions} questions</span>
                  </div>
                  <Button
                    onClick={() => startQuiz(quiz.id)}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200"
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
