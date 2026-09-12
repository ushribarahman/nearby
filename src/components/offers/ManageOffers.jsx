import LoadingSkeleton from "../common/LoadingSkeleton";
import OrganizerListFilters from "../organizer/OrganizerListFilters";
import {useState} from "react";
import {Link,useSearchParams,useLocation} from "react-router-dom";
import useOffers from "../../hooks/useOffers";
import StatusBadge from "../admin/StatusBadge";
export default function ManageOffers() {
 const {offers,loading,error}=useOffers('mine');const [search,setSearch]=useState('');const [params,setParams]=useSearchParams();const location=useLocation();const status=params.get('status')||'all';
 const filtered=offers.filter(o=>(status==='all'||o.status.toLowerCase()===status.toLowerCase())&&[o.title,o.location,o.category,o.organizer?.name].some(v=>v?.toLowerCase().includes(search.toLowerCase())));
 return <main className="mx-auto max-w-7xl space-y-6 px-6 py-8"><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold">My Offers</h1><p className="mt-2 text-gray-500">Your submitted offers and their current approval status.</p></div>{<Link to="/organizer/offers/new" className="rounded-lg bg-black px-5 py-3 text-white">+ Create Offer</Link>}</div>
 {location.state?.message&&<p role="status" className="text-teal-700">{location.state.message}</p>}{error&&<p role="alert" className="text-red-600">{error}</p>}
 <OrganizerListFilters kind="offers" search={search} onSearch={setSearch} status={status.toLowerCase()} onStatus={status=>setParams({status})} loading={loading} error={error} count={filtered.length} total={offers.length}/>
 {loading?<LoadingSkeleton variant="list" />:!error&&<div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">{filtered.length===0?<p className="p-8 text-gray-500">No offers found.</p>:filtered.map(o=><article key={o.id} className="flex flex-wrap items-center gap-5 p-5"><img src={o.image} alt="" className="h-20 w-28 rounded-xl object-cover"/><div className="min-w-0 flex-1"><p className="text-xs text-teal-600">{o.category}</p><h2 className="font-semibold">{o.title}</h2><p className="text-sm text-gray-500">{o.location} · Until {o.validUntil}</p><p className="text-sm text-teal-700">৳{o.offerPrice} · {o.discount}</p></div><StatusBadge status={o.status}/><Link to={"/organizer/offers/"+o.id} className="rounded-full border px-4 py-2 text-sm">View details</Link></article>)}</div>}
 </main>;
}
