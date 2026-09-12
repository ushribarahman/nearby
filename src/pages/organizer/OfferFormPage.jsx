import {useEffect,useState} from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import CoverImageUpload from "../../components/organizer/CoverImageUpload/CoverImageUpload";
import service from "../../services/offerService";
const empty={title:"",category:"",location:"",date:"",time:"",validUntil:"",description:"",redemption:"",originalPrice:"",discountPercent:"",bannerImage:{url:"",publicId:""}};
export default function OfferFormPage(){
 const {id}=useParams();const navigate=useNavigate();const [data,setData]=useState(empty);const [loaded,setLoaded]=useState(!id);const [error,setError]=useState("");const [saving,setSaving]=useState(false);
 useEffect(()=>{if(!id)return;let active=true;service.get(id,true).then(({offer})=>{if(active){setData(offer);setLoaded(true);}}).catch(e=>{if(active)setError(e.message);});return()=>{active=false;};},[id]);
 const submit=async(e)=>{e.preventDefault();if(saving)return;setError("");if(!data.bannerImage?.url || !data.bannerImage?.publicId){setError("Upload an offer banner first.");return;}try{setSaving(true);await service.save(data,id);window.dispatchEvent(new Event("offers-updated"));navigate("/organizer/offers",{state:{message:"Offer submitted for admin review."}});}catch(e){setError(e.message);}finally{setSaving(false);}};
 const change=(e)=>setData(current=>({...current,[e.target.name]:e.target.value}));
 return <main className="mx-auto max-w-7xl px-6 py-8"><Link to="/organizer/offers" className="text-sm text-gray-500">← Back to offers</Link><h1 className="my-5 text-3xl font-bold">{id ? "Edit Offer" : "Create Offer"}</h1><p className="mb-6 text-gray-500">New offers and edits need admin approval before appearing publicly.</p>{error&&<p role="alert" className="mb-5 text-red-600">{error}</p>}{!loaded ? <p>{error ? "Offer unavailable." : "Loading offer..."}</p> : <form onSubmit={submit}><fieldset disabled={saving} className="space-y-6 disabled:opacity-60">
 <CoverImageUpload large imageUrl={data.bannerImage?.url} publicId={undefined} onChange={(bannerImage)=>setData(current=>({...current,bannerImage}))} uploadType="offer" />
 <p className="text-sm text-gray-500">A banner is required.</p>
 <div className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-6 sm:grid-cols-2">
 {[['title','Offer name','text'],['category','Category','text'],['location','Location','text'],['date','Start date','date'],['time','Start time','time'],['validUntil','Valid until','date'],['originalPrice','Original price (BDT)','number'],['discountPercent','Discount (%)','number']].map(([name,label,type])=><label key={name} className={name==='title'?'sm:col-span-2':''}><span className="mb-2 block font-medium">{label} *</span><input required name={name} type={type} value={data[name]} onChange={change} min={type==='number'?0:name==='validUntil'?data.date:undefined} max={name==='discountPercent'?100:undefined} step={type==='number'?'0.01':undefined} className={"w-full rounded-lg border border-gray-200 bg-gray-50 p-3 "+(name==='title'?'text-2xl font-semibold':'')} /></label>)}
 {['description','redemption'].map(name=><label key={name} className="sm:col-span-2"><span className="mb-2 block font-medium">{name==='description'?'Description':'How to redeem / terms'} *</span><textarea required rows={4} name={name} value={data[name]} onChange={change} className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3" /></label>)}
 <p className="font-semibold text-teal-700">Offer price: ৳{Math.round(Number(data.originalPrice)*(100-Number(data.discountPercent)))/100 || 0}</p>
 </div><button className="rounded-full bg-black px-6 py-3 text-white">{saving?'Saving...':'Submit for review'}</button>
 </fieldset></form>}</main>;
}
