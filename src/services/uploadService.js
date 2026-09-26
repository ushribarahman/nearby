import apiRequest from "./api";

export const MAX_IMAGE_SIZE_MB = 5;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const RECOMMENDED_BANNER_RATIO = 16 / 9;
export const RECOMMENDED_BANNER_DIMENSIONS = "1200 × 675px";


const uploadEventImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return await apiRequest("/upload/event-image", {
    method: "POST",
    body: formData,
  });
};

const uploadOfferImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  return await apiRequest("/upload/offer-image", {
    method: "POST",
    body: formData,
  });
};

const deleteCoverImage = async (publicId) => {
  return await apiRequest("/upload/image", {
    method: "DELETE",
    body: JSON.stringify({ publicId }),
  });
};

const uploadService = {
  uploadEventImage,
  uploadOfferImage,
  deleteCoverImage,
};

export default uploadService;
