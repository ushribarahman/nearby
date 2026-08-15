import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">
            About Nearby
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            Discover what's happening
            <span className="block text-[#01BBC1]">
              around you.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Nearby helps you discover events, offers, and interesting places
            in your city. Whether you're looking for something fun to do,
            somewhere new to visit, or a great deal, Nearby brings it all
            together in one place.
          </p>
        </div>

      </section>


      {/* What is Nearby */}
      <section className="bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">

            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
                What is Nearby?
              </p>

              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Your city has more to offer.
              </h2>
            </div>

            <div>
              <p className="leading-7 text-gray-600">
                Finding things to do shouldn't mean searching through
                countless websites and social media pages. Nearby brings
                local events, special offers, and places worth exploring
                together so you can find what you're looking for more easily.
              </p>

              <p className="mt-4 leading-7 text-gray-600">
                From concerts and workshops to parks, restaurants, and
                attractions, there's always something nearby waiting to be
                discovered.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
            What you can do
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Everything you need to explore your city.
          </h2>
        </div>


        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Events */}
          <div className="rounded-2xl bg-gray-50 p-7">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#01BBC1] text-xl text-white">
              ✦
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              Discover Events
            </h3>

            <p className="mt-3 leading-6 text-gray-600">
              Find concerts, workshops, festivals, competitions, and other
              events happening around your city.
            </p>

            <Link
              to="/events"
              className="mt-6 inline-block text-sm font-medium text-black hover:underline"
            >
              Explore Events →
            </Link>

          </div>


          {/* Offers */}
          <div className="rounded-2xl bg-gray-50 p-7">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#01BBC1] text-xl text-white">
              %
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              Find Great Offers
            </h3>

            <p className="mt-3 leading-6 text-gray-600">
              Discover discounts, special deals, and offers from businesses
              around you.
            </p>

            <Link
              to="/offers"
              className="mt-6 inline-block text-sm font-medium text-black hover:underline"
            >
              Explore Offers →
            </Link>

          </div>


          {/* Explore */}
          <div className="rounded-2xl bg-gray-50 p-7">

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#01BBC1] text-xl text-white">
              ◎
            </div>

            <h3 className="text-xl font-bold text-gray-900">
              Explore Places
            </h3>

            <p className="mt-3 leading-6 text-gray-600">
              Discover parks, zoos, attractions, landmarks, and other places
              worth visiting.
            </p>

            <Link
              to="/explore"
              className="mt-6 inline-block text-sm font-medium text-black hover:underline"
            >
              Explore Places →
            </Link>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section class="w-full bg-[url('/blank-banner.jpg')] bg-cover bg-center bg-no-repeat">

        <div className="mx-auto max-w-7xl px-6 py-16 text-center">

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            What's happening near you?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white">
            Start exploring events, offers, and places around your city.
          </p>

          <Link
            to="/explore"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-medium text-black transition hover:bg-gray-200"
          >
            Start Exploring
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;