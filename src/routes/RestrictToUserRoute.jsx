import LoadingSkeleton from "../components/common/LoadingSkeleton";
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
    return <div className="mx-auto min-h-screen max-w-7xl px-6 py-10"><div aria-hidden="true" className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-gray-200 motion-reduce:animate-none"/><LoadingSkeleton rows={5}/></div>;
  }

  if (user && user.role !== "user") {
    return <Navigate to={getRoleHome(user.role)} replace />;
  }

  return <Outlet />;
}

export default RestrictToUserRoute;
