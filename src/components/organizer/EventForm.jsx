function EventForm({ formData, editingEvent, handleInputChange, handleSubmit, resetForm, setShowForm, setEditingEvent }) {
  return (
    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        {editingEvent ? "Edit Event" : "Create New Event"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
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
              placeholder="Enter category"
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
              Date *
            </label>
            <input
              type="text"
              name="date"
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
              type="text"
              name="time"
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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Ticket Price (BDT) *
            </label>
            <input
              type="text"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              placeholder="0 for free"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              placeholder="Enter image URL"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              rows="4"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              placeholder="Describe your event"
            />
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-3 text-sm font-medium text-gray-700">
              Organizer Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <input
                type="text"
                name="organizer.name"
                value={formData.organizer.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                placeholder="Organization name"
              />

              <input
                type="email"
                name="organizer.email"
                value={formData.organizer.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                placeholder="Email"
              />

              <input
                type="text"
                name="organizer.phone"
                value={formData.organizer.phone}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                placeholder="Phone"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            {editingEvent ? "Update Event" : "Create Event"}
          </button>

          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowForm(false);
              setEditingEvent(null);
            }}
            className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;