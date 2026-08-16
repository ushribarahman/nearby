import events from "../../data/Events";
import EventSlider from "./EventSlider";

function NearbyEvents() {
  return (
    <section className="py-16 md:py-10">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-8">

          <p className="mb-2 text-sm font-medium text-gray-500">
            Discover
          </p>

          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            Check out what exciting is happening nearby.
          </h2>

        </div>

      </div>

      <EventSlider
        events={events}
        direction="left"
      />

      <div className="mt-4">
        <EventSlider
          events={events}
          direction="right"
        />
      </div>

    </section>
  );
}

export default NearbyEvents;