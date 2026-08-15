import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="
        group
        relative
        h-[190px]
        w-[280px]
        shrink-0
        overflow-hidden
        rounded-xl
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-[0_0_25px_rgba(0,0,0,0.25)]
        md:h-[210px]
        md:w-[320px]
      "
    >

      {/* Image */}
      <img
        src={event.image}
        alt={event.title}
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
        "
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">

        <p className="mb-1 text-xs font-medium text-white/70">
          {event.category}
        </p>

        <h3 className="line-clamp-2 text-base font-bold text-white">
          {event.title}
        </h3>

      </div>

    </Link>
  );
}

export default EventCard;