import AdminModal from "./AdminModal";
import StatusBadge from "./StatusBadge";
import Avatar from "../common/Avatar";

function OrganizerReviewModal({ organizer, onClose, onApprove, onSuspend }) {
  return (
    <AdminModal
      eyebrow="Organizer Review"
      title={organizer.name}
      onClose={onClose}
      maxWidthClassName="max-w-2xl"
      footer={
        <div className="flex gap-2">
          {organizer.status !== "Approved" && (
            <button
              type="button"
              onClick={() => onApprove(organizer.id)}
              className="flex-1 rounded-lg bg-[#01BBC1] px-4 py-3 text-sm font-medium text-black transition hover:bg-[#01a5aa]"
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
      <div className="mb-6 flex items-center gap-5 rounded-2xl bg-gray-50 p-5">
        <div className="h-24 w-24 shrink-0 rounded-full bg-black text-3xl font-semibold text-white"><Avatar user={organizer} fallback="O" /></div>
        <div className="min-w-0"><h3 className="text-xl font-semibold">{organizer.name}</h3><p className="mt-1 break-words text-sm text-gray-500">{organizer.email}</p><p className="mt-2 text-xs text-gray-400">Organizer account</p></div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-400">Owner</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {organizer.owner}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-400">Status</p>
          <div className="mt-1">
            <StatusBadge status={organizer.status} />
          </div>
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
