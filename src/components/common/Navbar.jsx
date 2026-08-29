import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "/logo.png";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

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

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // ==========================================
  // Avatar Letter
  // ==========================================

  const avatarLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <nav
      className={`w-full bg-white sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* Main Navbar */}
        <div className="grid grid-cols-3 items-center">

          {/* Logo */}
          <NavLink to="/" className="justify-self-start">
            <img
              src={logo}
              alt="Nearby"
              className="h-8 w-auto"
            />
          </NavLink>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8">

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

          {/* Right Side */}
          <div className="flex items-center justify-self-end gap-3">

            {!isAuthenticated ? (
              <>
                {/* Login */}
                <NavLink
                  to="/login"
                  className="
                    text-gray-700
                    px-5
                    py-2
                    rounded-lg
                    outline-1
                    outline-gray-300
                    hover:bg-gray-100
                    hover:text-black
                    transition
                  "
                >
                  Login
                </NavLink>

                {/* Register */}
                <NavLink
                  to="/register"
                  className="
                    bg-black
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    outline-1
                    outline-gray-300
                    hover:bg-gray-800
                    transition
                  "
                >
                  Register
                </NavLink>
              </>
            ) : (
              /* Logged In User */
              <div className="relative">

                {/* Avatar */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="
                    flex
                    h-10
                    w-10
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
                  "
                  aria-label="Open user menu"
                >
                  {avatarLetter}
                </button>

                {/* Dropdown */}
                {isMenuOpen && (
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

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        w-full
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

        </div>
      </div>
    </nav>
  );
}

export default Navbar;