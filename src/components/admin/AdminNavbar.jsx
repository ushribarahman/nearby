import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logoAdmin from "/logo_admin.png";

function AdminNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    `text-gray-700 transition underline-offset-7 hover:underline ${
      isActive
        ? "text-black font-semibold underline"
        : ""
    }`;

  const handleLogout = () => {
    setIsProfileOpen(false);
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

          {/* =====================================================
              LOGO
          ====================================================== */}

          <Link
            to="/admin/dashboard"
            className="justify-self-start"
          >
            <img
              src={logoAdmin}
              alt="Nearby"
              className="h-13 w-auto"
            />
          </Link>


          {/* =====================================================
              NAVIGATION
          ====================================================== */}

          <div className="flex items-center justify-center gap-7">

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

            <NavLink
              to="/admin/reports"
              className={navLinkClass}
            >
              Reports
            </NavLink>

          </div>


          {/* =====================================================
              ADMIN AVATAR
          ====================================================== */}

          <div
            ref={profileRef}
            className="relative flex justify-self-end"
          >

            {/* Avatar Button */}

            <button
              type="button"
              onClick={() =>
                setIsProfileOpen(!isProfileOpen)
              }
              aria-label="Open admin menu"
              aria-expanded={isProfileOpen}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-gray-100
                ring-1
                ring-gray-200
                transition
                hover:ring-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-black
                focus:ring-offset-2
              "
            >

              {/* Avatar Icon */}

              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                  />
                </svg>

              </div>

            </button>


            {/* =================================================
                DROPDOWN
            ================================================== */}

            {isProfileOpen && (

              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-3
                  w-44
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-1.5
                  shadow-lg
                "
              >

                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    text-gray-700
                    transition
                    hover:bg-gray-50
                    hover:text-black
                  "
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.7"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 12H9m9 0-3-3m3 3-3 3"
                    />
                  </svg>

                  <span>
                    Logout
                  </span>

                </button>

              </div>

            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;