import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //restore auth
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setLoading(false);
      return;
    }

    const restoreUser = async () => {
      try {
        const response = await authService.getProfile(savedToken);

        setToken(savedToken);
        setUser(response.user);
      } catch (error) {
        console.error("Failed to restore authentication:", error);

        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  //login
  const login = async (credentials) => {
    const response = await authService.login(credentials);

    localStorage.setItem("token", response.token);

    setToken(response.token);
    setUser(response.user);

    return response;
  };

  //register
  const register = async (userData) => {
    const response = await authService.register(userData);

    return response;
  };

  //logout
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  //auth status
  const isAuthenticated = !!token;

  //context
  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}