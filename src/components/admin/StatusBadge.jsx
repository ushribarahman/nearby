// Single source of truth for how each status string is colored across
// every admin page (Users, Events, Offers, Organizers, Reports, Dashboard).
const STATUS_STYLES = {
  Active: { badge: "bg-gray-100 text-gray-700", dot: "bg-gray-500" },
  Approved: { badge: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  Resolved: { badge: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  Pending: { badge: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  "Under Review": { badge: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  Suspended: { badge: "bg-red-50 text-red-600", dot: "bg-red-500" },
  Rejected: { badge: "bg-red-50 text-red-600", dot: "bg-red-500" },
  Dismissed: { badge: "bg-gray-100 text-gray-500", dot: "bg-gray-400" },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || {
    badge: "bg-gray-100 text-gray-700",
    dot: "bg-gray-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

export default StatusBadge;
