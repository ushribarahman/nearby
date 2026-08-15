import { Link } from "react-router-dom";

function Register() {
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
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Create an account
            </h1>

            <p className="mt-2 text-gray-500">
              Join Nearby and discover more around you.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-white p-8 shadow-md border border-gray-200">

            {/* Name */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

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
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            {/* Register */}
            <button
              type="button"
              className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Create Account
            </button>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-black hover:underline"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;