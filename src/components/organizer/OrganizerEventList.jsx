import { Link } from "react-router-dom";
import StatusBadge from "../admin/StatusBadge";

export default function OrganizerEventList({ events, emptyMessage = "No events found." }) {
  if (!events.length) return <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-500">{emptyMessage}</p>;
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
        <div className="hidden grid-cols-[minmax(0,2fr)_1fr_1fr_auto] gap-6 border-b border-gray-100 bg-gray-50/70 px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 lg:grid">
          <span>Event</span><span>Date & time</span><span>Status</span><span>Details</span>
        </div>
        <div className="divide-y divide-gray-100">
          {events.map((event) => (
            <article key={event.id} className="group grid items-center gap-4 p-5 transition-colors hover:bg-gray-50/70 lg:grid-cols-[minmax(0,2fr)_1fr_1fr_auto] lg:gap-6 lg:px-6">
              <div className="flex min-w-0 items-center gap-4">
                <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-teal-50">
                  {event.bannerImage?.url ? <img src={event.bannerImage.url} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" /> : <span className="flex h-full items-center justify-center text-2xl text-teal-600">{event.title.charAt(0)}</span>}
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-xs font-medium text-teal-600">{event.category}</p>
                  <h3 className="line-clamp-2 font-semibold leading-snug text-gray-900">{event.title}</h3>
                  <p className="mt-2 text-xs text-gray-400">{event.tickets?.length || 0} ticket types</p>
                </div>
              </div>
              <div className="text-sm"><p className="font-medium text-gray-800">{event.date}</p><p className="mt-1 text-xs text-gray-500">{event.time}</p><p className="mt-2 line-clamp-2 text-xs text-gray-500">{event.location}</p></div>
              <div><StatusBadge status={event.status} /></div>
              <Link to={"/organizer/events/" + event.id} aria-label={"View details for " + event.title} className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-teal-500 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-500">View details ↗</Link>
              {event.status === "Rejected" && (
                <div className="col-span-full rounded-lg bg-teal-50 px-4 py-3 text-sm text-teal-800">
                  <span className="font-semibold text-teal-700">Why it was rejected: </span>
                  <span className="whitespace-pre-line">{event.rejectionReason || "No reason recorded."}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

    </>
  );
}
