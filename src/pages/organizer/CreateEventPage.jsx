import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CoverImageUpload from "../../components/organizer/CoverImageUpload/CoverImageUpload";
import eventService from "../../services/eventService";

const emptyTicket = { name: "", description: "", price: "" };

const emptyFormData = {
  title: "",
  category: "",
  location: "",
  locationLink: "",
  date: "",
  time: "",
  duration: "",
  description: "",
  bannerImage: { url: "", publicId: "" },
};

function CreateEventPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyFormData);
  const [tickets, setTickets] = useState([{ ...emptyTicket }]);
  const [performers, setPerformers] = useState([""]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdEvent, setCreatedEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleBannerChange = ({ url, publicId }) => {
    setFormData((current) => ({
      ...current,
      bannerImage: { url, publicId },
    }));
  };

  // ---- Tickets ----
  const updateTicket = (index, field, value) => {
    setTickets((current) =>
      current.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const addTicket = () => {
    setTickets((current) => [...current, { ...emptyTicket }]);
  };

  const removeTicket = (index) => {
    setTickets((current) => current.filter((_, i) => i !== index));
  };

  // ---- Performers ----
  const updatePerformer = (index, value) => {
    setPerformers((current) =>
      current.map((performer, i) => (i === index ? value : performer))
    );
  };

  const addPerformer = () => {
    setPerformers((current) => [...current, ""]);
  };

  const removePerformer = (index) => {
    setPerformers((current) => current.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData(emptyFormData);
    setTickets([{ ...emptyTicket }]);
    setPerformers([""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.bannerImage.url?.trim() || !formData.bannerImage.publicId?.trim()) {
      setError("Upload a banner image before submitting your event.");
      return;
    }

    // ---- client-side validation (backend re-validates all of this too) ----
    if (!formData.title.trim()) {
      setError("Event title is required.");
      return;
    }

    if (!formData.category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (!formData.date.trim() || !formData.time.trim()) {
      setError("Date and time are required.");
      return;
    }

    const cleanTickets = tickets
      .map((ticket) => ({
        name: ticket.name.trim(),
        description: ticket.description.trim(),
        price: ticket.price,
      }))
      .filter((ticket) => ticket.name || ticket.price !== "");

    if (cleanTickets.length === 0) {
      setError("Add at least one ticket type.");
      return;
    }

    for (const ticket of cleanTickets) {
      if (!ticket.name) {
        setError("Every ticket needs a name.");
        return;
      }

      const price = Number(ticket.price);

      if (ticket.price === "" || Number.isNaN(price) || price < 0) {
        setError(`Ticket "${ticket.name}" needs a valid price (0 for free).`);
        return;
      }
    }

    const cleanPerformers = performers
      .map((performer) => performer.trim())
      .filter(Boolean);

    try {
      setIsSubmitting(true);

      const response = await eventService.createEvent({
        ...formData,
        tickets: cleanTickets.map((ticket) => ({
          ...ticket,
          price: Number(ticket.price),
        })),
        performers: cleanPerformers,
      });

      setCreatedEvent(response.event);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- Success state ----
  if (createdEvent) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#01BBC1]/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#01BBC1"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Event Submitted!
          </h1>

          <p className="mt-3 text-gray-500">
            <span className="font-medium text-gray-900">
              {createdEvent.title}
            </span>{" "}
            has been submitted and is now{" "}
            <span className="font-medium text-amber-600">Pending</span>{" "}
            admin review. You'll be able to see it go live once it's
            approved.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setCreatedEvent(null);
              }}
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Create Another Event
            </button>

            <button
              type="button"
              onClick={() => navigate("/organizer/events")}
              className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back to My Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link
          to="/organizer/events"
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
        </Link>

        <h1 className="mb-1 text-2xl font-bold text-gray-900">
          Create New Event
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Fill in the details below. New events are reviewed by an admin
          before going live.
        </p>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Banner Image *
                </label>
                <CoverImageUpload
                  imageUrl={formData.bannerImage.url}
                  publicId={formData.bannerImage.publicId}
                  onChange={handleBannerChange}
                  uploadType="event"
                  large
                />
                <p className="mt-2 text-sm text-gray-500">Required. Upload your event banner before submitting.</p>
              </div>


          {/* Basic details */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Event Details
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-xl font-semibold text-gray-900">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-2xl font-semibold outline-none transition focus:border-black focus:bg-white"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  placeholder="e.g. Music, Food, Technology"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  placeholder="Enter venue name and area"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Google Maps Link
                </label>
                <input
                  type="url"
                  name="locationLink"
                  value={formData.locationLink}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  placeholder="https://maps.google.com/..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  aria-label="Event date"
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  placeholder="e.g., 17 Oct"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  aria-label="Event time"
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  placeholder="e.g., 7:00 PM - 10:00 PM"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  placeholder="e.g., 3 hours"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  placeholder="Describe your event"
                />
              </div>
            </div>
          </div>

          {/* Tickets */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Tickets *
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add at least one ticket type. Use 0 for a free ticket.
                </p>
              </div>

              <button
                type="button"
                onClick={addTicket}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                + Add Ticket
              </button>
            </div>

            <div className="space-y-4">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.2fr_2fr_1fr_auto]">
                    <input
                      type="text"
                      value={ticket.name}
                      onChange={(e) =>
                        updateTicket(index, "name", e.target.value)
                      }
                      placeholder="Ticket name (e.g. General Admission)"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-black focus:bg-white"
                    />

                    <input
                      type="text"
                      value={ticket.description}
                      onChange={(e) =>
                        updateTicket(index, "description", e.target.value)
                      }
                      placeholder="Description (optional)"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-black focus:bg-white"
                    />

                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={ticket.price}
                      onChange={(e) =>
                        updateTicket(index, "price", e.target.value)
                      }
                      placeholder="Price (BDT)"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-black focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => removeTicket(index)}
                      disabled={tickets.length === 1}
                      className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performers */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Performers
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Optional — add anyone performing or speaking at the event.
                </p>
              </div>

              <button
                type="button"
                onClick={addPerformer}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                + Add Performer
              </button>
            </div>

            <div className="space-y-3">
              {performers.map((performer, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={performer}
                    onChange={(e) => updatePerformer(index, e.target.value)}
                    placeholder="Performer name"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-black focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => removePerformer(index)}
                    disabled={performers.length === 1}
                    className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Event for Review"}
            </button>

            <Link
              to="/organizer/events"
              className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;
