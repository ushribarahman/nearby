import LoadingSkeleton from "../components/common/LoadingSkeleton";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getRoleHome } from "../utils/roleHome";

function AdminRoute() {
  const { user, loading } = useAuth();

  // wait for auth restoration
  if (loading) {
    return <div className="mx-auto min-h-screen max-w-7xl px-6 py-10"><div aria-hidden="true" className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-gray-200 motion-reduce:animate-none"/><LoadingSkeleton rows={5}/></div>;
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
