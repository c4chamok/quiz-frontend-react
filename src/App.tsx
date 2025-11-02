import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/providers/AuthProvider";
import { QuizProvider } from "@/providers/QuizProvider";
import Router from "./router/Router";



const App = () => (
  <TooltipProvider>
    <AuthProvider>
      <QuizProvider>
        <Sonner />
        <Router />
      </QuizProvider>
    </AuthProvider>
  </TooltipProvider>
);

export default App;
