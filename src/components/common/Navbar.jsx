import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import logo from "/logo.png";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const desktopUserMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);

  const { user, isAuthenticated, logout } = useAuth();

  const location = useLocation();
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
      const clickedInsideDesktop = desktopUserMenuRef.current?.contains(
        event.target,
      );

      const clickedInsideMobile = mobileUserMenuRef.current?.contains(
        event.target,
      );

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close Menus When Route Changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Navigation Link Style
  const navLinkClass = ({ isActive }) =>
    `text-gray-700 transition underline-offset-7 hover:underline ${
      isActive ? "font-semibold text-black underline" : ""
    }`;

  // Profile
  const handleProfile = () => {
    // Close menus first
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);

    // Navigate directly to user profile
    navigate("/profile");
  };

  // Logout
  const handleLogout = () => {
    // Close menus immediately
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);

    // Clear authentication state + token
    logout();

    // Go to public home page
    navigate("/", {
      replace: true,
    });
  };

  // Avatar Letter
  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  // Render
  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/*Main Navbar*/}

        <div className="flex h-18 items-center justify-between">
          {/*Logo*/}

          <NavLink to="/" className="shrink-0" aria-label="Nearby Home">
            <img src={logo} alt="Nearby" className="h-8 w-auto sm:h-9" />
          </NavLink>

          {/* Desktop Navigation*/}
          <div className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/events" className={navLinkClass}>
              Events
            </NavLink>

            <NavLink to="/offers" className={navLinkClass}>
              Offers
            </NavLink>

            <NavLink to="/explore" className={navLinkClass}>
              Explore
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </div>

          {/*  Desktop Right Side*/}

          <div className="hidden items-center gap-3 lg:flex">
            {!isAuthenticated ? (
              <>
                {/* Login */}

                <NavLink
                  to="/login"
                  className="
                    rounded-lg
                    px-5
                    py-2
                    text-gray-700
                    outline-1
                    outline-gray-300
                    transition
                    hover:bg-gray-100
                    hover:text-black
                  "
                >
                  Login
                </NavLink>

                {/* Register */}

                <NavLink
                  to="/register"
                  className="
                    rounded-lg
                    bg-black
                    px-5
                    py-2
                    text-white
                    outline-1
                    outline-gray-300
                    transition
                    hover:bg-gray-800
                  "
                >
                  Register
                </NavLink>
              </>
            ) : (
              /*Logged In User*/

              <div ref={desktopUserMenuRef} className="relative">
                {/* Avatar */}

                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((previous) => !previous)}
                  className="
                    flex
                    h-10
                    w-10
                    cursor-pointer
                    items-center
                    justify-center
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
                  aria-label="Open user menu"
                  aria-expanded={isUserMenuOpen}
                >
                  {avatarLetter}
                </button>

                {/*Desktop User Dropdown*/}

                {isUserMenuOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      top-12
                      z-50
                      w-48
                      overflow-hidden
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      shadow-lg
                    "
                  >
                    {/* User Information */}
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {user?.name || "User"}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {user?.email || ""}
                      </p>
                    </div>

                    {/*Profile*/}
                    <button
                      type="button"
                      onClick={handleProfile}
                      className="
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        px-4
                        py-3
                        text-left
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        hover:text-black
                      "
                    >
                      Profile
                    </button>

                    {/*logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        border-t
                        border-gray-100
                        px-4
                        py-3
                        text-left
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        hover:text-black
                      "
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile / Tablet Right Side*/}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile User Avatar */}
            {isAuthenticated && (
              <div ref={mobileUserMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((previous) => !previous)}
                  className="
                    flex
                    h-10
                    w-10
                    cursor-pointer
                    items-center
                    justify-center
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
                  aria-label="Open user menu"
                  aria-expanded={isUserMenuOpen}
                >
                  {avatarLetter}
                </button>

                {/*Mobile User Dropdown*/}

                {isUserMenuOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      top-12
                      z-50
                      w-48
                      overflow-hidden
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      shadow-lg
                    "
                  >
                    {/* User Information */}
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {user?.name || "User"}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {user?.email || ""}
                      </p>
                    </div>

                    {/* Profile */}
                    <button
                      type="button"
                      onClick={handleProfile}
                      className="
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        px-4
                        py-3
                        text-left
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        hover:text-black
                      "
                    >
                      Profile
                    </button>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        border-t
                        border-gray-100
                        px-4
                        py-3
                        text-left
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        hover:text-black
                      "
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/*Mobile Login*/}
            {!isAuthenticated && (
              <NavLink
                to="/login"
                className="
                  hidden
                  rounded-lg
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-700
                  outline-1
                  outline-gray-300
                  transition
                  hover:bg-gray-100
                  hover:text-black
                  sm:block
                "
              >
                Login
              </NavLink>
            )}

            {/*Mobile Register*/}
            {!isAuthenticated && (
              <NavLink
                to="/register"
                className="
                  hidden
                  rounded-lg
                  bg-black
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-gray-800
                  sm:block
                "
              >
                Register
              </NavLink>
            )}

            {/*Hamburger*/}
            <button
              type="button"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              className="
                ml-1
                flex
                h-10
                w-10
                cursor-pointer
                items-center
                justify-center
                rounded-lg
                text-gray-700
                transition
                hover:bg-gray-100
                hover:text-black
                focus:outline-none
                focus:ring-2
                focus:ring-gray-300
              "
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/*Mobile Navigation*/}
        {isMenuOpen && (
          <div className="border-t border-gray-100 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/events"
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  }`
                }
              >
                Events
              </NavLink>

              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  }`
                }
              >
                Offers
              </NavLink>

              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  }`
                }
              >
                Explore
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-100 text-black"
                      : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  }`
                }
              >
                About
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
