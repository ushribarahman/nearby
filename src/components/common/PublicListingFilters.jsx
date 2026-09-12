import { eventCategories, offerCategories } from "../../utils/listingOptions";
import Search from "./Search";
import { locations } from "../../utils/publicFilters";
export default function PublicListingFilters({kind,search,onSearch,location,onLocation,category,onCategory,categories=[]}) {
 return <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-100 p-3">
  <select aria-label="Filter by location" value={location} onChange={event=>onLocation(event.target.value)} className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm focus:border-[#01BBC1] focus:outline-none sm:w-56">
   <option value="all">All locations</option>{locations.map(city=><option key={city.name} value={city.name}>{city.name}</option>)}
  </select>
  <select aria-label="Filter by category" value={category} onChange={event=>onCategory(event.target.value)} className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm sm:w-56"><option value="all">All categories</option>{[...new Set([...(kind === "events" ? eventCategories : offerCategories),...categories])].map(value=><option key={value}>{value}</option>)}</select>
  <div className="w-full sm:w-72"><Search searchTerm={search} onSearchChange={onSearch} placeholder={"Search " + kind + "..."}/></div>
 </div>;
}
