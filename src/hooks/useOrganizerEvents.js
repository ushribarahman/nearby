import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import eventService from "../services/eventService";

export default function useOrganizerEvents() {
  const { user } = useAuth();
  const owner = user?.id || user?._id || user?.email;
  const [state, setState] = useState({ owner: null, events: [], loading: true, error: "" });
  useEffect(() => {
    if (!owner) return;
    let active = true;
    let pending = false;
    const refresh = async () => {
      if (pending) return;
      pending = true;
      try {
        const { events } = await eventService.getMyEvents();
        if (active) setState({ owner, events, loading: false, error: "" });
      } catch (error) {
        if (active) setState({ owner, events: [], loading: false, error: error.message });
      } finally { pending = false; }
    };
    refresh();
    window.addEventListener("focus", refresh);
    const timer = window.setInterval(refresh, 30000);
    return () => { active = false; window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, [owner]);
  return state.owner === owner ? state : { events: [], loading: true, error: "" };
}
