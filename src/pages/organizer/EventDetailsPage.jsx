import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import { Link, useParams } from "react-router-dom";
import useOrganizerEvents from "../../hooks/useOrganizerEvents";
import StatusBadge from "../../components/admin/StatusBadge";
export default function EventDetailsPage() {
 const { id } = useParams();
 const { events, loading, error } = useOrganizerEvents();
 const selected = events.find(event => event.id === id);
 return <main className="mx-auto max-w-7xl px-6 py-8">{loading ? <LoadingSkeleton variant="details" /> : error || !selected ? <><Link to="/organizer/events">← Back to events</Link><p role="alert" className="mt-4">{error || "Event not found."}</p></> : <EventContent selected={selected}/>}</main>;
}
function EventContent({ selected }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <Link to="/organizer/events" className="text-sm font-semibold text-gray-600 hover:text-black">← Back to events</Link>
        <StatusBadge status={selected.status} />
      </div>
      {selected.bannerImage?.url && <div className="aspect-video w-full overflow-hidden bg-gray-100"><img src={selected.bannerImage.url} alt={selected.title} className="h-full w-full object-cover object-center" /></div>}
      <div className="space-y-8 p-6 sm:p-8">
        {selected.status === "Rejected" && <div className="rounded-xl bg-red-50 p-5"><h3 className="font-semibold text-red-700">Rejection reason</h3><p className="mt-2 whitespace-pre-line">{selected.rejectionReason || "No reason recorded."}</p><p className="mt-2 text-sm">This submission cannot be resubmitted.</p></div>}
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
}
