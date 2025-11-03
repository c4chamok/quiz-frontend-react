import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, LogOut } from 'lucide-react';
import QuizForm from '@/components/admin/QuizForm';
import QuestionForm from '@/components/admin/QuestionForm';
import QuizList from '@/components/admin/QuizList';
import QuestionList from '../admin/QuestionList';
import adminHero from '@/assets/admin-hero.jpg';
import { cn } from '@/lib/utils';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('quizzes');

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              <h1 className="text-xl font-bold text-foreground">QuizMaster Admin</h1>
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
        <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
          <img
            src={adminHero}
            alt="Admin managing quizzes"
            className="w-full h-56 object-cover opacity-30"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Quiz Management</h2>
            <p className="text-white text-lg drop-shadow-md">Create, organize, and manage all your quizzes and questions</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4 bg-muted/50">
            <TabsTrigger value="quizzes" className={cn("data-[state=active]:text-primary-foreground", activeTab ==='quizzes' ? "bg-gradient-primary" : "")}>
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="questions" className={cn("data-[state=active]:text-primary-foreground", activeTab ==='questions' ? "bg-gradient-primary" : "")}>
              All Questions
            </TabsTrigger>
            <TabsTrigger value="create-quiz" className={cn("data-[state=active]:text-primary-foreground", activeTab ==='create-quiz' ? "bg-gradient-primary" : "")}>
              Create Quiz
            </TabsTrigger>
            <TabsTrigger value="add-question" className={cn("data-[state=active]:text-primary-foreground", activeTab ==='add-question' ? "bg-gradient-primary" : "")}>
              Add Question
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quizzes" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <QuizList />
          </TabsContent>

          <TabsContent value="questions" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <QuestionList />
          </TabsContent>

          <TabsContent value="create-quiz" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <QuizForm onSuccess={() => setActiveTab('quizzes')} />
          </TabsContent>

          <TabsContent value="add-question" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <QuestionForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
