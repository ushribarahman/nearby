import { useEffect, useState } from "react";
import eventService from "../services/eventService";

const toDisplayEvent = (event) => ({
  ...event,
  type: "event",
  date: /^\d{4}-\d{2}-\d{2}$/.test(event.date)
    ? new Date(event.date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : event.date,
  image: event.bannerImage?.url || "/event1.jpg",
  about: event.description,
  mapLink: event.locationLink,
  ticketPrice: event.tickets?.length ? Math.min(...event.tickets.map((ticket) => ticket.price)) : null,
});

export default function useEvents(id) {
  const [state, setState] = useState({ events: [], event: null, loading: true, error: "" });
  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const data = id ? await eventService.getEvent(id) : await eventService.getEvents();
        if (active) setState({ events: (data.events || []).map(toDisplayEvent), event: data.event ? toDisplayEvent(data.event) : null, loading: false, error: "" });
      } catch (error) {
        if (active) setState({ events: [], event: null, loading: false, error: error.message });
      }
    };
    refresh();
    window.addEventListener("focus", refresh);
    const timer = window.setInterval(refresh, 30000);
    return () => { active = false; window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, [id]);
  return state;
}
