import { useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import EventsTable from "../../components/admin/EventsTable";
import EventReviewModal from "../../components/admin/EventReviewModal";
import initialEvents from "../../data/admin/events";

function Events() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(initialEvents);

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

  const updateStatus = (id, status) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id ? { ...event, status } : event
      )
    );

    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
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

        <EventsTable events={filteredEvents} onReview={setSelectedEvent} />
      </div>

      {selectedEvent && (
        <EventReviewModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onApprove={(id) => updateStatus(id, "Approved")}
          onReject={(id) => updateStatus(id, "Rejected")}
        />
      )}
    </div>
  );
}

export default Events;
