import { Outlet } from "react-router-dom";
import OrganizerNavbar from "../components/organizer/OrganizerNavbar";
import OrganizerFooter from "../components/organizer/OrganizerFooter";

function OrganizerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Organizer Navbar */}
      <OrganizerNavbar />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Organizer Footer */}
      <OrganizerFooter />

    </div>
  );
}

export default OrganizerLayout;