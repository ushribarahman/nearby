import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function OrganizerRoute() {
  const { user, loading } = useAuth();

  //wait for authentication restoration
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

  //check organizer role
  if (user.role !== "organizer") {
    return <Navigate to="/" replace />;
  }

  //organizer
  return <Outlet />;
}

export default OrganizerRoute;