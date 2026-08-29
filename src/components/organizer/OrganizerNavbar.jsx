import { useEffect, useState, useRef } from "react";
import {
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";
import logo from "/logo_organizer.png";
import useAuth from "../../hooks/useAuth";

function OrganizerNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { user, logout } = useAuth();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
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

  const handleMobileNavigation = () => {
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    "text-gray-700 transition underline-offset-7 hover:underline " +
    (isActive
      ? "text-black font-semibold underline"
      : "");


  const handleLogout = () => {
  setDropdownOpen(false);

  //clear authentication state + JWT
  logout();

  window.location.replace("/");
};

  const handleProfile = () => {
    setDropdownOpen(false);

    navigate("/organizer/profile");
  };

  const getInitial = () => {
    if (user?.name) {
      return user.name
        .charAt(0)
        .toUpperCase();
    }

    return "O";
  };

  const getDisplayName = () => {
    if (user?.name) {
      return user.name;
    }

    return "Organizer";
  };

  return (
    <nav
      className={
        "w-full bg-white sticky top-0 z-50 transition-shadow duration-300 " +
        (scrolled
          ? "shadow-sm"
          : "shadow-none")
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">

        <div className="flex items-center justify-between">

          <Link
            to="/organizer/dashboard"
            className="shrink-0"
          >
            <img
              src={logo}
              alt="Nearby"
              className="h-8 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center justify-center gap-8">

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

          <div className="flex items-center gap-2 sm:gap-3">

            <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-32 truncate">
              {getDisplayName()}
            </span>

            <div
              ref={dropdownRef}
              className="relative"
            >

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
                  h-10
                  w-10
                  sm:h-11
                  sm:w-11
                  cursor-pointer
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

              {dropdownOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-12
                    sm:top-14
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

                  <button
                    type="button"
                    onClick={handleProfile}
                    className="
                      flex
                      w-full
                      cursor-pointer
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

                  <div className="my-1 border-t border-gray-200" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      cursor-pointer
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

            {/*Hamburger*/}

            <div
              ref={mobileMenuRef}
              className="relative md:hidden"
            >

              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(
                    (previous) => !previous
                  )
                }
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="
                  flex
                  h-10
                  w-10
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-200
                  text-gray-700
                  transition
                  hover:bg-gray-50
                  hover:text-black
                  focus:outline-none
                "
              >

                {mobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  /* Hamburger icon */

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}

              </button>

              {mobileMenuOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-12
                    z-50
                    w-52
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-2
                    shadow-lg
                  "
                >

                  <NavLink
                    to="/organizer/dashboard"
                    onClick={handleMobileNavigation}
                    className={({
                      isActive,
                    }) =>
                      `
                        block
                        px-4
                        py-3
                        text-sm
                        transition
                        hover:bg-gray-50
                        ${
                          isActive
                            ? "font-semibold text-black bg-gray-50"
                            : "text-gray-700"
                        }
                      `
                    }
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/organizer/events"
                    onClick={handleMobileNavigation}
                    className={({
                      isActive,
                    }) =>
                      `
                        block
                        px-4
                        py-3
                        text-sm
                        transition
                        hover:bg-gray-50
                        ${
                          isActive
                            ? "font-semibold text-black bg-gray-50"
                            : "text-gray-700"
                        }
                      `
                    }
                  >
                    Events
                  </NavLink>

                  <NavLink
                    to="/organizer/offers"
                    onClick={handleMobileNavigation}
                    className={({
                      isActive,
                    }) =>
                      `
                        block
                        px-4
                        py-3
                        text-sm
                        transition
                        hover:bg-gray-50
                        ${
                          isActive
                            ? "font-semibold text-black bg-gray-50"
                            : "text-gray-700"
                        }
                      `
                    }
                  >
                    Offers
                  </NavLink>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default OrganizerNavbar;