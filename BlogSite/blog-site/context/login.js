"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from cookies on component mount
  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        Cookies.remove('user'); // Remove corrupted cookie
      }
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Save to cookies for 7 days
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove('user'); // Remove from cookies
  }

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
