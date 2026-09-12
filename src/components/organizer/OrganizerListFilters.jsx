export default function OrganizerListFilters({ kind, search, onSearch, status, onStatus, loading, error, count, total }) {
  return <div className="flex flex-wrap items-center gap-3">
    <input aria-label={`Search your ${kind}`} placeholder={`Search ${kind}...`} value={search} onChange={event => onSearch(event.target.value)} className="rounded-lg border border-gray-200 bg-white p-3" />
    <select aria-label="Filter by status" value={status} onChange={event => onStatus(event.target.value)} className="rounded-lg border border-gray-200 bg-white p-3">
      <option value="all">All {kind}</option><option value="pending">Pending</option><option value="approved">Running / Approved</option><option value="rejected">Rejected</option>
    </select>
    <span className="text-sm text-gray-500">{loading ? "Loading..." : error ? "Count unavailable" : `${count} of ${total} ${kind}`}</span>
  </div>;
}
