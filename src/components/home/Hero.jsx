import { useEffect, useState } from "react";
import events from "../../data/Events";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!events.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!events.length) {
    return (
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex h-105 items-center justify-center rounded-2xl bg-gray-100 md:h-130">
          <p className="text-gray-500">
            No events available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pt-8">

      <div className="relative h-105 overflow-hidden rounded-2xl md:h-130">

        {/* Slides */}
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide
                ? "z-10 opacity-100"
                : "z-0 opacity-0"
            }`}
          >

            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">

              <span className="inline-block rounded-md bg-white px-3 py-1 text-xs font-semibold text-gray-900">
                {event.category}
              </span>

              <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-white md:text-5xl">
                {event.title}
              </h1>

              <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/80">
                <span>{event.location}</span>
                <span>•</span>
                <span>{event.date}</span>
              </div>

            </div>

          </div>
        ))}

        <div className="absolute bottom-6 right-6 z-20 flex gap-1.5">
          {events.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}

export default Hero;