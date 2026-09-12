import { useRef } from "react";

// Mirrors cse2200's ImageUploadButton: a hidden file input triggered by a
// visible button. Single-file only (profile picture doesn't need `multiple`).
function ImageUploadButton({ setFile, className = "" }) {
  const inputRef = useRef(null);

  const onFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      setFile(files[0]);
    }

    // Reset so selecting the same file again still fires onChange
    event.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/jpeg,image/png,image/jpg,image/webp"
        onChange={onFileChange}
      />

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className={
          className ||
          "inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="mr-1.5 h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3 4.5h18M3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15"
          />
        </svg>
        Choose Photo
      </button>
    </>
  );
}

export default ImageUploadButton;
