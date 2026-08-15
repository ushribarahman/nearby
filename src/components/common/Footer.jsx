import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/">
              <img
                src="/logo.png"
                alt="Nearby"
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
              Discover events, offers, and places worth visiting around your
              city. Find what's happening nearby and make your next plan.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold">
              Explore
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <Link
                to="/events"
                className="transition hover:text-white"
              >
                Events
              </Link>

              <Link
                to="/offers"
                className="transition hover:text-white"
              >
                Offers
              </Link>

              <Link
                to="/explore"
                className="transition hover:text-white"
              >
                Discover Your City
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">
              Nearby
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">
              <Link
                to="/about"
                className="transition hover:text-white"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="transition hover:text-white"
              >
                Contact
              </Link>

              <Link
                to="/login"
                className="transition hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="transition hover:text-white"
              >
                Register
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

export default Footer;