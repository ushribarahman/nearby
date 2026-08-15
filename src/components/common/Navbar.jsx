import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "/logo.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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

          {/* Buttons */}
          <div className="flex items-center justify-self-end gap-3">

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

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;