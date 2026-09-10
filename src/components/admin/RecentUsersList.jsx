import { Link } from "react-router-dom";

function RecentUsersList({ users }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div>
          <h2 className="font-semibold text-gray-900">New Users</h2>
          <p className="mt-1 text-sm text-gray-500">
            Recently registered users.
          </p>
        </div>

        <Link
          to="/admin/users"
          className="text-sm font-medium text-gray-600 transition hover:text-black"
        >
          View →
        </Link>
      </div>

      <div className="divide-y divide-gray-100">
        {users.map((user) => (
          <div key={user.email} className="flex items-center gap-3 px-6 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700">
              {user.name.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {user.name}
              </p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>

            <span className="text-xs text-gray-400">{user.joined}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentUsersList;
