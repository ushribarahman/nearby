import AdminModal from "./AdminModal";
import StatusBadge from "./StatusBadge";

function ReportReviewModal({
  report,
  onClose,
  onMarkUnderReview,
  onResolve,
  onDismiss,
}) {
  return (
    <AdminModal
      title={report.target}
      subtitle={`Organized by ${report.organizer}`}
      onClose={onClose}
      maxWidthClassName="max-w-2xl"
      footer={
        <>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
            Take Action
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onMarkUnderReview(report.id)}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Mark Under Review
            </button>

            <button
              type="button"
              onClick={() => onResolve(report.id)}
              className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Resolve Report
            </button>

            <button
              type="button"
              onClick={() => onDismiss(report.id)}
              className="flex-1 rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
            >
              Dismiss
            </button>
          </div>
        </>
      }
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {report.type}
        </span>
        <span className="text-xs text-gray-400">{report.id}</span>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div>
            <p className="text-xs text-gray-400">Current Status</p>
            <div className="mt-1">
              <StatusBadge status={report.status} />
            </div>
          </div>

          <p className="text-xs text-gray-400">Reported {report.date}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Report Information
          </h3>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-400">Reason</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {report.reason}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-400">Reported By</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {report.reportedBy}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Report Description
          </h3>

          <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm leading-6 text-gray-600">
              {report.description}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Reported Content
          </h3>

          <div className="mt-3 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{report.type}</p>
                <p className="mt-1 font-medium text-gray-900">
                  {report.target}
                </p>
              </div>

              <div className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600">
                {report.organizer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminModal>
  );
}

export default ReportReviewModal;
