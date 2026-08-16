import EventCard from "./EventCard";

function EventSlider({ events, direction = "left" }) {
  const sliderItems = [...events, ...events];

  return (
    <div className="w-full overflow-hidden">

      <div className="mx-auto max-w-7xl px-6">

        <div className="overflow-hidden">

          <div
            className={`flex w-max gap-4 ${
              direction === "left"
                ? "animate-slide-left"
                : "animate-slide-right"
            }`}
          >
            {sliderItems.map((event, index) => (
              <EventCard
                key={`${direction}-${event.id}-${index}`}
                event={event}
              />
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default EventSlider;