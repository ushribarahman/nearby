import { locations } from "../../utils/publicFilters";
import { eventCategories, offerCategories } from "../../utils/listingOptions";
export default function ListingFields({kind,category,address={},onCategory,onAddress}) {
 const categories=kind==="events"?eventCategories:offerCategories;
 const fieldClass="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-black focus:bg-white";
 return <div className="col-span-full grid gap-5 sm:grid-cols-2">
  <label className="sm:col-span-2"><span className="mb-2 block text-sm font-medium">Category *</span><select required value={category} onChange={e=>onCategory(e.target.value)} className={fieldClass}><option value="">Select category</option>{category&&!categories.includes(category)&&<option value={category}>{category}</option>}{categories.map(value=><option key={value}>{value}</option>)}</select></label>
  {[['venue','Venue name','e.g. Courtside'],['area','Area / road','e.g. Madani Avenue']].map(([key,label,placeholder])=><label key={key}><span className="mb-2 block text-sm font-medium">{label} *</span><input required value={address[key]||''} onChange={e=>onAddress({...address,[key]:e.target.value})} placeholder={placeholder} className={fieldClass}/></label>)}
  <label><span className="mb-2 block text-sm font-medium">Division *</span><select required value={address.division||''} onChange={e=>onAddress({...address,division:e.target.value})} className={fieldClass}><option value="">Select division</option>{locations.map(city=><option key={city.name}>{city.name}</option>)}</select></label>
  <label><span className="mb-2 block text-sm font-medium">Country</span><input readOnly value="Bangladesh" className={fieldClass}/></label>
 </div>;
}
