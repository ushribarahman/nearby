import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import eventsData from "../../data/events";
import EventForm from "../../components/organizer/EventForm";
import useAuth from "../../hooks/useAuth";

const emptyFormData = {
  title: "",
  location: "",
  date: "",
  time: "",
  duration: "",
  image: "",
  imagePublicId: "",
  category: "",
  ticketPrice: "",
  about: "",
  organizer: {
    name: "",
    email: "",
    phone: "",
  },
};

function EventFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const isEdit = Boolean(id);

  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);

  // Same status-mapping logic Event.jsx uses, so a direct visit to
  // /organizer/events/:id/edit (e.g. a page refresh) still finds the event.
  useEffect(() => {
    if (!isEdit) return;

    const mappedEvents = eventsData.map((event) => {
      let newStatus = event.status;
      if (event.status === "Available") newStatus = "Approved";
      else if (event.status === "Coming Soon") newStatus = "Pending";
      return { ...event, status: newStatus };
    });

    const found = mappedEvents.find((e) => String(e.id) === String(id));

    if (found) {
      setEditingEvent(found);
      setFormData({
        title: found.title || "",
        location: found.location || "",
        date: found.date || "",
        time: found.time || "",
        duration: found.duration || "",
        image: found.image || "",
        imagePublicId: found.imagePublicId || "",
        category: found.category || "",
        ticketPrice: found.ticketPrice?.toString() || "",
        about: found.about || "",
        organizer: {
          name: found.organizer?.name || "",
          email: found.organizer?.email || "",
          phone: found.organizer?.phone || "",
        },
      });
    }
  }, [id, isEdit]);

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

  const resetForm = () => setFormData(emptyFormData);

  const handleImageChange = ({ url, publicId }) => {
    setFormData((current) => ({
      ...current,
      image: url,
      imagePublicId: publicId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      type: "event",
      ...formData,
      ticketPrice: parseFloat(formData.ticketPrice) || 0,
      status: editingEvent ? editingEvent.status : "Pending",
      performers: editingEvent?.performers || ["Performer 1", "Performer 2"],
      schedule: editingEvent?.schedule || [
        { time: formData.time || "TBA", activity: "Event Starts" },
      ],
    };

    // Hand the saved event back to the table page via router state —
    // there's no events API yet, so this is how the table picks it up.
    navigate("/organizer/events", { state: { savedEvent } });
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <button
          onClick={() => navigate("/organizer/events")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to Events
        </button>

        <EventForm
          formData={formData}
          editingEvent={editingEvent}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          setShowForm={() => navigate("/organizer/events")}
          setEditingEvent={() => {}}
          onImageChange={handleImageChange}
          authToken={authToken}
        />
      </div>
    </div>
  );
}

export default EventFormPage;
