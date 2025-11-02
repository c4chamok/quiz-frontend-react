import { BrowserRouter, Routes, Navigate, Route } from 'react-router';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import QuizTest from '@/pages/QuizTest';
import AuthenticaedRoute from './AuthenticaedRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<AuthenticaedRoute><Dashboard /></AuthenticaedRoute>} />
                <Route path="/quiz/:id" element={<AuthenticaedRoute><QuizTest /></AuthenticaedRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;