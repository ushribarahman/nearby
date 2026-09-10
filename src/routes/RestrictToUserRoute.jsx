import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getRoleHome } from "../utils/roleHome";

// Wraps the public site (Home, Events, Offers, Explore, About), the
// login/register pages, and the logged-in user's own pages (e.g. /profile).
//
// An organizer or admin session should never render any of that — they
// live in their own dashboard area. If one of them lands here (typed the
// URL, clicked an old bookmark, etc.) we send them straight to their own
// dashboard instead of showing the regular user's site.
function RestrictToUserRoute() {
  const { user, loading } = useAuth();

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

  if (user && user.role !== "user") {
    return <Navigate to={getRoleHome(user.role)} replace />;
  }

  return <Outlet />;
}

export default RestrictToUserRoute;
