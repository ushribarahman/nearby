import StatusBadge from "./StatusBadge";

function ReportsTable({ reports, onReview, onClearFilters }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div>
          <h2 className="font-semibold text-gray-900">Reported Content</h2>
          <p className="mt-1 text-sm text-gray-500">
            Reports concerning events and offers.
          </p>
        </div>

        <span className="text-sm text-gray-400">
          {reports.length} result{reports.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-xs uppercase tracking-wide text-gray-500">
              <th className="px-6 py-4 font-medium">Reported Content</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Report Reason</th>
              <th className="px-6 py-4 font-medium">Reported By</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-5">
                    <div className="max-w-[260px]">
                      <p className="truncate font-medium text-gray-900">
                        {report.target}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-400">
                        {report.organizer}
                      </p>
                      <p className="mt-1 text-[11px] text-gray-300">
                        {report.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {report.type}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <p className="max-w-[190px] text-sm text-gray-700">
                      {report.reason}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-700">
                      {report.reportedBy}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-500">
                    {report.date}
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={report.status} />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => onReview(report)}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-20 text-center">
                  <div className="mx-auto max-w-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-500">
                      ✓
                    </div>

                    <p className="mt-4 font-medium text-gray-900">
                      No reports found
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      No reports match the selected filters.
                    </p>

                    {onClearFilters && (
                      <button
                        type="button"
                        onClick={onClearFilters}
                        className="mt-4 text-sm font-medium text-gray-900 underline underline-offset-4"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsTable;
