import { Link } from "react-router-dom";

function Dashboard() {
  const stats = [
    {
      label: "Total Users",
      value: "1,284",
      change: "+12.5%",
      description: "from last month",
    },
    {
      label: "Organizers",
      value: "86",
      change: "+8.2%",
      description: "from last month",
    },
    {
      label: "Total Events",
      value: "342",
      change: "+18.4%",
      description: "from last month",
    },
    {
      label: "Total Offers",
      value: "198",
      change: "+9.7%",
      description: "from last month",
    },
  ];

  const recentEvents = [
    {
      name: "Dhaka Art Festival",
      organizer: "Dhaka Art Club",
      date: "Aug 30, 2026",
      status: "Pending",
    },
    {
      name: "Food & Culture Fest",
      organizer: "Taste Bangladesh",
      date: "Sep 02, 2026",
      status: "Approved",
    },
    {
      name: "Tech Meetup 2026",
      organizer: "Tech Community BD",
      date: "Sep 05, 2026",
      status: "Pending",
    },
    {
      name: "Night Music Festival",
      organizer: "Live Nation BD",
      date: "Sep 08, 2026",
      status: "Approved",
    },
  ];

  const recentUsers = [
    {
      name: "Arif Rahman",
      email: "arif@example.com",
      joined: "Today",
    },
    {
      name: "Nusrat Jahan",
      email: "nusrat@example.com",
      joined: "Yesterday",
    },
    {
      name: "Sakib Hasan",
      email: "sakib@example.com",
      joined: "2 days ago",
    },
    {
      name: "Mim Akter",
      email: "mim@example.com",
      joined: "3 days ago",
    },
  ];

  const statusClass = (status) => {
    if (status === "Approved") {
      return "bg-gray-100 text-gray-700";
    }

    if (status === "Pending") {
      return "bg-yellow-50 text-yellow-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Overview of everything happening across Nearby.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Friday, August 28, 2026
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-500">
                {stat.label}
              </p>

              <div className="mt-3 flex items-end justify-between gap-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </h2>

                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                  {stat.change}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}

        </div>

        {/* Main grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Recent Events */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white lg:col-span-2">

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

              <div>
                <h2 className="font-semibold text-gray-900">
                  Recent Events
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest event submissions.
                </p>
              </div>

              <Link
                to="/admin/events"
                className="text-sm font-medium text-gray-600 transition hover:text-black"
              >
                View all →
              </Link>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[650px] text-left">

                <thead className="bg-gray-50">
                  <tr className="text-xs uppercase tracking-wide text-gray-500">
                    <th className="px-6 py-3 font-medium">
                      Event
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Organizer
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Date
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {recentEvents.map((event) => (
                    <tr
                      key={event.name}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {event.name}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {event.organizer}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {event.date}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(
                            event.status
                          )}`}
                        >
                          {event.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Recent Users */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

              <div>
                <h2 className="font-semibold text-gray-900">
                  New Users
                </h2>

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

              {recentUsers.map((user) => (
                <div
                  key={user.email}
                  className="flex items-center gap-3 px-6 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700">
                    {user.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400">
                    {user.joined}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-8">

          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              to="/admin/users"
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <span className="text-lg">U</span>
              </div>

              <h3 className="font-semibold text-gray-900">
                Manage Users
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                View and manage platform users.
              </p>
            </Link>

            <Link
              to="/admin/organizers"
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <span className="text-lg">O</span>
              </div>

              <h3 className="font-semibold text-gray-900">
                Organizers
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Review organizer accounts.
              </p>
            </Link>

            <Link
              to="/admin/events"
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <span className="text-lg">E</span>
              </div>

              <h3 className="font-semibold text-gray-900">
                Review Events
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Approve and manage events.
              </p>
            </Link>

            <Link
              to="/admin/offers"
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <span className="text-lg">O</span>
              </div>

              <h3 className="font-semibold text-gray-900">
                Review Offers
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Approve and manage offers.
              </p>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;