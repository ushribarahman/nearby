import apiRequest from "./api";

// Organizer-only endpoints — the backend enforces this via
// authMiddleware + requireOrganizer regardless of what the frontend
// does, but only organizers ever see the UI that calls these.

const createEvent = async (eventData) => {
  return await apiRequest("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
};

const getMyEvents = async () => {
  return await apiRequest("/events/mine", {
    method: "GET",
  });
};

const eventService = {
  getEvents: () => apiRequest("/events"),
  getEvent: (id) => apiRequest(`/events/${encodeURIComponent(id)}`),
  createEvent,
  getMyEvents,
};

export default eventService;
