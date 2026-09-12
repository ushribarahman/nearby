import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";
import { getTicketHistory } from "../../utils/ticketHistory";
import PasswordInput from "../../components/common/PasswordInput";
import ProfilePhotoEditor from "../../components/common/ProfilePhotoEditor";

function Profile() {
  const { user, updateProfile, uploadProfilePicture, removeProfilePicture } =
    useAuth();

  // ---- Personal info editing ----
  const [pictureFile, setPictureFile] = useState(null);
  const [removePicture, setRemovePicture] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [fields, setFields] = useState({
    name: "",
    username: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFields({
        name: user.name || "",
        username: user.username || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // ---- Password change ----
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // ---- Ticket history ----
  const [ticketHistory, setTicketHistory] = useState([]);

  useEffect(() => {
    if (user?.email) {
      setTicketHistory(getTicketHistory(user.email));
    }
  }, [user]);

  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "User";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFields((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (isSaving) return;
    setPictureFile(null);
    setRemovePicture(false);
    if (user) {
      setFields({
        name: user.name || "",
        username: user.username || "",
        phone: user.phone || "",
      });
    }

    setError("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!isEditing || isSaving) return;
    setError("");
    setSuccessMessage("");

    if (!fields.name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    try {
      setIsSaving(true);

      await updateProfile({
        name: fields.name.trim(),
        username: fields.username.trim(),
        phone: fields.phone.trim(),
      });

      if (pictureFile) await uploadProfilePicture(pictureFile);
      else if (removePicture) await removeProfilePicture();
      setPictureFile(null);
      setRemovePicture(false);
      setSuccessMessage("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordFieldChange = (event) => {
    const { name, value } = event.target;

    setPasswordFields((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    const { currentPassword, newPassword, confirmNewPassword } =
      passwordFields;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      setIsChangingPassword(true);

      await authService.changePassword(currentPassword, newPassword);

      setPasswordSuccess("Password updated successfully.");
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setPasswordError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">
              Account
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Manage your account and view your ticket history.
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => {
                setSuccessMessage("");
                setIsEditing(true);
              }}
              className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Edit Profile
            </button>
          )}
        </div>

        {successMessage && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Profile card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="border-b border-gray-100 px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <ProfilePhotoEditor user={user} editing={isEditing} saving={isSaving} file={pictureFile} remove={removePicture} onFile={setPictureFile} onRemove={setRemovePicture} />

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
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Full Name
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  />
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || "Not available"}
                    </p>
                  </div>
                )}
              </div>

              {/* Email — always read-only */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Email Address
                </label>

                <div className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3">
                  <p className="truncate text-sm font-medium text-gray-500">
                    {user?.email || "Not available"}
                  </p>
                </div>

                <p className="mt-1.5 text-xs text-gray-400">
                  Your email can't be changed — it's tied to your account.
                </p>
              </div>

              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Username
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={fields.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  />
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.username
                        ? `@${user.username}`
                        : "Not available"}
                    </p>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Phone Number
                </label>

                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={fields.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  />
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.phone || "Not available"}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {isEditing && (
            <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-sm text-gray-500">
                Make sure your details are correct before saving.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-7 sm:px-8">
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              Change Password
            </h3>
            <p className="mb-6 text-sm text-gray-500">
              You'll need your current password to set a new one.
            </p>

            {passwordSuccess && (
              <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {passwordSuccess}
              </div>
            )}

            {passwordError && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {passwordError}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Current Password
                </label>
                <PasswordInput
                  value={passwordFields.currentPassword}
                  onChange={handlePasswordFieldChange}
                  name="currentPassword"
                  placeholder="Enter your current password"
                  autoComplete="current-password"
                  className="border-gray-200 bg-gray-50 focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  New Password
                </label>
                <PasswordInput
                  value={passwordFields.newPassword}
                  onChange={handlePasswordFieldChange}
                  name="newPassword"
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className="border-gray-200 bg-gray-50 focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500">
                  Confirm New Password
                </label>
                <PasswordInput
                  value={passwordFields.confirmNewPassword}
                  onChange={handlePasswordFieldChange}
                  name="confirmNewPassword"
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                  className="border-gray-200 bg-gray-50 focus:border-black focus:bg-white"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleChangePassword}
              disabled={isChangingPassword}
              className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isChangingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>

        {/* Ticket History */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-6 sm:px-8">
            <h3 className="text-lg font-semibold text-gray-900">
              My Tickets
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Events you've bought tickets for.
            </p>
          </div>

          {ticketHistory.length === 0 ? (
            <div className="px-6 py-12 text-center sm:px-8">
              <p className="text-sm text-gray-500">
                You haven't bought any tickets yet.
              </p>
              <Link
                to="/events"
                className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {ticketHistory.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:px-8"
                >
                  <img
                    src={ticket.eventImage}
                    alt={ticket.eventTitle}
                    className="h-16 w-24 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900">
                      {ticket.eventTitle}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {ticket.eventDate}
                      {ticket.eventLocation
                        ? ` • ${ticket.eventLocation}`
                        : ""}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Purchased{" "}
                      {new Date(ticket.purchasedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div className="text-right sm:shrink-0">
                    <p className="text-sm text-gray-500">
                      {ticket.quantity} ticket
                      {ticket.quantity > 1 ? "s" : ""}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {ticket.total === 0 ? "Free" : `${ticket.total} BDT`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

export default Profile;
