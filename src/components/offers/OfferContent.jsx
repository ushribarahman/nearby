import Avatar from "../common/Avatar";
const formatDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : value;
export default function OfferContent({ offer }) {
  return <article>
    <div className="relative mb-6 h-64 w-full overflow-hidden rounded-xl sm:h-96 lg:h-125">
      <img src={offer.image} alt={offer.title} className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-6 sm:p-8">
        <p className="mb-2 text-sm text-white/80">{offer.category}</p>
        <h1 className="text-3xl font-bold text-white">{offer.title}</h1>
        <p className="mt-2 text-white/90">{formatDate(offer.date)} · {offer.time}</p>
      </div>
    </div>
    <div className="mb-6"><h2 className="text-2xl font-bold">{offer.title}</h2><p className="mt-2 text-sm text-gray-500">Offer by {offer.organizer?.name || "Organizer"}</p></div>
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[["Start date",formatDate(offer.date)],["Time",offer.time],["Location",offer.location],["Valid until",formatDate(offer.validUntil)]].map(([label,value]) => <div key={label} className="min-w-0 rounded-lg border border-gray-200 bg-white p-4"><p className="mb-2 text-sm text-gray-500">{label}</p><p className="break-words font-semibold">{value}</p></div>)}
    </div>
    <div className="mb-8 grid gap-8 md:grid-cols-2">
      <section><h3 className="mb-2 text-lg font-semibold">About</h3><p className="whitespace-pre-line break-words leading-7 text-gray-700">{offer.description}</p></section>
      <section className="rounded-lg bg-gray-50 p-6"><h3 className="mb-3 text-lg font-semibold">Offer Details</h3><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="font-medium">{offer.discount}</p><p className="mt-1 text-sm text-gray-500">Valid until {formatDate(offer.validUntil)}</p></div><div className="text-right"><p className="text-sm text-gray-400 line-through">৳{offer.originalPrice}</p><p className="text-2xl font-bold text-green-600">৳{offer.offerPrice}</p></div></div></section>
    </div>
    <section className="mb-8"><h3 className="mb-3 text-lg font-semibold">How to redeem</h3><p className="whitespace-pre-line break-words rounded-lg border border-gray-200 bg-white p-6 leading-7 text-gray-700">{offer.redemption}</p></section>
    {offer.organizer && <section className="mb-8 rounded-lg bg-gray-50 p-6"><h3 className="mb-4 text-lg font-semibold">Organizer</h3><div className="flex items-center gap-3"><div className="h-12 w-12 shrink-0 rounded-full bg-black text-white"><Avatar user={offer.organizer}/></div><p className="font-medium">{offer.organizer.name}</p></div></section>}
  </article>;
}
