import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import EventsTable from "../../components/admin/EventsTable";
import EventReviewModal from "../../components/admin/EventReviewModal";
import adminService from "../../services/adminService";

const displayEvent = (event) => ({ ...event, organizer: event.organizer?.name || "Unknown organizer" });

function Events() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    adminService.getEvents().then(({ events }) => {
      if (active) setEvents(events.map(displayEvent));
    }).catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.organizer.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || event.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [events, search, filter]);

  const updateStatus = async (id, status) => {
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      const { event } = await adminService.updateEventStatus(id, status);
      setEvents((current) => current.map((item) => item.id === id ? displayEvent(event) : item));
      setSelectedEvent(null);
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="px-8 py-10">
      <AdminPageHeader
        title="Events"
        description="Review, approve and manage submitted events."
        right={
          <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
            {events.length} total events
          </div>
        }
      />

      <SearchFilterBar
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search events..."
        filters={["All", "Pending", "Approved", "Rejected"]}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      {error && <p role="alert" className="mb-4 text-red-600">{error}</p>}
      {loading ? <p>Loading events...</p> : <EventsTable events={filteredEvents} onReview={setSelectedEvent} />}

      {selectedEvent && (
        <EventReviewModal
          event={selectedEvent}
          saving={saving}
          error={error}
          onClose={() => setSelectedEvent(null)}
          onApprove={(id) => updateStatus(id, "Approved")}
          onReject={(id) => updateStatus(id, "Rejected")}
        />
      )}
    </div>
  );
}

export default Events;
