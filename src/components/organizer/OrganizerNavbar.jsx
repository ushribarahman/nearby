import { useEffect, useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "/logo_organizer.png";

function OrganizerNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const [profile, setProfile] = useState({
    fullName: "",
    profileImage: "",
  });

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
    const savedProfile = localStorage.getItem("organizerProfile");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile({
        fullName: parsedProfile.fullName || "",
        profileImage: parsedProfile.profileImage || "",
      });
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedProfile = localStorage.getItem("organizerProfile");
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile({
          fullName: parsedProfile.fullName || "",
          profileImage: parsedProfile.profileImage || "",
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinkClass = ({ isActive }) =>
    "text-gray-700 transition underline-offset-7 hover:underline " +
    (isActive ? "text-black font-semibold underline" : "");

  const handleLogout = () => {
    setDropdownOpen(false);
    navigate("/");
  };

  const handleEditProfile = () => {
    setDropdownOpen(false);
    navigate("/organizer/profile");
  };

  const getInitial = () => {
    if (profile.fullName) {
      return profile.fullName.charAt(0).toUpperCase();
    }
    return "O";
  };

  const getDisplayName = () => {
    if (profile.fullName) {
      return profile.fullName;
    }
    return "Organizer";
  };

  return (
    <nav
      className={"w-full bg-white sticky top-0 z-50 transition-shadow duration-300 " +
        (scrolled ? "shadow-sm" : "shadow-none")}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="grid grid-cols-3 items-center">

          <Link to="/organizer/dashboard" className="justify-self-start">
            <img src={logo} alt="Nearby" className="h-8 w-auto" />
          </Link>

          <div className="flex items-center justify-center gap-8">
            <NavLink to="/organizer/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/organizer/events" className={navLinkClass}>
              Events
            </NavLink>
            <NavLink to="/organizer/offers" className={navLinkClass}>
              Offers
            </NavLink>
          </div>

          <div className="flex items-center justify-self-end gap-3 relative" ref={dropdownRef}>

            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {getDisplayName()}
            </span>

            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-11 h-11 rounded-full bg-black text-white font-semibold text-sm flex items-center justify-center hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 overflow-hidden"
            >
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitial()
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleEditProfile}
                  className="w-full text-left px-4 py-2.5 text-sm transition flex items-center gap-3 hover:bg-gray-50"
                >
                  <img 
                    src="https://img.icons8.com/?size=100&id=12438&format=png&color=000000" 
                    alt="edit profile" 
                    className="h-4 w-4"
                  />
                  Profile
                </button>

                <div className="border-t border-gray-200 my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm transition flex items-center gap-3 hover:bg-gray-50"
                >
                  <img 
                    src="https://img.icons8.com/?size=100&id=2445&format=png&color=000000" 
                    alt="logout" 
                    className="h-4 w-4"
                  />
                  Logout
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