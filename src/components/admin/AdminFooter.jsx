import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <footer className="bg-black text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">

            <Link to="/admin/dashboard">
              <img
                src="/logo.png"
                alt="Nearby Admin"
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
              Nearby administration panel for managing users,
              organizers, events, offers, and reported content
              across the platform.
            </p>

          </div>


          {/* Management */}
          <div>

            <h3 className="text-sm font-semibold text-white">
              Management
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">

              <Link
                to="/admin/dashboard"
                className="transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                to="/admin/users"
                className="transition hover:text-white"
              >
                Users
              </Link>

              <Link
                to="/admin/organizers"
                className="transition hover:text-white"
              >
                Organizers
              </Link>

            </div>

          </div>


          {/* Content */}
          <div>

            <h3 className="text-sm font-semibold text-white">
              Content
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400">

              <Link
                to="/admin/events"
                className="transition hover:text-white"
              >
                Events
              </Link>

              <Link
                to="/admin/offers"
                className="transition hover:text-white"
              >
                Offers
              </Link>

              <Link
                to="/admin/reports"
                className="transition hover:text-white"
              >
                Reports
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

export default AdminFooter;