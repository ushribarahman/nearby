import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [isOrganizer, setIsOrganizer] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
        setError(
            "Please enter your email and password."
        );

        return;
    }

    try {
        setIsLoading(true);

        const response = await login(
            {
                email: email.trim(),
                password,
            },
            isOrganizer
                ? "organizer"
                : "user"
        );

        const loggedInUser = response.user;

        if (
            loggedInUser.role === "organizer"
        ) {
            navigate(
                "/organizer/dashboard"
            );
        } else {
            navigate("/");
        }

    } catch (error) {
        console.error(
            "Login failed:",
            error
        );

        setError(
            error.message ||
            "Unable to login. Please try again."
        );

    } finally {
        setIsLoading(false);
    }
};

  //back

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/*login content*/}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/*back button*/}
          <button
            type="button"
            onClick={handleBack}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-600
              transition
              hover:text-black
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>

            Back
          </button>

          {/*login container*/}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/*logo*/}
              <div className="mb-4 flex justify-center">
                <img
                  src="/logo.png"
                  alt="Nearby"
                  className="h-10 w-auto"
                />
              </div>

              {/*heading*/}
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  {isOrganizer
                    ? "Organizer Login"
                    : "Welcome back"}
                </h1>

                <p className="mt-2 text-gray-500">
                  {isOrganizer
                    ? "Login to manage your events and offers."
                    : "Login to discover what's happening nearby."}
                </p>
              </div>

              {/*organizer toggle*/}
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

                {/*toggle*/}
                <button
                  type="button"
                  onClick={() => {
                    setIsOrganizer(!isOrganizer);
                    setError("");
                  }}
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

              {/*form*/}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
                {/*error*/}
                {error && (
                  <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/*email*/}
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
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
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/*password*/}
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/*remember*/}
                <div className="mb-6 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />

                  <span className="text-sm text-gray-600">
                    Remember me
                  </span>
                </div>

                {/*login*/}
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="
                    w-full
                    rounded-lg
                    bg-black
                    px-5
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-gray-800
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isLoading
                    ? "Logging in..."
                    : isOrganizer
                      ? "Login as Organizer"
                      : "Login"}
                </button>

                {/*register*/}
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
      </main>

      {/*footer*/}
      <Footer />
    </div>
  );
}

export default Login;