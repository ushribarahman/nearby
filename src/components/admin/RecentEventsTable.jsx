import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function RecentEventsTable({ events }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white lg:col-span-2">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div>
          <h2 className="font-semibold text-gray-900">Recent Events</h2>
          <p className="mt-1 text-sm text-gray-500">
            Latest event submissions.
          </p>
        </div>

        <Link
          to="/admin/events"
          className="text-sm font-medium text-gray-600 transition hover:text-black"
        >
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-xs uppercase tracking-wide text-gray-500">
              <th className="px-6 py-3 font-medium">Event</th>
              <th className="px-6 py-3 font-medium">Organizer</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {events.map((event) => (
              <tr key={event.name} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{event.name}</p>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {event.organizer}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {event.date}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={event.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentEventsTable;
