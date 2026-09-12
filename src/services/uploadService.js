import apiRequest from "./api";

// ==========================================
// EVENT / OFFER COVER IMAGE UPLOADS
//
// Keep these values in sync with
// nearby-backend/middleware/coverImageUpload.middleware.js
// ==========================================

export const MAX_IMAGE_SIZE_MB = 5;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// 16:9 is the recommended ratio for event/offer banners — it reads
// well both as a full-width hero image on the event page and as a
// cropped thumbnail in card/list views, and matches the aspect ratio
// most phone cameras and screenshot tools already default to.
export const RECOMMENDED_BANNER_RATIO = 16 / 9;
export const RECOMMENDED_BANNER_DIMENSIONS = "1200 × 675px";

// Same cookie-based auth as the rest of the app (apiRequest already
// sends credentials: "include") — no Bearer token needed.

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
