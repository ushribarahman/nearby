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

// Text-only profile fields. Called by both the regular user and
// organizer profile pages. Note: email is never accepted here — the
// backend silently ignores it even if sent.
const updateProfile = async (profileData) => {
  return await apiRequest("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};

// Profile picture upload/removal — same cookie-based auth as every
// other request here (apiRequest already sends credentials: "include").
// No separate Bearer token needed; that was a leftover from a
// different auth approach that never matched how this app's backend
// actually authenticates requests.
const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("profilePicture", file);

  return await apiRequest("/auth/profile-picture", {
    method: "POST",
    body: formData,
  });
};

const deleteProfilePicture = async () => {
  return await apiRequest("/auth/profile-picture", {
    method: "DELETE",
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
  uploadProfilePicture,
  deleteProfilePicture,
  changePassword,
  logout,
};

export default authService;
