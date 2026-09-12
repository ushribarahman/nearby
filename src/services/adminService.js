import apiRequest from "./api";

// All of these are admin-only on the backend (authMiddleware +
// requireAdmin) — this file just wraps the fetch calls for the admin
// pages, same pattern as authService.js.

const getUsers = async () => {
  return await apiRequest("/admin/users", {
    method: "GET",
  });
};

const getOrganizers = async () => {
  return await apiRequest("/admin/organizers", {
    method: "GET",
  });
};

const getStats = async () => {
  return await apiRequest("/admin/stats", {
    method: "GET",
  });
};

const updateUserStatus = async (id, status) => {
  return await apiRequest(`/admin/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

const updateOrganizerStatus = async (id, status) => {
  return await apiRequest(`/admin/organizers/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

const adminService = {
  getEvents: () => apiRequest("/admin/events"),
  updateEventStatus: (id, status) => apiRequest(`/admin/events/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }),
  getUsers,
  getOrganizers,
  getStats,
  updateUserStatus,
  updateOrganizerStatus,
};

export default adminService;
