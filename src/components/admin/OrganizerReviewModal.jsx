import AdminModal from "./AdminModal";

function OrganizerReviewModal({ organizer, onClose, onApprove, onSuspend }) {
  return (
    <AdminModal
      eyebrow="Organizer Review"
      title={organizer.name}
      onClose={onClose}
      footer={
        <div className="flex gap-2">
          {organizer.status !== "Approved" && (
            <button
              type="button"
              onClick={() => onApprove(organizer.id)}
              className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Approve
            </button>
          )}

          {organizer.status !== "Suspended" && (
            <button
              type="button"
              onClick={() => onSuspend(organizer.id)}
              className="flex-1 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              Suspend
            </button>
          )}

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
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-400">Owner</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {organizer.owner}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-400">Status</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {organizer.status}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-400">Events</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {organizer.events}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-400">Offers</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {organizer.offers}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <p className="text-xs text-gray-400">Email</p>
          <p className="mt-1 text-sm text-gray-900">{organizer.email}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Phone</p>
          <p className="mt-1 text-sm text-gray-900">{organizer.phone}</p>
        </div>
      </div>
    </AdminModal>
  );
}

export default OrganizerReviewModal;
