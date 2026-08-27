import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;