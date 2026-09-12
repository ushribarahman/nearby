import { axiosInstance } from "../utils/axiosInstance";

// ==========================================
// EVENT / OFFER COVER IMAGE UPLOADS
//
// Keep these two values in sync with
// nearby-backend/middleware/coverImageUpload.middleware.js
// ==========================================

export const MAX_IMAGE_SIZE_MB = 1;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const uploadEventImage = async (file, token) => {
  const formData = new FormData();
  formData.set("image", file);

  const response = await axiosInstance.post(
    "/api/upload/event-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // { url, publicId }
};

const uploadOfferImage = async (file, token) => {
  const formData = new FormData();
  formData.set("image", file);

  const response = await axiosInstance.post(
    "/api/upload/offer-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // { url, publicId }
};

const deleteCoverImage = async (publicId, token) => {
  const response = await axiosInstance.delete("/api/upload/image", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { publicId },
  });

  return response.data;
};

const uploadService = {
  uploadEventImage,
  uploadOfferImage,
  deleteCoverImage,
};

export default uploadService;
