import apiRequest from "./api";

const register = async (userData) => {
  return await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

const login = async (credentials) => {
  return await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

// The JWT lives in an httpOnly cookie now, so the browser attaches it
// automatically (via credentials: "include" in apiRequest) — no token
// argument needed here anymore.
const getProfile = async () => {
  return await apiRequest("/auth/profile", {
    method: "GET",
  });
};

const logout = async () => {
  return await apiRequest("/auth/logout", {
    method: "POST",
  });
};

const authService = {
  register,
  login,
  getProfile,
  logout,
};

export default authService;
