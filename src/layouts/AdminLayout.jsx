import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Persistent sidebar (see AdminSidebar.jsx) */}
      <AdminSidebar />

      {/* Content area — offset by the sidebar's fixed width (16rem) */}
      <main className="min-h-screen pl-64">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
