import { useEffect, useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "/logo_organizer.png";
import useAuth from "../../hooks/useAuth";

function OrganizerNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { user, logout } = useAuth();

  // ==========================================
  // Scroll shadow
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==========================================
  // Close dropdown when clicking outside
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // Navigation link style
  // ==========================================

  const navLinkClass = ({ isActive }) =>
    "text-gray-700 transition underline-offset-7 hover:underline " +
    (isActive
      ? "text-black font-semibold underline"
      : "");

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    setDropdownOpen(false);

    // Clear authentication state + JWT
    logout();
  };

  // ==========================================
  // Edit / Profile
  // ==========================================

  const handleProfile = () => {
    setDropdownOpen(false);
  };

  // ==========================================
  // Get user initial
  // ==========================================

  const getInitial = () => {
    if (user?.name) {
      return user.name
        .charAt(0)
        .toUpperCase();
    }

    return "O";
  };

  // ==========================================
  // Get display name
  // ==========================================

  const getDisplayName = () => {
    if (user?.name) {
      return user.name;
    }

    return "Organizer";
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <nav
      className={
        "w-full bg-white sticky top-0 z-50 transition-shadow duration-300 " +
        (scrolled
          ? "shadow-sm"
          : "shadow-none")
      }
    >
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="grid grid-cols-3 items-center">

          {/* ==========================================
              Logo
          =========================================== */}

          <Link
            to="/organizer/dashboard"
            className="justify-self-start"
          >
            <img
              src={logo}
              alt="Nearby"
              className="h-8 w-auto"
            />
          </Link>

          {/* ==========================================
              Navigation
          =========================================== */}

          <div className="flex items-center justify-center gap-8">

            <NavLink
              to="/organizer/dashboard"
              className={navLinkClass}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/organizer/events"
              className={navLinkClass}
            >
              Events
            </NavLink>

            <NavLink
              to="/organizer/offers"
              className={navLinkClass}
            >
              Offers
            </NavLink>

          </div>

          {/* ==========================================
              Organizer Profile
          =========================================== */}

          <div
            ref={dropdownRef}
            className="relative flex items-center justify-self-end gap-3"
          >

            {/* Organizer Name */}

            <span className="hidden text-sm font-medium text-gray-700 sm:block">
              {getDisplayName()}
            </span>

            {/* Avatar */}

            <button
              type="button"
              onClick={() =>
                setDropdownOpen(
                  (previous) => !previous
                )
              }
              aria-label="Open organizer menu"
              aria-expanded={dropdownOpen}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-black
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-gray-800
                focus:outline-none
                focus:ring-2
                focus:ring-gray-300
                focus:ring-offset-2
              "
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitial()
              )}
            </button>

            {/* ==========================================
                Dropdown
            =========================================== */}

            {dropdownOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-14
                  z-50
                  w-48
                  overflow-hidden
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  py-2
                  shadow-lg
                "
              >

                {/* ======================================
                    Profile
                ======================================= */}

                <button
                  type="button"
                  onClick={handleProfile}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-2.5
                    text-left
                    text-sm
                    transition
                    hover:bg-gray-50
                  "
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=12438&format=png&color=000000"
                    alt="Profile"
                    className="h-4 w-4"
                  />

                  <span>
                    Profile
                  </span>
                </button>

                {/* Divider */}

                <div className="my-1 border-t border-gray-200" />

                {/* ======================================
                    Logout
                ======================================= */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-2.5
                    text-left
                    text-sm
                    transition
                    hover:bg-gray-50
                  "
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=2445&format=png&color=000000"
                    alt="Logout"
                    className="h-4 w-4"
                  />

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

export default OrganizerNavbar;
