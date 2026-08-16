import { useParams, Link } from "react-router-dom";
import events from "../../data/Events";

function EventDetails() {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <Link to="/events" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 pb-8">
      <div className="relative w-full h-125 rounded-xl overflow-hidden mb-6">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
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
            <img src="https://img.icons8.com/?size=100&id=Hh5ONdvsAI4P&format=png&color=01BBC1" alt="location" className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Location</h3>
          </div>
          <p className="font-medium">{event.location}</p>
          <p className="text-sm text-gray-500 mt-1">5th Fl, Bari Momen's Heights, Banani</p>
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
        <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
          <div>
            <p className="font-medium">Ticket 1</p>
            <p className="text-sm text-gray-500">General Admission</p>
          </div>
          <span className="text-lg font-bold">{event.ticketPrice === 0 ? "Free" : `${event.ticketPrice} BDT`}</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Event Schedule</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-medium mb-2">Day 01</p>
          <p className="text-sm text-gray-500 mb-2">{event.date}</p>
          {event.schedule && event.schedule.length > 0 ? (
            event.schedule.map((item, index) => (
              <div key={index} className="flex items-center gap-4 text-sm py-1">
                <span className="font-medium w-24">{item.time}</span>
                <span className="text-gray-600">{item.activity}</span>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-4 text-sm py-1">
              <span className="font-medium w-24">{event.time || "TBA"}</span>
              <span className="text-gray-600">Event Scheduled</span>
            </div>
          )}
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
          <>
            <p className="font-medium">{event.organizer.name}</p>
            <p className="text-sm text-gray-500">{event.organizer.description || "Event Organizer"}</p>
          </>
        ) : (
          <p className="text-gray-500">No organizer details available.</p>
        )}
      </div>

      <div className="mt-8 pb-4">
        <button className="w-full max-w-md mx-auto block bg-[#000000] text-white py-4 px-6 rounded-full text-base font-semibold hover:bg-gray-600 transition-colors">
          Buy Ticket
        </button>
      </div>
    </div>
  );
}

export default EventDetails;