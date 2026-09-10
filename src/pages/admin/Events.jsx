import { useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import EventsTable from "../../components/admin/EventsTable";
import EventReviewModal from "../../components/admin/EventReviewModal";

const initialEvents = [
  {
    id: 1,
    title: "Dhaka Art Festival",
    organizer: "Dhaka Art Club",
    category: "Art",
    date: "Aug 30, 2026",
    location: "Dhanmondi, Dhaka",
    status: "Pending",
  },
  {
    id: 2,
    title: "Food & Culture Fest",
    organizer: "Taste Bangladesh",
    category: "Food",
    date: "Sep 02, 2026",
    location: "Gulshan, Dhaka",
    status: "Approved",
  },
  {
    id: 3,
    title: "Tech Meetup 2026",
    organizer: "Tech Community BD",
    category: "Technology",
    date: "Sep 05, 2026",
    location: "Banani, Dhaka",
    status: "Pending",
  },
  {
    id: 4,
    title: "Night Music Festival",
    organizer: "Live Nation BD",
    category: "Music",
    date: "Sep 08, 2026",
    location: "Hatirjheel, Dhaka",
    status: "Approved",
  },
  {
    id: 5,
    title: "Photography Walk",
    organizer: "City Walk Dhaka",
    category: "Photography",
    date: "Sep 10, 2026",
    location: "Old Dhaka",
    status: "Rejected",
  },
  {
    id: 6,
    title: "Startup Networking Night",
    organizer: "Creative Hub",
    category: "Business",
    date: "Sep 12, 2026",
    location: "Mohakhali, Dhaka",
    status: "Pending",
  },
  {
    id: 7,
    title: "Local Makers Market",
    organizer: "Dhaka Art Club",
    category: "Shopping",
    date: "Sep 15, 2026",
    location: "Banani, Dhaka",
    status: "Approved",
  },
];

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
