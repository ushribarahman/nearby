import StatusBadge from "./StatusBadge";

function OrganizersTable({ organizers, onReview }) {
  if (organizers.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="px-6 py-16 text-center">
          <p className="font-medium text-gray-900">No organizers found</p>
          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-xs uppercase tracking-wide text-gray-500">
              <th className="px-6 py-4 font-medium">Organization</th>
              <th className="px-6 py-4 font-medium">Owner</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {organizers.map((organizer) => (
              <tr key={organizer.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#01BBC1]/10 font-bold text-[#01BBC1]">
                      {organizer.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        {organizer.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Organizer #{organizer.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-700">
                  {organizer.owner}
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm text-gray-700">{organizer.email}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {organizer.phone}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={organizer.status} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => onReview(organizer)}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Review
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrganizersTable;
