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

// Text-only profile fields for now (no image upload yet). Called by both
// the regular user and organizer profile pages. Note: email is never
// accepted here — the backend silently ignores it even if sent.
const updateProfile = async (profileData) => {
  return await apiRequest("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};

// Separate from updateProfile since it requires proving identity with
// the current password first.
const changePassword = async (currentPassword, newPassword) => {
  return await apiRequest("/auth/password", {
    method: "PUT",
    body: JSON.stringify({ currentPassword, newPassword }),
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
  updateProfile,
  changePassword,
  logout,
};

export default authService;
