import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import eventsData from "../../data/Events";
import EventForm from "../../components/organizer/EventForm";
import EventTable from "../../components/organizer/EventTable";

function Events() {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "pending") {
      setFilterStatus("Pending");
    }
    const mappedEvents = eventsData.map(event => {
      let newStatus = event.status;
      if (event.status === "Available") {
        newStatus = "Approved";
      } else if (event.status === "Coming Soon") {
        newStatus = "Pending";
      }
      return { ...event, status: newStatus };
    });
    setEvents(mappedEvents);
  }, [location]);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    duration: "",
    image: "",
    category: "",
    ticketPrice: "",
    about: "",
    organizer: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("organizer.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        organizer: {
          ...formData.organizer,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: events.length + 1,
      type: "event",
      ...formData,
      ticketPrice: parseFloat(formData.ticketPrice) || 0,
      status: "Pending",
      performers: ["Performer 1", "Performer 2"],
      schedule: [
        { time: formData.time || "TBA", activity: "Event Starts" },
      ],
    };

    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...newEvent } : e));
    } else {
      setEvents([...events, newEvent]);
    }

    resetForm();
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || "",
      location: event.location || "",
      date: event.date || "",
      time: event.time || "",
      duration: event.duration || "",
      image: event.image || "",
      category: event.category || "",
      ticketPrice: event.ticketPrice?.toString() || "",
      about: event.about || "",
      organizer: {
        name: event.organizer?.name || "",
        email: event.organizer?.email || "",
        phone: event.organizer?.phone || "",
      },
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      date: "",
      time: "",
      duration: "",
      image: "",
      category: "",
      ticketPrice: "",
      about: "",
      organizer: {
        name: "",
        email: "",
        phone: "",
      },
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

          {!showForm && (
            <button
              onClick={() => {
                resetForm();
                setEditingEvent(null);
                setShowForm(true);
              }}
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
            >
              + Create Event
            </button>
          )}
        </div>

        <div className="mb-5 flex justify-end">
          <span className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
            {totalEvents} events
          </span>
        </div>

        {showForm && (
          <EventForm
            formData={formData}
            editingEvent={editingEvent}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            setShowForm={setShowForm}
            setEditingEvent={setEditingEvent}
          />
        )}

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