import { useState, useCallback, useEffect } from 'react';
import { User } from '../types';
import api from '../services/api';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const login = useCallback(async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      // Replace with your actual login endpoint
      const response = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setState({ user, loading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Invalid credentials',
      }));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setState({ user: null, loading: false, error: null });
  }, []);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setState({ user: null, loading: false, error: null });
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setState({ user: response.data as User, loading: false, error: null });
      } catch (error) {
        localStorage.removeItem('token');
        setState({ user: null, loading: false, error: null });
      }
    };

    checkAuth();
  }, []);

  return {
    ...state,
    login,
    logout,
  };
};