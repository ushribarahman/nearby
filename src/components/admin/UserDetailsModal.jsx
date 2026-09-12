import AdminModal from "./AdminModal";
import StatusBadge from "./StatusBadge";
import Avatar from "../common/Avatar";

function UserDetailsModal({ user, onClose }) {
  return (
    <AdminModal
      eyebrow="User Details"
      title={user.name}
      onClose={onClose}
      maxWidthClassName="max-w-2xl"
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
      <div className="mb-6 flex items-center gap-5 rounded-2xl bg-gray-50 p-5">
        <div className="h-24 w-24 shrink-0 rounded-full bg-black text-3xl font-semibold text-white"><Avatar user={user} /></div>
        <div className="min-w-0"><h3 className="text-xl font-semibold">{user.name}</h3><p className="mt-1 break-words text-sm text-gray-500">{user.email}</p><div className="mt-3"><StatusBadge status={user.status} /></div></div>
      </div>
      <div className="grid gap-6 rounded-xl border border-gray-100 p-5 sm:grid-cols-2">
        <div>
          <p className="text-xs text-gray-400">Email</p>
          <p className="mt-1 text-sm text-gray-900">{user.email}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Phone</p>
          <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Joined</p>
          <p className="mt-1 text-sm font-medium text-gray-900">
            {user.joined}
          </p>
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
