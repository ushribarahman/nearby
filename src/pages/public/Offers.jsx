import Search from "../../components/common/Search";
import Filter from "../../components/common/Filter";
import {useState} from "react";
import Card from "../../components/common/Card";
import OfferHero from "../../components/offers/OfferHero";
import useOffers from "../../hooks/useOffers";
export default function Offers(){
 const {offers,loading,error}=useOffers();const [search,setSearch]=useState('');const [category,setCategory]=useState('all');const [filter,setFilter]=useState('all');
 const today=new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Dhaka'});
 const filtered=offers.filter(o=>(filter==='all'||(filter==='live'?o.date<=today:o.date>today))&&(category==='all'||o.category===category)&&[o.title,o.location].some(v=>v.toLowerCase().includes(search.toLowerCase())));
 return <main className="mx-auto max-w-7xl px-6 py-8"><OfferHero/><div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-100 p-3"><Filter selectedFilter={filter} onFilterChange={setFilter}/><div className="flex flex-wrap items-center gap-3"><div className="w-48"><Search searchTerm={search} onSearchChange={setSearch} placeholder="Search offers..."/></div><select aria-label="Category" value={category} onChange={e=>setCategory(e.target.value)} className="max-w-48 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm"><option value="all">All categories</option>{[...new Set(offers.map(o=>o.category))].map(c=><option key={c}>{c}</option>)}</select></div></div>{loading?<p>Loading offers...</p>:error?<p role="alert">{error}</p>:filtered.length===0?<p>No offers available.</p>:<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">{filtered.map(o=><Card key={o.id} data={{...o,date:new Date(o.date+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}}/>)}</div>}</main>;
}
