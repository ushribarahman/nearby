import AdminModal from "./AdminModal";
import StatusBadge from "./StatusBadge";

function UserDetailsModal({ user, onClose }) {
  return (
    <AdminModal
      eyebrow="User Details"
      title={user.name}
      onClose={onClose}
      maxWidthClassName="max-w-md"
      footer={
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Close
        </button>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-400">Email</p>
          <p className="mt-1 text-sm text-gray-900">{user.email}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Phone</p>
          <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">Joined</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {user.joined}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-400">Events</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {user.events}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400">Account Status</p>
          <div className="mt-2">
            <StatusBadge status={user.status} />
          </div>
        </div>
      </div>
    </AdminModal>
  );
}

export default UserDetailsModal;
