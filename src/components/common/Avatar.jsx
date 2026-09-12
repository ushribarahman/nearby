import { useState } from "react";

export default function Avatar({ user, fallback = "U" }) {
  const src = user?.profilePicture?.url;
  const [failedSrc, setFailedSrc] = useState(null);
  const name = user?.organizationName || user?.name || "";
  return (
    <span className="flex h-full w-full shrink-0 items-center justify-center overflow-hidden rounded-full">
      {src && src !== failedSrc ? (
        <img src={src} alt={name ? `${name}'s profile` : "Profile"} className="h-full w-full rounded-full object-cover object-center" onError={() => setFailedSrc(src)} />
      ) : (name.trim().charAt(0).toUpperCase() || fallback)}
    </span>
  );
}
