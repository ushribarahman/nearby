import StatusBadge from "./StatusBadge";

function UsersTable({ users, onView, onToggleStatus }) {
  if (users.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="px-6 py-16 text-center">
          <p className="font-medium text-gray-900">No users found</p>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-xs uppercase tracking-wide text-gray-500">
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium">Events</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="transition hover:bg-gray-50">
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
                  <p className="text-sm text-gray-700">{user.email}</p>
                  <p className="mt-1 text-xs text-gray-400">{user.phone}</p>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.joined}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.events}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={user.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(user)}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleStatus(user.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        user.status === "Active"
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {user.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
