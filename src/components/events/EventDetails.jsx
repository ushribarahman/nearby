import LoadingSkeleton from "../common/LoadingSkeleton";
import Avatar from "../common/Avatar";
import { useParams, Link } from "react-router-dom";
import useEvents from "../../hooks/useEvents";

function EventDetails() {
  const { id } = useParams();
  const { event, loading, error } = useEvents(id);
  if (loading) return <div className="mx-auto max-w-7xl px-6 py-4"><LoadingSkeleton variant="details" /></div>;
  if (error || !event) return <p role="alert" className="p-8">{error || "Event not found."}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 pb-8">
      <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-gray-100">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover object-center" />
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6">
          <h1 className="text-3xl font-bold text-white">{event.title}</h1>
          <div className="flex items-center gap-4 text-white/90 mt-2">
            <span>{event.date}</span>
            <span>•</span>
            <span>{event.time || "TBA"}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">{event.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-8 w-8 shrink-0 rounded-full bg-black text-white"><Avatar user={event.organizer} fallback="O" /></div>
          <span className="text-sm text-gray-500">Event by {event.organizer?.name || "Organizer"}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-1">
            <img src="https://img.icons8.com/?size=100&id=10053&format=png" alt="calendar" className="w-4 h-4" />
            <p className="text-sm text-gray-500">Date</p>
          </div>
          <p className="font-semibold">{event.date}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-1">
            <img src="https://img.icons8.com/?size=100&id=10034&format=png" alt="clock" className="w-4 h-4" />
            <p className="text-sm text-gray-500">Time</p>
          </div>
          <p className="font-semibold">{event.time || "TBA"}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-1">
            <img src="https://img.icons8.com/?size=100&id=7880&format=png" alt="location" className="w-4 h-4" />
            <p className="text-sm text-gray-500">Location</p>
          </div>
          <p className="font-semibold text-sm">{event.location}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-1">
            <img src="https://img.icons8.com/?size=100&id=88940&format=png" alt="duration" className="w-4 h-4" />
            <p className="text-sm text-gray-500">Duration</p>
          </div>
          <p className="font-semibold">{event.duration || "TBA"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-700">{event.about || "No description available."}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <img src="https://img.icons8.com/?size=100&id=Hh5ONdvsAI4P&format=png&color=000000" alt="location" className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Location</h3>
          </div>
          <p className="font-medium">{event.location}</p>
          <a href={event.mapLink || "https://maps.google.com"} target="_blank" rel="noopener noreferrer" className="text-[#01BBC1] hover:text-[#019ca1] hover:underline text-sm inline-block mt-2">
            View Map →
          </a>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <img src="https://img.icons8.com/?size=100&id=1ztfvElILGPO&format=png&color=000000" alt="tickets" className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Tickets</h3>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {event.tickets.map((ticket) => <article key={ticket.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
            <h4 className="break-words text-xl font-semibold text-gray-900">{ticket.name}</h4>
            {ticket.description && <p className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-gray-500">{ticket.description}</p>}
            <div className="mt-auto pt-6"><div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-gray-100 pt-5">
              <span className="text-2xl font-bold text-gray-900">{ticket.price === 0 ? "Free" : ticket.price + " BDT"}</span>
              <span className="text-sm text-gray-400">per ticket</span>
            </div></div>
          </article>)}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Performers</h3>
        {event.performers && event.performers.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {event.performers.map((performer, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 text-center hover:bg-gray-200 transition-colors">
                <div className="w-12 h-12 bg-[#000000] rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl">
                  {performer.charAt(0)}
                </div>
                <p className="font-medium">{performer}</p>
                <p className="text-xs text-gray-500">Performer</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No performers listed.</p>
        )}
      </div>

      <div className="mb-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold">Organizer</h3>
        {event.organizer ? (
          <div className="mt-4 flex items-center gap-4">
            <div className="h-14 w-14 shrink-0 rounded-full bg-black text-xl text-white"><Avatar user={event.organizer} fallback="O" /></div>
            <div className="min-w-0"><p className="break-words font-medium">{event.organizer.name}</p><p className="mt-1 text-sm text-gray-500">{event.organizer.description || "Event Organizer"}</p></div>
          </div>
        ) : (
          <p className="text-gray-500">No organizer details available.</p>
        )}
      </div>

      <div className="mt-8 pb-4">
        <Link
          to={`/events/${event.id}/buy-ticket`}
          className="w-full max-w-md mx-auto block bg-[#000000] text-white py-4 px-6 rounded-full text-base font-semibold hover:bg-gray-600 transition-colors text-center"
        >
          Buy Ticket
        </Link>
      </div>
    </div>
  );
}

export default EventDetails;
