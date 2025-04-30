'use client';

import { useApiTransition } from '@/hooks/useApiTransition';
import { UserProfileModel } from '@/models/user/UserProfileModel';
import { UserService } from '@/services/UserService';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
  login: () => void;
  userProfile?: UserProfileModel;
  userProfileLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const userService = new UserService();

  const [isTokenAvailable, setIsTokenAvailable] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [redirectPath, setRedirectPath] = useState<string>('/vendors');

  const { data: userProfile, isLoading: userProfileLoading, apiFetch } = useApiTransition<UserProfileModel>();

  useEffect(() => {
    // Check for token in localStorage on initial load
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsTokenAvailable(!!token);
  }, []);

  useEffect(() => {
    if (isAuthenticated && isTokenAvailable)
      apiFetch(async () => {
        return userService.getUserProfile();
      });
  }, [isAuthenticated, isTokenAvailable]);

  const login = () => {
    setIsAuthenticated(true);
    setIsTokenAvailable(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userProfile,
        userProfileLoading,
        login,
        redirectPath,
        setRedirectPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
