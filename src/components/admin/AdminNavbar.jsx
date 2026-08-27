import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "/logo.png";

function AdminNavbar() {
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-gray-700 transition underline-offset-7 hover:underline ${
      isActive ? "text-black font-semibold underline" : ""
    }`;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="grid grid-cols-3 items-center">

          {/* Logo */}
          <Link
            to="/admin/dashboard"
            className="justify-self-start"
          >
            <img
              src={logo}
              alt="Nearby"
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8">

            <NavLink
              to="/admin/dashboard"
              className={navLinkClass}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className={navLinkClass}
            >
              Users
            </NavLink>

            <NavLink
              to="/admin/organizers"
              className={navLinkClass}
            >
              Organizers
            </NavLink>

            <NavLink
              to="/admin/events"
              className={navLinkClass}
            >
              Events
            </NavLink>

            <NavLink
              to="/admin/offers"
              className={navLinkClass}
            >
              Offers
            </NavLink>

          </div>

          {/* Right side */}
          <div className="flex items-center justify-self-end gap-3">

            <span className="text-sm font-medium text-gray-500">
              Admin
            </span>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                rounded-lg
                bg-black
                px-5
                py-2
                text-white
                transition
                hover:bg-gray-800
              "
            >
              Logout
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;