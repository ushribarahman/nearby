import { useMemo, useState } from "react";

function Users() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Arif Rahman",
      email: "arif.rahman@example.com",
      phone: "+880 1712-345678",
      joined: "Aug 28, 2026",
      status: "Active",
      events: 4,
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      email: "nusrat.jahan@example.com",
      phone: "+880 1812-456789",
      joined: "Aug 27, 2026",
      status: "Active",
      events: 7,
    },
    {
      id: 3,
      name: "Sakib Hasan",
      email: "sakib.hasan@example.com",
      phone: "+880 1912-567890",
      joined: "Aug 26, 2026",
      status: "Active",
      events: 2,
    },
    {
      id: 4,
      name: "Mim Akter",
      email: "mim.akter@example.com",
      phone: "+880 1612-678901",
      joined: "Aug 25, 2026",
      status: "Suspended",
      events: 1,
    },
    {
      id: 5,
      name: "Tanvir Ahmed",
      email: "tanvir.ahmed@example.com",
      phone: "+880 1512-789012",
      joined: "Aug 24, 2026",
      status: "Active",
      events: 5,
    },
    {
      id: 6,
      name: "Farhana Islam",
      email: "farhana.islam@example.com",
      phone: "+880 1312-890123",
      joined: "Aug 23, 2026",
      status: "Active",
      events: 3,
    },
    {
      id: 7,
      name: "Rakib Hossain",
      email: "rakib.hossain@example.com",
      phone: "+880 1412-901234",
      joined: "Aug 22, 2026",
      status: "Suspended",
      events: 0,
    },
    {
      id: 8,
      name: "Samia Chowdhury",
      email: "samia.chowdhury@example.com",
      phone: "+880 1212-123456",
      joined: "Aug 21, 2026",
      status: "Active",
      events: 6,
    },
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || user.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [users, search, filter]);

  const toggleStatus = (id) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Suspended"
                  : "Active",
            }
          : user
      )
    );
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
                Users
              </h1>

              <p className="mt-2 text-gray-500">
                View and manage all registered users.
              </p>
            </div>

            <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              {users.length} total users
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
              placeholder="Search users..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
            />

          </div>

          <div className="flex gap-2">

            {["All", "Active", "Suspended"].map((item) => (
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
            ))}

          </div>

        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] text-left">

              <thead className="border-b border-gray-200 bg-gray-50">
                <tr className="text-xs uppercase tracking-wide text-gray-500">

                  <th className="px-6 py-4 font-medium">
                    User
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Contact
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Joined
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Events
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

                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700">
                            {user.name.charAt(0)}
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {user.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              User #{user.id}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-4">

                        <p className="text-sm text-gray-700">
                          {user.email}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {user.phone}
                        </p>

                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.joined}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {user.events}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            user.status === "Active"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {user.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() => setSelectedUser(user)}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleStatus(user.id)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                              user.status === "Active"
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-black text-white hover:bg-gray-800"
                            }`}
                          >
                            {user.status === "Active"
                              ? "Suspend"
                              : "Activate"}
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-16 text-center"
                    >
                      <p className="font-medium text-gray-900">
                        No users found
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filter.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  User Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  {selectedUser.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
              >
                ×
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <div>
                <p className="text-xs text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Phone
                </p>

                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.phone}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Joined
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedUser.joined}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">
                    Events
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedUser.events}
                  </p>
                </div>

              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Account Status
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    selectedUser.status === "Active"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {selectedUser.status}
                </span>
              </div>

            </div>

            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="mt-6 w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Users;