import { Link } from "react-router-dom";

const ACTIONS = [
  {
    to: "/admin/users",
    icon: "U",
    title: "Manage Users",
    description: "View and manage platform users.",
  },
  {
    to: "/admin/organizers",
    icon: "O",
    title: "Organizers",
    description: "Review organizer accounts.",
  },
  {
    to: "/admin/events",
    icon: "E",
    title: "Review Events",
    description: "Approve and manage events.",
  },
  {
    to: "/admin/offers",
    icon: "O",
    title: "Review Offers",
    description: "Approve and manage offers.",
  },
];

function QuickActions() {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIONS.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <span className="text-lg">{action.icon}</span>
            </div>

            <h3 className="font-semibold text-gray-900">{action.title}</h3>

            <p className="mt-1 text-sm text-gray-500">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
