import AdminModal from "./AdminModal";
import StatusBadge from "./StatusBadge";

function OfferReviewModal({ offer, onClose, onApprove, onReject, saving, error }) {
  return (
    <AdminModal
      eyebrow="Offer Review"
      title={offer.title}
      onClose={onClose}
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => onApprove(offer.id)}
            className="flex-1 rounded-lg bg-[#01BBC1] px-4 py-3 text-sm font-medium text-black transition hover:bg-[#01a5aa]"
          >
            Approve
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => onReject(offer.id)}
            className="flex-1 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {error && <p role="alert" className="text-red-600">{error}</p>}
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
