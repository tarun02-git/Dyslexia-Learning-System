import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';
import { auth as authApi } from '../api/client';

interface AuthContextType {
  authState: AuthState;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserPreferences: (preferredTopics: string[], difficultyLevel: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    status: 'unauthenticated',
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState(prev => ({ ...prev, token, status: 'loading' }));
      authApi.getProfile()
        .then(data => {
          setAuthState({
            user: data,
            status: 'authenticated',
            token,
          });
        })
        .catch(() => {
          localStorage.removeItem('token');
          setAuthState({
            user: null,
            status: 'unauthenticated',
            token: null,
          });
        });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setAuthState({ ...authState, status: 'loading' });
      const { token } = await authApi.login(username, password);
      localStorage.setItem('token', token);
      
      const profile = await authApi.getProfile();
      
      setAuthState({
        user: profile,
        status: 'authenticated',
        token,
      });
    } catch (error) {
      console.error('Login failed:', error);
      setAuthState({
        user: null,
        status: 'unauthenticated',
        token: null,
      });
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      setAuthState({ ...authState, status: 'loading' });
      const { user_id } = await authApi.register(username, password);
      const { token } = await authApi.login(username, password);
      
      localStorage.setItem('token', token);
      
      const profile = await authApi.getProfile();
      
      setAuthState({
        user: profile,
        status: 'authenticated',
        token,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      setAuthState({
        user: null,
        status: 'unauthenticated',
        token: null,
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      status: 'unauthenticated',
      token: null,
    });
  };

  const updateUserPreferences = async (preferredTopics: string[], difficultyLevel: string) => {
    if (!authState.user) return;
    
    try {
      await authApi.updateProfile({
        preferred_topics: preferredTopics,
        difficulty_level: difficultyLevel,
      });
      
      const updatedProfile = await authApi.getProfile();
      
      setAuthState(prev => ({
        ...prev,
        user: updatedProfile,
      }));
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        register,
        logout,
        updateUserPreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};