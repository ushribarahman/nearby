import { useEffect, useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    organizationName: "",
    email: "",
    phone: "",

    profileImage: "",
    organizationLogo: "",

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

  useEffect(() => {
    const savedProfile = localStorage.getItem("organizerProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSave = () => {
    localStorage.setItem(
      "organizerProfile",
      JSON.stringify(profile)
    );

    window.dispatchEvent(new Event("storage"));

    setIsEditing(false);
  };

  const handleCancel = () => {
    const savedProfile = localStorage.getItem("organizerProfile");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Profile
            </h1>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">

              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-gray-400">
                  {profile.fullName
                    ? profile.fullName.charAt(0).toUpperCase()
                    : "O"}
                </span>
              )}

            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {profile.organizationName || "Your Organization"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {profile.fullName || "Organizer Name"}
              </p>

              <p className="mt-0.5 text-sm text-[#01BBC1]">
                @{profile.username || "username"}
              </p>
            </div>

          </div>

          {isEditing && (
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Profile Image URL
              </label>

              <input
                type="text"
                name="profileImage"
                value={profile.profileImage}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
              />
            </div>
          )}

        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.fullName || "Not added"}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Username
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  @{profile.username || "Not added"}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.email || "Not added"}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>

              {isEditing ? (
                <input
                  type="number"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  inputMode="numeric"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.phone || "Not added"}
                </p>
              )}
            </div>

          </div>

        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Organization Information
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Organization / Business Name
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="organizationName"
                  value={profile.organizationName}
                  onChange={handleChange}
                  placeholder="Enter organization name"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.organizationName || "Not added"}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Established Year
              </label>

              {isEditing ? (
                <input
                  type="number"
                  name="establishedYear"
                  value={profile.establishedYear}
                  onChange={handleChange}
                  placeholder="e.g., 2020"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  min="1900"
                  max="2099"
                  inputMode="numeric"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.establishedYear || "Not added"}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.website || "Not added"}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                About Organization
              </label>

              {isEditing ? (
                <textarea
                  name="about"
                  value={profile.about}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell people about your organization..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white resize-y"
                />
              ) : (
                <p className="text-sm text-gray-900 whitespace-pre-line leading-6">
                  {profile.about || "No description added yet."}
                </p>
              )}
            </div>

          </div>

        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Location
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Enter your organization address"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.address || "Not added"}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Area
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="area"
                  value={profile.area}
                  onChange={handleChange}
                  placeholder="e.g. Dhanmondi"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.area || "Not added"}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                />
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.city || "Not added"}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Division
              </label>

              {isEditing ? (
                <select
                  name="division"
                  value={profile.division}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                >
                  <option value="">Select division</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">
                  {profile.division || "Not added"}
                </p>
              )}
            </div>

          </div>

        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Social Media
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            Add your organization's social media profiles.
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {[
              ["facebook", "Facebook", "https://facebook.com/..."],
              ["instagram", "Instagram", "https://instagram.com/..."],
            ].map(([name, label, placeholder]) => (

              <div key={name}>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {label}
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    name={name}
                    value={profile[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-black focus:bg-white"
                  />
                ) : (
                  <p className="text-sm text-gray-900">
                    {profile[name] || "Not added"}
                  </p>
                )}

              </div>

            ))}

          </div>

        </div>

        {isEditing && (
          <div className="flex justify-end gap-3">

            <button
              onClick={handleCancel}
              className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Save Changes
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;