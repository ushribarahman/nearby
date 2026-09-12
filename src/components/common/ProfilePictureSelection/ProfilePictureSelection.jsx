import ImageUploadButton from "../ImageUploadButton/ImageUploadButton";
import { useEffect, useState } from "react";

// Mirrors cse2200's ProductCoverPhotoSelection: shows a preview (either the
// newly picked file, or the existing Cloudinary URL) with a way to clear it,
// otherwise shows the picker button.
function ProfilePictureSelection({
  file,
  setFile,
  existingUrl = null,
  error = null,
}) {
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview({ file, url: reader.result });
    reader.readAsDataURL(file);
    return () => { reader.onload = null; if (reader.readyState === 1) reader.abort(); };
  }, [file]);
  const previewSrc = file ? (preview?.file === file ? preview.url : null) : existingUrl;

  return (
    <div>
      <div className="flex items-center gap-5">
        {previewSrc ? (
          <div className="relative">
            <img
              src={previewSrc}
              alt="Profile"
              className="h-20 w-20 rounded-full border border-gray-200 object-cover"
            />

            {/* Only allow clearing a newly picked (not-yet-uploaded) file
                here — removing the saved picture is a separate action. */}
            {file && (
              <button
                type="button"
                onClick={() => setFile(null)}
                aria-label="Clear selected photo"
                className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-500 shadow ring-1 ring-gray-200 transition hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-100 text-2xl font-semibold text-gray-400">
            ?
          </div>
        )}

        <ImageUploadButton setFile={setFile} />
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default ProfilePictureSelection;
