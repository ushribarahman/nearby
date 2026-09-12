export const locations = [
 {name:"Dhaka",aliases:["dhaka","ঢাকা"]},
 {name:"Chattogram",aliases:["chattogram","chittagong","চট্টগ্রাম","চট্রগ্রাম"]},
 {name:"Sylhet",aliases:["sylhet","সিলেট"]},
 {name:"Rajshahi",aliases:["rajshahi","রাজশাহী"]},
 {name:"Rangpur",aliases:["rangpur","রংপুর"]},
 {name:"Khulna",aliases:["khulna","খুলনা"]},
 {name:"Barishal",aliases:["barishal","barisal","বরিশাল"]},
 {name:"Mymensingh",aliases:["mymensingh","ময়মনসিংহ","ময়মনসিংহ"]},
];
const normalize = value => String(value || "").normalize("NFC").toLowerCase().trim();
export function matchesPublicFilters(item, search, location, category = "all") {
 const query=normalize(search);
 const matchesSearch=[item.title,item.category,item.location,item.description,item.about].some(value=>normalize(value).includes(query));
 const city=locations.find(city=>city.name===location);
 const matchesLocation=location==="all" || (item.address?.division ? item.address.division===location : Boolean(city?.aliases.some(alias=>normalize(item.location).includes(normalize(alias)))));
 return matchesSearch && matchesLocation && (category === "all" || normalize(item.category) === normalize(category));
}
