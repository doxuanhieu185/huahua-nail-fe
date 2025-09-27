import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const checkAuth = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/auth/check_token/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Auth check success:", data);
        setIsLoggedIn(true);
      } else {
        console.log("Auth check failed, logging out...");
        setIsLoggedIn(false);
        localStorage.removeItem("access_token");
      }
    } catch (error) {
      console.error("Error checking token:", error);
      setIsLoggedIn(false);
    }
  };

  const login = (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }
    setIsLoggedIn(true);
  };



  const logout = async () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (accessToken) {
      try {
        await axios.post(
          `${API_URL}/api/auth/logout/`,
          {refresh: refreshToken},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Logout API error:", error);
      }
    }
  
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);