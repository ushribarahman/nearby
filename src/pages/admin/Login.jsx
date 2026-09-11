import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/common/PasswordInput";
import useAuth from "../../hooks/useAuth";
import { getRoleHome } from "../../utils/roleHome";

// Deliberately its own page, not part of the public Login flow: there is
// no link to this page anywhere in the UI, no "Are you an admin?" toggle
// on /login, and no way to reach it from Register. Admin accounts are
// created directly against the database (see nearby-backend), never
// through any frontend form — this page only ever signs an existing
// admin in.
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, user, loading } = useAuth();

  // If someone is already signed in — as an admin, an organizer, or a
  // regular user — send them to where they belong instead of showing
  // this form. An admin doesn't need to log in again, and nobody else
  // should be sitting on this page at all.
  useEffect(() => {
    if (!loading && user) {
      navigate(getRoleHome(user.role), { replace: true });
    }
  }, [loading, user, navigate]);

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);

      await login(
        {
          email: email.trim(),
          password,
          role: "admin",
        },
        "admin"
      );

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      console.error("Admin login failed:", error);

      setError(error.message || "Unable to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex justify-center">
            <img
              src="/logo_admin.png"
              alt="Nearby Admin"
              className="h-9 w-auto brightness-0 invert"
            />
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-white">
            Admin Sign In
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Restricted access. Authorized administrators only.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
          {error && (
            <div className="mb-5 rounded-lg border border-red-900 bg-red-950 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin();
                }
              }}
              placeholder="admin@nearby.com"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-[#01BBC1]"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <PasswordInput
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin();
                }
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="border-gray-700 bg-gray-950 text-white focus:border-[#01BBC1]"
              iconClassName="text-gray-500 hover:text-gray-300"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full rounded-lg bg-[#01BBC1] px-5 py-3 font-medium text-black transition hover:bg-[#01a5aa] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          <Link to="/" className="hover:text-gray-400">
            ← Back to Nearby
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
