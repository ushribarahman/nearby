import { Link } from "react-router-dom";

function HomeCTA() {
  return (
    <section className="px-6 py-16 md:py-24">

      <div className="mx-auto max-w-7xl">

        <div className="overflow-hidden rounded-3xl bg-black px-6 py-16 text-center md:px-12 md:py-20">

          <p className="mb-3 text-sm font-medium text-gray-400">
            Don't miss out
          </p>

          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white md:text-5xl">
            There's always something happening nearby.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-gray-400 md:text-base">
            Explore events around you and find your next experience.
          </p>

          <Link
            to="/events"
            className="
              mt-8
              inline-flex
              rounded-lg
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-gray-200
            "
          >
            Explore events
          </Link>

        </div>

      </div>

    </section>
  );
}

export default HomeCTA;