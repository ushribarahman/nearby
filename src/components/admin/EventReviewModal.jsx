import ReviewActions from "./ReviewActions";
import AdminModal from "./AdminModal";
import StatusBadge from "./StatusBadge";

function EventReviewModal({ event, onClose, onApprove, onReject, saving, error }) {
  return (
    <AdminModal
      eyebrow="Event Review"
      title={event.title}
      onClose={onClose}
      maxWidthClassName="max-w-4xl"
      footer={<ReviewActions rejected={event.status === "Rejected"} saving={saving} error={error} onApprove={()=>onApprove(event.id)} onReject={reason=>onReject(event.id,reason)} onClose={onClose}/>} 
    >
      <div className="space-y-4">
        {event.status === "Rejected" ? <div className="rounded-xl bg-teal-50 p-4"><p className="font-semibold text-teal-700">Rejected — final decision</p><p className="whitespace-pre-line text-teal-800">{event.rejectionReason || "No reason recorded."}</p></div> : null}
        {saving && <p>Saving status...</p>}
        {event.bannerImage?.url && <img src={event.bannerImage.url} alt={event.title} className="aspect-video w-full rounded-xl object-cover"/>}
        <p className="whitespace-pre-line leading-7 text-gray-600">{event.description}</p>
        <p className="text-sm">{event.time} {event.duration && ' · '+event.duration}</p>
        <div className="grid gap-3 sm:grid-cols-2">{event.tickets?.map(ticket=><div key={ticket.id} className="rounded-xl border p-4"><p className="font-semibold">{ticket.name} — {ticket.price} BDT</p><p className="text-sm text-gray-500">{ticket.description}</p></div>)}</div>
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-400">Organizer</p>
          <p className="mt-1 font-medium text-gray-900">{event.organizer}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">Category</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {event.category}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">Date</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {event.date}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400">Location</p>
          <p className="mt-1 text-sm text-gray-900">{event.location}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Current Status</p>
          <div className="mt-2">
            <StatusBadge status={event.status} />
          </div>
        </div>
      </div>
    </AdminModal>
  );
}

export default EventReviewModal;
