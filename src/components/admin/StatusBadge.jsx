// Single source of truth for how each status string is colored across
// every admin page (Users, Events, Offers, Organizers, Reports, Dashboard).
const STATUS_STYLES = {
  Active: "bg-gray-100 text-gray-700",
  Approved: "bg-gray-100 text-gray-700",
  Resolved: "bg-gray-100 text-gray-700",
  Pending: "bg-yellow-50 text-yellow-700",
  "Under Review": "bg-blue-50 text-blue-700",
  Suspended: "bg-red-50 text-red-600",
  Rejected: "bg-red-50 text-red-600",
  Dismissed: "bg-gray-100 text-gray-500",
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "bg-gray-100 text-gray-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
