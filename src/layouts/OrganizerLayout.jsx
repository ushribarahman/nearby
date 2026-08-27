import { Outlet } from "react-router-dom";
import OrganizerNavbar from "../components/organizer/OrganizerNavbar";

function OrganizerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OrganizerNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default OrganizerLayout;