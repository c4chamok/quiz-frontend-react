import { useAuth } from "@/contexts/AuthContext";
import type React from "react";
import { Navigate, Outlet } from "react-router";

const AuthenticaedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, userLoading } = useAuth();

    if (userLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default AuthenticaedRoute;