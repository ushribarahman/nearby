import ReviewActions from "./ReviewActions";
import AdminModal from "./AdminModal";
import StatusBadge from "./StatusBadge";

function OfferReviewModal({ offer, onClose, onApprove, onReject, saving, error }) {
  return (
    <AdminModal
      eyebrow="Offer Review"
      title={offer.title}
      onClose={onClose}
      maxWidthClassName="max-w-4xl"
      footer={<ReviewActions rejected={offer.status === "Rejected"} saving={saving} error={error} onApprove={()=>onApprove(offer.id)} onReject={reason=>onReject(offer.id,reason)} onClose={onClose}/>} 
    >
      <div className="space-y-4">
        {offer.status === "Rejected" ? <div className="rounded-xl bg-red-50 p-4"><p className="font-semibold text-red-700">Rejected — final decision</p><p className="whitespace-pre-line">{offer.rejectionReason || "No reason recorded."}</p></div> : null}
        {saving && <p>Saving status...</p>}
        {offer.image && <img src={offer.image} alt={offer.title} className="aspect-video w-full rounded-xl object-cover" />}
        <p className="whitespace-pre-line text-sm text-gray-600">{offer.description}</p>
        <p className="font-medium">৳{offer.offerPrice} <span className="text-gray-400 line-through">৳{offer.originalPrice}</span></p>
        <div><p className="text-xs text-gray-400">How to redeem</p><p className="mt-1 whitespace-pre-line text-sm">{offer.redemption}</p></div>
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-400">Organizer</p>
          <p className="mt-1 font-medium text-gray-900">{offer.organizer}</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">Category</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {offer.category}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">Discount</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {offer.discount}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">Valid Until</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {offer.validUntil}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400">Current Status</p>
          <div className="mt-2">
            <StatusBadge status={offer.status} />
          </div>
        </div>
      </div>
    </AdminModal>
  );
}

export default OfferReviewModal;
