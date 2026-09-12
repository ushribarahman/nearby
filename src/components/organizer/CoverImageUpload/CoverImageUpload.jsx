import { useRef, useState } from "react";
import { MAX_IMAGE_SIZE_MB, ALLOWED_IMAGE_TYPES } from "../../../services/uploadService";
import uploadService from "../../../services/uploadService";

// Reusable cover-image picker for both EventForm and OfferForm.
// Handles: client-side validation, the actual Cloudinary upload via
// the backend, a preview, and cleaning up the old image on replace.
//
// Props:
//   imageUrl   - current image URL (formData.image)
//   publicId   - current Cloudinary publicId (formData.imagePublicId)
//   onChange   - ({ url, publicId }) => void, called after a successful
//                upload or after a removal (url/publicId become "")
//   uploadType - "event" | "offer"
//   token      - Bearer token from useAuth().authToken
function CoverImageUpload({ imageUrl, publicId, onChange, uploadType, token }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const uploadFn =
    uploadType === "offer"
      ? uploadService.uploadOfferImage
      : uploadService.uploadEventImage;

  const validate = (file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return "Only JPEG, JPG, or PNG images are allowed.";
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      return `Image must be ${MAX_IMAGE_SIZE_MB}MB or smaller.`;
    }

    return "";
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later

    if (!file) return;

    const validationError = validate(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setUploading(true);

    const previousPublicId = publicId;

    try {
      const result = await uploadFn(file, token);

      onChange({ url: result.url, publicId: result.publicId });

      // Clean up the old cover image now that the new one is live.
      if (previousPublicId) {
        uploadService
          .deleteCoverImage(previousPublicId, token)
          .catch((err) =>
            console.error("Failed to clean up old cover image:", err)
          );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Couldn't upload the image. Try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    if (publicId) {
      uploadService
        .deleteCoverImage(publicId, token)
        .catch((err) =>
          console.error("Failed to delete cover image:", err)
        );
    }

    onChange({ url: "", publicId: "" });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileChange}
      />

      {imageUrl ? (
        <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-gray-200">
          <img
            src={imageUrl}
            alt="Cover"
            className="h-44 w-full object-cover"
          />

          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove image"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500 shadow ring-1 ring-gray-200 transition hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current.click()}
          className="flex h-44 w-full max-w-sm flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm font-medium text-gray-500 transition hover:bg-gray-100 disabled:opacity-60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 4.5h18M3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15"
            />
          </svg>
          {uploading ? "Uploading..." : "Click to upload cover image"}
        </button>
      )}

      <p className="mt-2 text-xs text-gray-400">
        JPEG, JPG, or PNG. Up to {MAX_IMAGE_SIZE_MB}MB.
      </p>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default CoverImageUpload;
