import apiRequest from "./api";
import { axiosInstance } from "../utils/axiosInstance";

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

// Profile picture upload/delete go through axiosInstance (not apiRequest)
// because they need multipart/form-data, same as cse2200's productController
// upload flow. The backend's authMiddleware expects a Bearer token, so it's
// passed in explicitly here rather than relying on the cookie.
const uploadProfilePicture = async (file, token) => {
  const formData = new FormData();
  formData.set("profilePicture", file);

  const response = await axiosInstance.post(
    "/api/auth/profile-picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const deleteProfilePicture = async (token) => {
  const response = await axiosInstance.delete("/api/auth/profile-picture", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const authService = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  uploadProfilePicture,
  deleteProfilePicture,
};

export default authService;
