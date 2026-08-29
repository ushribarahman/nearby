import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Restore authentication when app starts
  // ==========================================

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

  // ==========================================
  // Login
  // ==========================================

  const login = async (credentials) => {
    const response = await authService.login(credentials);

    localStorage.setItem("token", response.token);

    setToken(response.token);
    setUser(response.user);

    return response;
  };

  // ==========================================
  // Register
  // ==========================================

  const register = async (userData) => {
    const response = await authService.register(userData);

    return response;
  };

  // ==========================================
  // Logout
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  // ==========================================
  // Authentication status
  // ==========================================

  const isAuthenticated = !!token;

  // ==========================================
  // Context value
  // ==========================================

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

// ==========================================
// Custom hook
// ==========================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}