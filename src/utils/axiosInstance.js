// No longer used. All requests in this app — including file uploads
// (profile picture, event/offer cover images) — now go through
// services/api.js's apiRequest, which uses fetch with
// credentials: "include" to send the httpOnly auth cookie. There's no
// Bearer token to attach, so a separate axios instance isn't needed.
//
// Kept as an empty stub instead of being deleted outright — feel free
// to delete this file (and the "axios" dependency in package.json, if
// nothing else uses it) from disk.
export const axiosInstance = null;
