import { createContext, useContext } from 'react';

export interface User {
  username: string;
  role: 'admin' | 'student';
}

export interface AuthContextType {
  user: User | null;
  userLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
