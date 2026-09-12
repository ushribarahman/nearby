import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import eventsData from "../../data/events";
import EventTable from "../../components/organizer/EventTable";

function Events() {
  const location = useLocation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "pending") {
      setFilterStatus("Pending");
    }

    const mappedEvents = eventsData.map((event) => {
      let newStatus = event.status;
      if (event.status === "Available") {
        newStatus = "Approved";
      } else if (event.status === "Coming Soon") {
        newStatus = "Pending";
      }
      return { ...event, status: newStatus };
    });

    // If we just came back from the create/edit page (EventFormPage),
    // location.state carries the event that was created or updated —
    // there's no events API yet, so this is how it gets folded back in.
    const savedEvent = location.state?.savedEvent;

    if (savedEvent) {
      const alreadyExists = mappedEvents.some((e) => e.id === savedEvent.id);

      setEvents(
        alreadyExists
          ? mappedEvents.map((e) =>
              e.id === savedEvent.id ? { ...e, ...savedEvent } : e
            )
          : [...mappedEvents, savedEvent]
      );
    } else {
      setEvents(mappedEvents);
    }
  }, [location]);

  const handleEdit = (event) => {
    navigate(`/organizer/events/${event.id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "all") {
      return matchesSearch;
    }

    const matchesStatus = event.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalEvents = events.length;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Events
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your events, create new ones, or edit existing ones.
            </p>
          </div>

          <Link
            to="/organizer/events/new"
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            + Create Event
          </Link>
        </div>

        <div className="mb-5 flex justify-end">
          <span className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
            {totalEvents} events
          </span>
        </div>

        <EventTable
          filteredEvents={filteredEvents}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

      </div>
    </div>
  );
}

export default Events;
