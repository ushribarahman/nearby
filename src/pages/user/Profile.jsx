import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  const avatarLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  return (
    <main className="min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">

        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-gray-500">
            Account
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage and view your account information.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="border-b border-gray-100 px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black text-2xl font-semibold text-white">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user?.name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  avatarLetter
                )}
              </div>

              {/* User Name */}
              <div className="min-w-0">
                <h2 className="truncate text-2xl font-semibold text-gray-900">
                  {user?.name || "User"}
                </h2>

                <p className="mt-1 truncate text-sm text-gray-500">
                  {user?.email || "No email available"}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-[#01BBC1]/10 px-3 py-1 text-xs font-semibold text-[#01BBC1]">
                  {roleLabel}
                </span>
              </div>

            </div>
          </div>

          <div className="px-6 py-7 sm:px-8">

            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              {/* Full Name */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Full Name
                </p>

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "Not available"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Email Address
                </p>

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {user?.email || "Not available"}
                  </p>
                </div>
              </div>

              {/* Username */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Username
                </p>

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.username
                      ? `@${user.username}`
                      : "Not available"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Phone Number
                </p>

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.phone || "Not available"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-gray-100 px-6 py-7 sm:px-8">

            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Account Information
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              {/* Account Type */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Account Type
                </p>

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">
                    {roleLabel}
                  </p>
                </div>
              </div>

              {/* Account Status */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Account Status
                </p>

                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  <p className="text-sm font-medium text-gray-900">
                    Active
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            <p className="text-sm text-gray-500">
              Want to explore more?
            </p>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Back to Home
            </Link>

          </div>

        </div>
      </div>
    </main>
  );
}

export default Profile;