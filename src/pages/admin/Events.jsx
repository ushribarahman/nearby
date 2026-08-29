import { useMemo, useState } from "react";

function Events() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [events, setEvents] = useState([
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
  ]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.organizer.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || event.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [events, search, filter]);

  const updateStatus = (id, status) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? { ...event, status }
          : event
      )
    );

    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-medium text-gray-500">
            Administration
          </p>

          <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Events
              </h1>

              <p className="mt-2 text-gray-500">
                Review, approve and manage submitted events.
              </p>
            </div>

            <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              {events.length} total events
            </div>

          </div>

        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-sm">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
            />

          </div>

          <div className="flex flex-wrap gap-2">

            {["All", "Pending", "Approved", "Rejected"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    filter === item
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              )
            )}

          </div>

        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px] text-left">

              <thead className="border-b border-gray-200 bg-gray-50">

                <tr className="text-xs uppercase tracking-wide text-gray-500">

                  <th className="px-6 py-4 font-medium">
                    Event
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Organizer
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Category
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Date
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Location
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-medium">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredEvents.map((event) => (

                  <tr
                    key={event.id}
                    className="transition hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <p className="font-medium text-gray-900">
                        {event.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Event #{event.id}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {event.organizer}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {event.category}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.date}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {event.location}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          event.status === "Approved"
                            ? "bg-gray-100 text-gray-700"
                            : event.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {event.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() => setSelectedEvent(event)}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          Review
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {filteredEvents.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-medium text-gray-900">
                No events found
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Event Review Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Event Review
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedEvent.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600"
              >
                ×
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">
                  Organizer
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {selectedEvent.organizer}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedEvent.category}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedEvent.date}
                  </p>
                </div>

              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Location
                </p>

                <p className="mt-1 text-sm text-gray-900">
                  {selectedEvent.location}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Current Status
                </p>

                <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {selectedEvent.status}
                </span>
              </div>

            </div>

            <div className="mt-6 flex gap-2">

              <button
                type="button"
                onClick={() =>
                  updateStatus(selectedEvent.id, "Approved")
                }
                className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Approve
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(selectedEvent.id, "Rejected")
                }
                className="flex-1 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                Reject
              </button>

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Events;