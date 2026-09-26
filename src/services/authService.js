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


const getProfile = async () => {
  return await apiRequest("/auth/profile", {
    method: "GET",
  });
};

const updateProfile = async (profileData) => {
  return await apiRequest("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};

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
