import { useRef, useState } from "react";
import {
  MAX_IMAGE_SIZE_MB,
  ALLOWED_IMAGE_TYPES,
  RECOMMENDED_BANNER_RATIO,
  RECOMMENDED_BANNER_DIMENSIONS,
} from "../../../services/uploadService";
import uploadService from "../../../services/uploadService";

// Reusable cover-image picker for both EventForm/CreateEventPage and
// OfferForm. Handles: client-side validation, an aspect-ratio check
// (advisory, not blocking), the actual Cloudinary upload via the
// backend, a preview, and cleaning up the old image on replace.
//
// Auth is via the same httpOnly cookie as every other request in this
// app (uploadService/apiRequest already send credentials: "include")
// — no token prop needed here.
//
// Props:
//   imageUrl   - current image URL (formData.image)
//   publicId   - current Cloudinary publicId (formData.imagePublicId)
//   onChange   - ({ url, publicId }) => void, called after a successful
//                upload or after a removal (url/publicId become "")
//   uploadType - "event" | "offer"

// How far off 16:9 a chosen image can be before we bother warning
// about it. Wide enough that normal photos don't trigger a false
// alarm, tight enough to catch a portrait screenshot or a square crop.
const RATIO_TOLERANCE = 0.15;

function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Couldn't read the image."));
    };

    img.src = objectUrl;
  });
}

function CoverImageUpload({ imageUrl, publicId, onChange, uploadType, large = false }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [ratioWarning, setRatioWarning] = useState("");

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
      setRatioWarning("");
      return;
    }

    setError("");
    setRatioWarning("");

    // Advisory only — a slightly-off ratio still uploads fine, this
    // just helps the organizer notice before publishing.
    try {
      const { width, height } = await getImageDimensions(file);
      const ratio = width / height;
      const deviation =
        Math.abs(ratio - RECOMMENDED_BANNER_RATIO) / RECOMMENDED_BANNER_RATIO;

      if (deviation > RATIO_TOLERANCE) {
        setRatioWarning(
          `This image is ${width}×${height}, which isn't close to the recommended 16:9 ratio (${RECOMMENDED_BANNER_DIMENSIONS}). It'll still upload, but may get cropped oddly in some views.`
        );
      }
    } catch {
      // If we can't read dimensions for some reason, just skip the
      // advisory check rather than blocking the upload over it.
    }

    setUploading(true);

    const previousPublicId = publicId;

    try {
      const result = await uploadFn(file);

      onChange({ url: result.url, publicId: result.publicId });

      // Clean up the old cover image now that the new one is live.
      if (previousPublicId) {
        uploadService
          .deleteCoverImage(previousPublicId)
          .catch((err) =>
            console.error("Failed to clean up old cover image:", err)
          );
      }
    } catch (err) {
      setError(err.message || "Couldn't upload the image. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    if (publicId) {
      uploadService
        .deleteCoverImage(publicId)
        .catch((err) =>
          console.error("Failed to delete cover image:", err)
        );
    }

    setRatioWarning("");
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
        <div className={`relative w-full overflow-hidden rounded-xl border border-gray-200 ${large ? "" : "max-w-sm"}`}>
          <img
            src={imageUrl}
            alt="Cover"
            className={large ? "h-64 w-full object-cover sm:h-80 lg:h-96" : "aspect-video w-full object-cover"}
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
          className={`flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 font-medium text-gray-500 transition hover:border-teal-400 hover:bg-teal-50/50 disabled:opacity-60 ${large ? "h-64 text-lg sm:h-80 lg:h-96" : "aspect-video max-w-sm text-sm"}`}
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
          {uploading ? "Uploading..." : large ? "Click to add a banner" : "Click to upload cover image"}
        </button>
      )}

      <p className="mt-2 text-xs text-gray-400">
        JPEG, JPG, or PNG. Up to {MAX_IMAGE_SIZE_MB}MB.
        <br />
        Recommended: {RECOMMENDED_BANNER_DIMENSIONS} (16:9) for the best
        display.
      </p>

      {ratioWarning && (
        <p className="mt-1 text-xs text-amber-600">{ratioWarning}</p>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default CoverImageUpload;
