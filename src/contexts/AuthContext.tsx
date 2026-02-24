import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '@/lib/api';
import type { AxiosError } from 'axios';

interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone?: string;
  avatar?: string;
  user_type: 'admin' | 'staff' | 'customer';
  company_name?: string;
  is_verified: boolean;
  preferred_language: 'fa' | 'en';
  created_at?: string;
  profile?: {
    bio?: string;
    address?: string;
    city?: string;
    country?: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone?: string;
  company_name?: string;
  password: string;
  password_confirm: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getApiErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<{ detail?: string; message?: string } | Record<string, string[]>>;
  const data = axiosError?.response?.data;
  if (!data) return fallback;

  if (typeof data === 'object' && 'detail' in data && typeof data.detail === 'string') {
    return data.detail;
  }
  if (typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
    return data.message;
  }

  if (typeof data === 'object') {
    const first = Object.values(data)[0];
    if (Array.isArray(first) && first.length > 0) {
      return String(first[0]);
    }
  }
  return fallback;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error: any) {
      console.error('Failed to refresh user:', error);
      if (error?.response?.status === 401) {
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            const refreshResponse = await authAPI.refresh(refreshToken);
            localStorage.setItem('access_token', refreshResponse.data.access);
            const profileResponse = await authAPI.getProfile();
            setUser(profileResponse.data);
            return;
          }
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { access, refresh } = response.data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Get user profile
      const profileResponse = await authAPI.getProfile();
      setUser(profileResponse.data);
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'Login failed'));
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await authAPI.register(data);
      // Auto login after registration
      await login(data.email, data.password);
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'Registration failed'));
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    window.location.href = '/';
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(data);
      setUser(response.data);
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'Update failed'));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isAdmin: user?.user_type === 'admin',
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
