import AdminModal from "./AdminModal";
import StatusBadge from "./StatusBadge";

function EventReviewModal({ event, onClose, onApprove, onReject }) {
  return (
    <AdminModal
      eyebrow="Event Review"
      title={event.title}
      onClose={onClose}
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onApprove(event.id)}
            className="flex-1 rounded-lg bg-[#01BBC1] px-4 py-3 text-sm font-medium text-black transition hover:bg-[#01a5aa]"
          >
            Approve
          </button>

          <button
            type="button"
            onClick={() => onReject(event.id)}
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
