import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer";
import useAuth from "../../hooks/useAuth";

function Register() {
  const [isOrganizer, setIsOrganizer] = useState(false);

  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { register } = useAuth();

  // ==========================================
  // Register
  // ==========================================

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    // ------------------------------
    // Basic validation
    // ------------------------------

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please create a password.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ------------------------------
    // Organizer validation
    // ------------------------------

    if (isOrganizer && !organizationName.trim()) {
      setError("Please enter your organization or business name.");
      return;
    }

    if (isOrganizer && !phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    try {
      setIsLoading(true);

      // ------------------------------
      // Prepare registration data
      // ------------------------------

      const userData = {
        name: name.trim(),
        email: email.trim(),
        password,
        role: isOrganizer ? "organizer" : "user",
      };

      // Add organizer-specific fields only for organizers
      if (isOrganizer) {
        userData.organizationName = organizationName.trim();
        userData.phone = phone.trim();
      }

      // ------------------------------
      // Send registration request
      // ------------------------------

      await register(userData);

      // ------------------------------
      // Registration successful
      // ------------------------------

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      // Give the user a moment to see success message
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("Registration failed:", error);

      setError(
        error.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // Back
  // ==========================================

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* Register Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">

          {/* Back Button */}
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

          {/* Register Container */}
          <div className="flex items-center justify-center">

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
                  {isOrganizer
                    ? "Become an Organizer"
                    : "Create an account"}
                </h1>

                <p className="mt-2 text-gray-500">
                  {isOrganizer
                    ? "Create an organizer account and start sharing your events."
                    : "Join Nearby and discover more around you."}
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
                      ? "You're creating an organizer account."
                      : "Turn this on to create an organizer account."}
                  </p>
                </div>

                {/* Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOrganizer(!isOrganizer);
                    setError("");
                    setSuccess("");
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

              {/* Form */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">

                {/* Error */}
                {error && (
                  <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Success */}
                {success && (
                  <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                    {success}
                  </div>
                )}

                {/* Full Name */}
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/* Organization / Business Name */}
                {isOrganizer && (
                  <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Organization / Business Name
                    </label>

                    <input
                      type="text"
                      value={organizationName}
                      onChange={(event) => {
                        setOrganizationName(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter organization or business name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    />
                  </div>
                )}

                {/* Email */}
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
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/* Phone - Organizer */}
                {isOrganizer && (
                  <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                    />
                  </div>
                )}

                {/* Password */}
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Create a password"
                    autoComplete="new-password"
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
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                {/* Register */}
                <button
                  type="button"
                  onClick={handleRegister}
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
                    ? "Creating Account..."
                    : isOrganizer
                      ? "Create Organizer Account"
                      : "Create Account"}
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
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Register;