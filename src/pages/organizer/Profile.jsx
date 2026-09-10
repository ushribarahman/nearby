import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

function Profile() {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [fields, setFields] = useState({
    name: "",
    username: "",
    organizationName: "",
    email: "",
    phone: "",
    establishedYear: "",
    about: "",
    website: "",
    address: "",
    area: "",
    city: "",
    division: "",
    facebook: "",
    instagram: "",
  });

  // Keep the form in sync with the logged-in organizer (e.g. right after
  // the profile is restored from the session cookie on page load).
  useEffect(() => {
    if (user) {
      setFields({
        name: user.name || "",
        username: user.username || "",
        organizationName: user.organizationName || "",
        email: user.email || "",
        phone: user.phone || "",
        establishedYear: user.establishedYear || "",
        about: user.about || "",
        website: user.website || "",
        address: user.address || "",
        area: user.area || "",
        city: user.city || "",
        division: user.division || "",
        facebook: user.facebook || "",
        instagram: user.instagram || "",
      });
    }
  }, [user]);

  const avatarLetter = user?.organizationName
    ? user.organizationName.charAt(0).toUpperCase()
    : user?.name
    ? user.name.charAt(0).toUpperCase()
    : "O";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFields((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetFieldsFromUser = () => {
    if (user) {
      setFields({
        name: user.name || "",
        username: user.username || "",
        organizationName: user.organizationName || "",
        email: user.email || "",
        phone: user.phone || "",
        establishedYear: user.establishedYear || "",
        about: user.about || "",
        website: user.website || "",
        address: user.address || "",
        area: user.area || "",
        city: user.city || "",
        division: user.division || "",
        facebook: user.facebook || "",
        instagram: user.instagram || "",
      });
    }
  };

  const handleCancel = () => {
    resetFieldsFromUser();
    setError("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    setError("");
    setSuccessMessage("");

    if (!fields.name.trim()) {
      setError("Your name cannot be empty.");
      return;
    }

    if (!fields.organizationName.trim()) {
      setError("Organization name cannot be empty.");
      return;
    }

    if (!fields.email.trim()) {
      setError("Email cannot be empty.");
      return;
    }

    try {
      setIsSaving(true);

      await updateProfile({
        name: fields.name.trim(),
        username: fields.username.trim(),
        organizationName: fields.organizationName.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
        establishedYear: fields.establishedYear.trim(),
        about: fields.about.trim(),
        website: fields.website.trim(),
        address: fields.address.trim(),
        area: fields.area.trim(),
        city: fields.city.trim(),
        division: fields.division.trim(),
        facebook: fields.facebook.trim(),
        instagram: fields.instagram.trim(),
      });

      setSuccessMessage("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const displayOrPlaceholder = (value) => value || "Not available";

  return (
    <main className="min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">
              Organizer Account
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Organization Profile
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Manage how your organization appears on Nearby.
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

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-7 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black text-2xl font-semibold text-white">
                {avatarLetter}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-2xl font-semibold text-gray-900">
                  {displayOrPlaceholder(user?.organizationName)}
                </h2>

                <p className="mt-1 truncate text-sm text-gray-500">
                  {displayOrPlaceholder(user?.email)}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-[#01BBC1]/10 px-3 py-1 text-xs font-semibold text-[#01BBC1]">
                  Organizer
                </span>
              </div>
            </div>
          </div>

          {/* Organization Info */}
          <div className="px-6 py-7 sm:px-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Organization Information
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="Organization Name"
                name="organizationName"
                value={fields.organizationName}
                displayValue={user?.organizationName}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="Enter organization name"
              />

              <Field
                label="Contact Person Name"
                name="name"
                value={fields.name}
                displayValue={user?.name}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="Enter your name"
              />

              <Field
                label="Username"
                name="username"
                value={fields.username}
                displayValue={
                  user?.username ? `@${user.username}` : ""
                }
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="Choose a username"
              />

              <Field
                label="Established Year"
                name="establishedYear"
                value={fields.establishedYear}
                displayValue={user?.establishedYear}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="e.g. 2019"
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-500">
                About
              </label>

              {isEditing ? (
                <textarea
                  name="about"
                  value={fields.about}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell people what your organization does"
                  className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="whitespace-pre-line text-sm text-gray-900">
                    {displayOrPlaceholder(user?.about)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-100 px-6 py-7 sm:px-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="Email Address"
                name="email"
                type="email"
                value={fields.email}
                displayValue={user?.email}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="Enter your email"
              />

              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                value={fields.phone}
                displayValue={user?.phone}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

              <Field
                label="Website"
                name="website"
                value={fields.website}
                displayValue={user?.website}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="https://yourorganization.com"
              />
            </div>
          </div>

          {/* Location */}
          <div className="border-t border-gray-100 px-6 py-7 sm:px-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Location
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="Address"
                name="address"
                value={fields.address}
                displayValue={user?.address}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="Street address"
              />

              <Field
                label="Area"
                name="area"
                value={fields.area}
                displayValue={user?.area}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="e.g. Dhanmondi"
              />

              <Field
                label="City"
                name="city"
                value={fields.city}
                displayValue={user?.city}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="e.g. Dhaka"
              />

              <Field
                label="Division"
                name="division"
                value={fields.division}
                displayValue={user?.division}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="e.g. Dhaka Division"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-gray-100 px-6 py-7 sm:px-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Social Links
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label="Facebook"
                name="facebook"
                value={fields.facebook}
                displayValue={user?.facebook}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
              />

              <Field
                label="Instagram"
                name="instagram"
                value={fields.instagram}
                displayValue={user?.instagram}
                isEditing={isEditing}
                onChange={handleChange}
                placeholder="https://instagram.com/yourpage"
              />
            </div>
          </div>

          {/* Footer / Actions */}
          <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            {isEditing ? (
              <>
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
              </>
            ) : (
              <p className="text-sm text-gray-500">
                This is how your organization appears to visitors.
              </p>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}

// Small local helper so every field doesn't repeat the same
// edit-vs-display markup. Kept in this file since it's only ever used
// here (unlike the shared components under src/components).
function Field({
  label,
  name,
  value,
  displayValue,
  isEditing,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-500">
        {label}
      </label>

      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
        />
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <p className="truncate text-sm font-medium text-gray-900">
            {displayValue || "Not available"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
