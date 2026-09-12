import LoadingSkeleton from "../common/LoadingSkeleton";
import { Link } from "react-router-dom";
export default function PendingSubmissions({kind,items,loading,error}) {
 const pending=items.filter(item=>item.status === "Pending");
 return <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
  <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-6 py-5"><div><h2 className="font-semibold">Pending Approval — {kind === "events" ? "Events" : "Offers"}</h2><p className="mt-1 text-sm text-gray-500">{loading ? <span className="inline-block h-4 w-40 animate-pulse rounded bg-gray-200 motion-reduce:animate-none" aria-label="Loading count"/> : error ? "Unavailable" : pending.length+' submissions awaiting review'}</p></div><Link to={'/admin/'+kind+'?status=pending'} className="text-sm font-medium text-teal-600">View all →</Link></div>
  {loading ? <LoadingSkeleton rows={3}/> : error ? <p role="alert" className="p-6 text-red-600">{error}</p> : !loading && <div className="divide-y divide-gray-100">{pending.length===0?<p className="p-6 text-sm text-gray-500">No pending {kind}.</p>:pending.slice(0,5).map(item=><Link key={item.id} to={'/admin/'+kind+'?status=pending'} className="flex items-center gap-4 p-5 hover:bg-gray-50">{item.bannerImage?.url&&<img src={item.bannerImage.url} alt="" className="h-14 w-24 shrink-0 rounded-lg object-cover"/>}<div className="min-w-0"><p className="truncate font-medium">{item.title}</p><p className="text-sm text-gray-500">{typeof item.organizer === 'string'?item.organizer:item.organizer?.name}</p></div><span className="ml-auto text-sm text-amber-600">Pending</span></Link>)}</div>}
 </section>;
}
