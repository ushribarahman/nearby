import { useState } from "react";
import StatusBadge from "../admin/StatusBadge";

export default function OrganizerEventList({ events, emptyMessage = "No events found." }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = events.find((event) => event.id === selectedId);
  if (selected) return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <button type="button" onClick={() => setSelectedId(null)} className="text-sm font-semibold text-gray-600 hover:text-black">← Back to events</button>
        <StatusBadge status={selected.status} />
      </div>
      {selected.bannerImage?.url && <img src={selected.bannerImage.url} alt={selected.title} className="h-56 w-full object-cover sm:h-80" />}
      <div className="space-y-8 p-6 sm:p-8">
        <header><p className="mb-2 text-sm font-medium text-teal-600">{selected.category}</p><h2 className="text-3xl font-bold tracking-tight text-gray-900">{selected.title}</h2></header>
        <div className="grid gap-4 rounded-xl bg-gray-50 p-5 sm:grid-cols-3">
          <div><p className="mb-2 text-xs uppercase tracking-wide text-gray-400">Date & time</p><p className="font-medium">{selected.date}</p><p className="mt-1 text-sm text-gray-600">{selected.time}</p></div>
          <div><p className="mb-2 text-xs uppercase tracking-wide text-gray-400">Location</p><p className="font-medium">{selected.location}</p></div>
          <div><p className="mb-2 text-xs uppercase tracking-wide text-gray-400">Duration</p><p className="font-medium">{selected.duration || "Not specified"}</p></div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <section><h3 className="mb-3 text-lg font-semibold">About this event</h3><p className="whitespace-pre-line leading-7 text-gray-600">{selected.description || "No description provided."}</p></section>
            {selected.performers?.length > 0 && <section><h3 className="mb-3 text-lg font-semibold">Performers</h3><div className="flex flex-wrap gap-2">{selected.performers.map((name, index) => <span key={index} className="rounded-full bg-gray-100 px-4 py-2 text-sm">{name}</span>)}</div></section>}
          </div>
          <section className="rounded-xl border border-gray-200 p-5"><h3 className="mb-4 text-lg font-semibold">Tickets</h3><div className="divide-y divide-gray-100">
            {(selected.tickets || []).map((ticket) => <div key={ticket.id} className="flex justify-between gap-4 py-4"><div><p className="font-medium">{ticket.name}</p>{ticket.description && <p className="mt-1 text-sm text-gray-500">{ticket.description}</p>}</div><p className="shrink-0 font-semibold text-teal-700">{ticket.price === 0 ? "Free" : ticket.price + " BDT"}</p></div>)}
          </div></section>
        </div>
      </div>
    </section>
  );
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
              <button type="button" onClick={() => setSelectedId(event.id)} aria-label={"View details for " + event.title} className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-teal-500 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-500">View details ↗</button>
            </article>
          ))}
        </div>
      </div>

    </>
  );
}
