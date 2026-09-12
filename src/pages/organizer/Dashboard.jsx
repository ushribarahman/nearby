import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import { Link } from "react-router-dom";
import useOffers from "../../hooks/useOffers";
import useOrganizerEvents from "../../hooks/useOrganizerEvents";
import OrganizerEventList from "../../components/organizer/OrganizerEventList";

const statuses = [
  { status: "all", title: "Total" },
  { status: "approved", title: "Running / Approved" },
  { status: "pending", title: "Pending Approval" },
  { status: "rejected", title: "Rejected" },
];

function SubmissionStats({ kind, items, loading, error }) {
  const title = kind === "events" ? "Events" : "Offers";
  return (
    <section className="space-y-4" aria-label={title + " overview"}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Your {title}</h2>
        <Link to={"/organizer/" + kind + "/new"} className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
          + Create {kind === "events" ? "Event" : "Offer"}
        </Link>
      </div>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statuses.map(({ status, title: label }) => {
          const count = status === "all" ? items.length : items.filter(item => item.status.toLowerCase() === status).length;
          return (
            <Link key={status} to={"/organizer/" + kind + "?status=" + status} className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-teal-500">
              <p className="text-sm text-gray-500">{status === "all" ? "Total " + title : label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{loading ? <LoadingSkeleton variant="number"/> : error ? "—" : count}</p>
              <p className="mt-4 text-sm font-medium text-gray-700 group-hover:text-black">View {kind} →</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function Dashboard() {
  const { events, loading, error } = useOrganizerEvents();
  const offerData = useOffers("mine");
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-500">Your events, offers and approval status at a glance.</p>
      </header>
      <SubmissionStats kind="events" items={events} loading={loading} error={error} />
      <SubmissionStats kind="offers" items={offerData.offers} loading={offerData.loading} error={offerData.error} />
      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div><h2 className="text-xl font-semibold text-gray-900">Recent Submissions</h2><p className="mt-1 text-sm text-gray-500">Your latest event submissions.</p></div>
          <Link to="/organizer/events" className="text-sm font-medium text-gray-700 hover:underline">View all events →</Link>
        </div>
        {loading ? <LoadingSkeleton variant="list" /> : error ? <p className="text-sm text-gray-500">Recent submissions are unavailable.</p> : <OrganizerEventList events={events.slice(0, 5)} emptyMessage="Create your first event to get started." />}
      </section>
    </div>
  );
}
