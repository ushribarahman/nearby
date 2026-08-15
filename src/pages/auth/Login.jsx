import { Link } from "react-router-dom";

function Login() {
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
              Welcome back
            </h1>

            <p className="mt-2 text-gray-500">
              Login to discover what's happening nearby.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-white p-8 shadow-md border border-gray-200">

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

                <button className="text-sm text-gray-500 hover:text-black">
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
              Login
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