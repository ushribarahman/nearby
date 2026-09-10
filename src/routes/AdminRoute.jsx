import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getRoleHome } from "../utils/roleHome";

function AdminRoute() {
  const { user, loading } = useAuth();

  // wait for auth restoration
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black" />

          <p className="text-sm text-gray-500">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  //not logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  //logged in but not an admin — send them to their own area,
  //not the public homepage (e.g. an organizer shouldn't land on "/").
  if (user.role !== "admin") {
    return <Navigate to={getRoleHome(user.role)} replace />;
  }

  //admin
  return <Outlet />;
}

export default AdminRoute;
