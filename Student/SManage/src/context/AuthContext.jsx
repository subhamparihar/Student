import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

// Create the authentication context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('authUser', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }

    return {
      success: false,
      error: 'Invalid email or password',
    };
  };

  // Register function (simplified for mock)
  const register = (email, name, password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      return {
        success: false,
        error: 'Passwords do not match',
      };
    }

    if (mockUsers.some((u) => u.email === email)) {
      return {
        success: false,
        error: 'Email already registered',
      };
    }

    const newUser = {
      id: String(mockUsers.length + 1),
      email,
      password,
      name,
      role: 'student',
    };

    mockUsers.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('authUser', JSON.stringify(userWithoutPassword));

    return { success: true, user: userWithoutPassword };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
