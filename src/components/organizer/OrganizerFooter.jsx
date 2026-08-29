import { Link } from "react-router-dom";

function OrganizerFooter() {
  return (
    <footer className="bg-black text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">

            <Link to="/organizer/dashboard">
              <img
                src="/logo.png"
                alt="Nearby"
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
              Manage your events, offers, and organizer profile
              with Nearby. Keep your audience informed and make
              your events easier to discover.
            </p>

          </div>


          {/* Organizer */}
          <div>

            <h3 className="text-sm font-semibold text-white">
              Organizer
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">

              <Link
                to="/organizer/dashboard"
                className="transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                to="/organizer/events"
                className="transition hover:text-white"
              >
                My Events
              </Link>

              <Link
                to="/organizer/offers"
                className="transition hover:text-white"
              >
                My Offers
              </Link>

              <Link
                to="/organizer/profile"
                className="transition hover:text-white"
              >
                Profile
              </Link>

            </div>

          </div>


          {/* Support */}
          <div>

            <h3 className="text-sm font-semibold text-white">
              Nearby
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">

              <Link
                to="/"
                className="transition hover:text-white"
              >
                Visit Website
              </Link>

              <Link
                to="/about"
                className="transition hover:text-white"
              >
                About Nearby
              </Link>

              <Link
                to="/events"
                className="transition hover:text-white"
              >
                Explore Events
              </Link>

              <Link
                to="/offers"
                className="transition hover:text-white"
              >
                Explore Offers
              </Link>

            </div>

          </div>

        </div>


        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 Nearby. All rights reserved.
          </p>

          <div className="flex gap-5">

            <Link
              to="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default OrganizerFooter;