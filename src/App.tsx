import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/providers/AuthProvider";
import { QuizProvider } from "@/providers/QuizProvider";
import Router from "./router/Router";
import { ToastContainer } from 'react-toastify';



const App = () => (
  <TooltipProvider>
    <AuthProvider>
      <QuizProvider>
        <Sonner />
        <ToastContainer/>
        <Router />
      </QuizProvider>
    </AuthProvider>
  </TooltipProvider>
);

export default App;
