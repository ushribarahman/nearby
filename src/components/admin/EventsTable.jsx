import StatusBadge from "./StatusBadge";

function EventsTable({ events, onReview }) {
  if (events.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="px-6 py-16 text-center">
          <p className="font-medium text-gray-900">No events found</p>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-xs uppercase tracking-wide text-gray-500">
              <th className="px-6 py-4 font-medium">Event</th>
              <th className="px-6 py-4 font-medium">Organizer</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {events.map((event) => (
              <tr key={event.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{event.title}</p>
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
                  <StatusBadge status={event.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => onReview(event)}
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
    </div>
  );
}

export default EventsTable;
