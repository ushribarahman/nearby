import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminFooter from "../components/admin/AdminFooter";

function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Admin Footer */}
      <AdminFooter />

    </div>
  );
}

export default AdminLayout;