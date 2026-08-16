import { Link } from "react-router-dom";
import WhyNearbyCard from "./WhyNearbyCard";

function WhyNearby() {
  return (
    <section className="py-16 md:py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">


          <div>

            <p className="mb-4 text-sm font-medium text-gray-500">
              Why Nearby?
            </p>

            <h2 className="max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-gray-900 md:text-5xl">
              Your city has more going on than you think.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-500 md:text-lg">
              Nearby makes it easier to discover events, activities and
              experiences around you without having to search through
              different platforms.
            </p>

            <Link
              to="/events"
              className="
                mt-8
                inline-flex
                rounded-lg
                bg-black
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-gray-800
              "
            >
              Explore events
            </Link>

          </div>


          <div className="grid grid-cols-2 gap-4">

            <WhyNearbyCard
              number="01"
              title="Discover"
              description="Find events and activities happening around you."
            />

            <WhyNearbyCard
              number="02"
              title="Explore"
              description="Browse different categories and find something interesting."
              className="translate-y-10"
            />

            <WhyNearbyCard
              number="03"
              title="Connect"
              description="Join events and connect with people who share your interests."
              className="-translate-y-1"
            />

            <WhyNearbyCard
              number="04"
              title="Experience"
              description="Turn ordinary days into something worth remembering."
              className="translate-y-10"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyNearby;