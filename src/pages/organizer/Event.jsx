import OrganizerListFilters from "../../components/organizer/OrganizerListFilters";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useOrganizerEvents from "../../hooks/useOrganizerEvents";
import OrganizerEventList from "../../components/organizer/OrganizerEventList";

export default function Events() {
  const { events, loading, error } = useOrganizerEvents();
  const [search, setSearch] = useState("");
  const [params, setParams] = useSearchParams();
  const requested = params.get("status")?.toLowerCase() || "all";
  const status = ["pending", "approved", "rejected"].includes(requested) ? requested : "all";
  const query = search.trim().toLowerCase();
  const filtered = events.filter((event) =>
    (status === "all" || event.status.toLowerCase() === status) &&
    [event.title, event.location, event.category].some((value) => value?.toLowerCase().includes(query))
  );
  return <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><h1 className="text-3xl font-bold">My Events</h1><p className="mt-2 text-gray-500">Your submitted events and their current approval status.</p></div>
      <Link to="/organizer/events/new" className="rounded-lg bg-black px-5 py-3 text-white">+ Create Event</Link>
    </div>
    <OrganizerListFilters kind="events" search={search} onSearch={setSearch} status={status} onStatus={status=>setParams({status})} loading={loading} error={error} count={filtered.length} total={events.length}/>
    {loading ? <p role="status">Loading your events...</p> : error ? <p role="alert" className="text-red-600">{error}</p> : <OrganizerEventList events={filtered} emptyMessage={events.length === 0 ? "You have no events yet. Create your first event!" : "No events match your search or status filter."} />}
  </div>;
}
