import { useMemo, useState } from "react";

function Organizers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);

  const [organizers, setOrganizers] = useState([
    {
      id: 1,
      name: "Dhaka Art Club",
      owner: "Arif Rahman",
      email: "hello@dhakaartclub.com",
      phone: "+880 1712-345678",
      events: 18,
      offers: 5,
      status: "Approved",
    },
    {
      id: 2,
      name: "Taste Bangladesh",
      owner: "Nusrat Jahan",
      email: "hello@tastebd.com",
      phone: "+880 1812-456789",
      events: 12,
      offers: 8,
      status: "Approved",
    },
    {
      id: 3,
      name: "Tech Community BD",
      owner: "Sakib Hasan",
      email: "contact@techbd.com",
      phone: "+880 1912-567890",
      events: 9,
      offers: 2,
      status: "Pending",
    },
    {
      id: 4,
      name: "Live Nation BD",
      owner: "Tanvir Ahmed",
      email: "info@livenationbd.com",
      phone: "+880 1512-789012",
      events: 21,
      offers: 4,
      status: "Approved",
    },
    {
      id: 5,
      name: "City Walk Dhaka",
      owner: "Farhana Islam",
      email: "hello@citywalk.com",
      phone: "+880 1312-890123",
      events: 6,
      offers: 3,
      status: "Pending",
    },
    {
      id: 6,
      name: "Creative Hub",
      owner: "Mim Akter",
      email: "contact@creativehub.com",
      phone: "+880 1612-678901",
      events: 4,
      offers: 1,
      status: "Suspended",
    },
  ]);

  const filteredOrganizers = useMemo(() => {
    return organizers.filter((organizer) => {
      const matchesSearch =
        organizer.name.toLowerCase().includes(search.toLowerCase()) ||
        organizer.owner.toLowerCase().includes(search.toLowerCase()) ||
        organizer.email.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || organizer.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [organizers, search, filter]);

  const updateStatus = (id, status) => {
    setOrganizers((current) =>
      current.map((organizer) =>
        organizer.id === id
          ? { ...organizer, status }
          : organizer
      )
    );

    setSelectedOrganizer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-medium text-gray-500">
            Administration
          </p>

          <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Organizers
              </h1>

              <p className="mt-2 text-gray-500">
                Review and manage organizer accounts.
              </p>
            </div>

            <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              {organizers.length} organizers
            </div>

          </div>

        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">

          <div className="relative w-full md:max-w-sm">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search organizers..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
            />

          </div>

          <div className="flex flex-wrap gap-2">

            {["All", "Approved", "Pending", "Suspended"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    filter === item
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              )
            )}

          </div>

        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px] text-left">

              <thead className="border-b border-gray-200 bg-gray-50">

                <tr className="text-xs uppercase tracking-wide text-gray-500">

                  <th className="px-6 py-4 font-medium">
                    Organization
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Owner
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Contact
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Events
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Offers
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-medium">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOrganizers.map((organizer) => (

                  <tr
                    key={organizer.id}
                    className="transition hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 font-bold text-gray-700">
                          {organizer.name.charAt(0)}
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">
                            {organizer.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Organizer #{organizer.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {organizer.owner}
                    </td>

                    <td className="px-6 py-4">

                      <p className="text-sm text-gray-700">
                        {organizer.email}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {organizer.phone}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {organizer.events}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {organizer.offers}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          organizer.status === "Approved"
                            ? "bg-gray-100 text-gray-700"
                            : organizer.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {organizer.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedOrganizer(organizer)
                          }
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          Review
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {filteredOrganizers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-medium text-gray-900">
                No organizers found
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Review Modal */}
      {selectedOrganizer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Organizer Review
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedOrganizer.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrganizer(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600"
              >
                ×
              </button>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">
                  Owner
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {selectedOrganizer.owner}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">
                  Status
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {selectedOrganizer.status}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">
                  Events
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {selectedOrganizer.events}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-400">
                  Offers
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {selectedOrganizer.offers}
                </p>
              </div>

            </div>

            <div className="mt-5 space-y-3">

              <div>
                <p className="text-xs text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-sm text-gray-900">
                  {selectedOrganizer.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Phone
                </p>

                <p className="mt-1 text-sm text-gray-900">
                  {selectedOrganizer.phone}
                </p>
              </div>

            </div>

            <div className="mt-6 flex gap-2">

              {selectedOrganizer.status !== "Approved" && (
                <button
                  type="button"
                  onClick={() =>
                    updateStatus(
                      selectedOrganizer.id,
                      "Approved"
                    )
                  }
                  className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Approve
                </button>
              )}

              {selectedOrganizer.status !== "Suspended" && (
                <button
                  type="button"
                  onClick={() =>
                    updateStatus(
                      selectedOrganizer.id,
                      "Suspended"
                    )
                  }
                  className="flex-1 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  Suspend
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedOrganizer(null)}
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Organizers;