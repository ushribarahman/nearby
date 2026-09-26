import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import reportService from "../../services/reportService";

const REASONS = [
  "Fraud or scam",
  "Misleading or false information",
  "Inappropriate or offensive content",
  "Spam or duplicate listing",
  "Prohibited or illegal content",
  "Other",
];

function FlagIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3v18M3 4.5h13l-2 3.5 2 3.5H3"
      />
    </svg>
  );
}

// targetType: "Event" | "Offer"
export default function ReportButton({ targetType, targetId, className = "" }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const label = targetType === "Offer" ? "offer" : "event";

  const openModal = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setOpen(true);
  };

  const close = () => {
    if (submitting) return;
    setOpen(false);
    // Reset once the closing animation/interaction is done.
    setReason("");
    setDetails("");
    setError("");
    setDone(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!reason || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await reportService.submit({
        targetType,
        targetId,
        reason,
        details: details.trim(),
      });
      setDone(true);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={
          "flex shrink-0 items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 " +
          className
        }
      >
        <FlagIcon className="h-4 w-4" />
        Report
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Report this ${label}`}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
          >
            {done ? (
              <div className="py-4 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Report submitted</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Thanks for letting us know. Our team will review this {label}.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Report this {label}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Tell us what's wrong. Reports are reviewed by our team.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="shrink-0 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <fieldset disabled={submitting} className="space-y-2 disabled:opacity-60">
                  <legend className="sr-only">Reason for reporting</legend>
                  {REASONS.map((option) => (
                    <label
                      key={option}
                      className={
                        "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition " +
                        (reason === option
                          ? "border-black bg-gray-50 font-medium text-gray-900"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50")
                      }
                    >
                      <input
                        type="checkbox"
                        checked={reason === option}
                        onChange={() => setReason(reason === option ? "" : option)}
                        className="h-4 w-4 shrink-0 rounded border-gray-300 accent-black"
                      />
                      {option}
                    </label>
                  ))}
                </fieldset>

                <label className="mt-4 block text-sm">
                  Additional details <span className="text-gray-400">(optional)</span>
                  <textarea
                    value={details}
                    onChange={(event) => setDetails(event.target.value)}
                    disabled={submitting}
                    maxLength={500}
                    rows={3}
                    placeholder="Add any extra context that might help our team…"
                    className="mt-2 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm disabled:opacity-60"
                  />
                </label>

                {error && (
                  <p role="alert" className="mt-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!reason || submitting}
                  className="mt-5 w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? "Submitting…" : "Submit report"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
