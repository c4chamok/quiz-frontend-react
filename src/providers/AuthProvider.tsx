import React, { useState, useEffect } from 'react';
import { AuthContext, type User } from '../contexts/AuthContext';

const VALID_CREDENTIALS = [
  { username: 'admin', password: '1234', role: 'admin' as const },
  { username: 'student1', password: '1234', role: 'student' as const },
  { username: 'student2', password: '1234', role: 'student' as const },
  { username: 'student3', password: '1234', role: 'student' as const },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('quizAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUserLoading(false);
    }
    setUserLoading(false)
  }, []);

  const login = (username: string, password: string): boolean => {
    const normalizedUsername = username.toLowerCase().trim();
    const credential = VALID_CREDENTIALS.find(
      (cred) => cred.username.toLowerCase() === normalizedUsername && cred.password === password
    );

    if (credential) {
      const userData = { username: credential.username, role: credential.role };
      setUser(userData);
      localStorage.setItem('quizAppUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizAppUser');
  };

  return (
    <AuthContext.Provider value={{ user, userLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};