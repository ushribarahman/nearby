import useOffers from "../../hooks/useOffers";
import { Link } from "react-router-dom";
import useOrganizerEvents from "../../hooks/useOrganizerEvents";
import OrganizerEventList from "../../components/organizer/OrganizerEventList";

export default function Dashboard() {
  const { events, loading, error } = useOrganizerEvents();
  const offerData=useOffers("mine");
  const pending = events.filter((event) => event.status === "Pending");
  const approved = events.filter((event) => event.status === "Approved");
  const rejected = events.filter((event) => event.status === "Rejected");
  const stats = [
    { title: "Total Events", count: events.length, status: "all" },
    { title: "Running / Approved", count: approved.length, status: "approved" },
    { title: "Pending Approval", count: pending.length, status: "pending" },
    { title: "Rejected", count: rejected.length, status: "rejected" },
  ];
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Dashboard</h1><p className="mt-2 text-gray-500">Your event submissions and approval status.</p></div>
        <Link to="/organizer/events/new" className="rounded-lg bg-black px-5 py-3 text-white">+ Create Event</Link>
      </div>
      {error && <p role="alert" className="text-red-600">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => <Link key={stat.status} to={"/organizer/events?status=" + stat.status} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">{stat.title}</p><p className="mt-2 text-3xl font-bold">{loading ? "…" : error ? "—" : stat.count}</p>
          <p className="mt-4 text-sm">View events →</p>
        </Link>)}
      </div>
      <section className="space-y-4"><h2 className="text-xl font-semibold">Your Offers</h2>{offerData.error&&<p role="alert" className="text-red-600">{offerData.error}</p>}<div className="grid gap-4 sm:grid-cols-4">{['all','Pending','Approved','Rejected'].map(status=><Link key={status} to={'/organizer/offers?status='+status.toLowerCase()} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">{status==='all'?'Total Offers':status+' Offers'}</p><p className="mt-2 text-3xl font-bold">{offerData.loading?'…':offerData.error?'—':offerData.offers.filter(o=>status==='all'||o.status===status).length}</p></Link>)}</div></section>
      <p className="text-sm text-gray-500">Running / Approved shows events approved for public display.</p>
      {loading ? <p role="status">Loading your events...</p> : !error && <>
        <section><h2 className="mb-4 text-xl font-semibold">Waiting for Approval ({pending.length})</h2><OrganizerEventList events={pending} emptyMessage="You have no events waiting for approval." /></section>
        <section><h2 className="mb-4 text-xl font-semibold">Running / Approved Events ({approved.length})</h2><OrganizerEventList events={approved} emptyMessage="You have no approved events yet." /></section>
        <section><h2 className="mb-4 text-xl font-semibold">Recent Submissions</h2><OrganizerEventList events={events.slice(0, 5)} emptyMessage="Create your first event to get started." /></section>
      </>}
    </div>
  );
}
