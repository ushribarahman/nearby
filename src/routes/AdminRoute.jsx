import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
    return <Navigate to="/login" replace />;
  }

  //logged in but not an admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
 
  //admin
  return <Outlet />;
}

export default AdminRoute;