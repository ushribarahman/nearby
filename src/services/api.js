const API_BASE_URL = "http://localhost:5000/api";

const apiRequest = async (endpoint, options = {}) => {
  // For FormData bodies (file uploads), the browser must set its own
  // Content-Type with the multipart boundary — setting it manually
  // here would break the upload, since the server couldn't tell where
  // one field ends and the next begins.
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    // Send the httpOnly auth cookie set by the backend on every request
    // instead of attaching a JWT from localStorage as a Bearer header.
    credentials: "include",
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export default apiRequest;
