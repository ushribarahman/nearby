import LoadingSkeleton from "../components/common/LoadingSkeleton";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  //wait for authentication restoration
  if (loading) {
    return <div className="mx-auto min-h-screen max-w-7xl px-6 py-10"><div aria-hidden="true" className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-gray-200 motion-reduce:animate-none"/><LoadingSkeleton rows={5}/></div>;
  }

  //not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  //authenticated
  return <Outlet />;
}

export default ProtectedRoute;