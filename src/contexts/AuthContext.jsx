import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/api/authAPI';
import apiClient from "@/api/apiClient.js";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Verify token by fetching user data
        const userData = await authAPI.getMe();
        setUser(userData);
        setToken(storedToken);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } catch (err) {
        localStorage.removeItem('token');
        setError('Session expired. Please login again.');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth().then();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const { token, user } = await authAPI.login(email, password);

      localStorage.setItem('token', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
      setToken(token);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      setError(authAPI.isAuthError(error)
        ? 'Invalid email or password'
        : 'Login failed. Please try again.'
      );
      throw error;
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const result = await authAPI.register(
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName,
        userData.role
      );

      if (result.token) {
        localStorage.setItem('token', result.token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
        setUser(result.user);
        setToken(result.token);
        navigate('/dashboard');
      }

      return result;
    } catch (error) {
      setError(
        authAPI.isDuplicateEmailError(error)
          ? 'Email already registered'
          : 'Registration failed'
      );
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } finally {
      localStorage.removeItem('token');
      delete apiClient.defaults.headers.common['Authorization'];
      setUser(null);
      setToken(null);
      navigate('/login');
    }
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError: () => setError(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}