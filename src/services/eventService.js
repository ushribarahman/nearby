import apiRequest from "./api";

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
