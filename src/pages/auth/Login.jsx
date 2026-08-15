import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [isOrganizer, setIsOrganizer] = useState(false);

  return (
    <div>

      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-8">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <img
              src="/logo.png"
              alt="Nearby"
              className="h-10 w-auto"
            />
          </div>

          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {isOrganizer ? "Organizer Login" : "Welcome back"}
            </h1>

            <p className="mt-2 text-gray-500">
              {isOrganizer
                ? "Login to manage your events and offers."
                : "Login to discover what's happening nearby."}
            </p>
          </div>

          {/* Organizer Toggle */}
          <div className="mb-5 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

            <div>
              <p className="text-sm font-medium text-gray-900">
                Are you an organizer?
              </p>

              <p className="mt-0.5 text-xs text-gray-500">
                {isOrganizer
                  ? "You're logging in as an organizer."
                  : "Turn this on to manage your events."}
              </p>
            </div>

            {/* Toggle */}
            <button
              type="button"
              onClick={() => setIsOrganizer(!isOrganizer)}
              className={`relative h-6 w-11 rounded-full transition ${
                isOrganizer
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                  isOrganizer
                    ? "left-5"
                    : "left-0.5"
                }`}
              />
            </button>

          </div>

          {/* Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">

            {/* Email */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Password */}
            <div className="mb-4">

              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Forgot password?
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />

            </div>

            {/* Remember */}
            <div className="mb-6 flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />

              <span className="text-sm text-gray-600">
                Remember me
              </span>
            </div>

            {/* Login */}
            <button
              type="button"
              className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              {isOrganizer ? "Login as Organizer" : "Login"}
            </button>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-medium text-black hover:underline"
              >
                Register
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;