import { useState } from "react";

export default function ReviewActions({ rejected, saving, error, onApprove, onReject, onClose }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [validationError, setValidationError] = useState("");
  const reject = () => {
    if (saving || rejected) return;
    if (!rejecting) { setRejecting(true); return; }
    if (!reason.trim()) { setValidationError("Please enter a rejection reason."); return; }
    setValidationError("");
    onReject(reason.trim());
  };
  return <div className="space-y-3">
    {rejecting && <label className="block"><span className="mb-2 block text-sm font-medium">Rejection reason *</span><textarea autoFocus value={reason} onChange={event => { setReason(event.target.value); setValidationError(""); }} disabled={saving} rows={3} className="w-full rounded-lg border border-gray-200 bg-white p-3" placeholder="Explain why this submission is being rejected" /></label>}
    {(validationError || error) && <p role="alert" className="text-sm text-red-600">{validationError || error}</p>}
    <div className="flex flex-wrap gap-2">
      {!rejecting && <button type="button" disabled={saving || rejected} onClick={onApprove} className="flex-1 rounded-lg bg-[#01BBC1] px-4 py-3 text-sm font-medium text-black disabled:opacity-50">Approve</button>}
      <button type="button" disabled={saving || rejected} onClick={reject} className="flex-1 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600 disabled:opacity-50">{saving ? "Saving..." : rejecting ? "Confirm rejection" : "Reject"}</button>
      {rejecting && <button type="button" disabled={saving} onClick={() => { setRejecting(false); setValidationError(""); }} className="rounded-lg border border-gray-200 px-4 py-3 text-sm">Cancel rejection</button>}
      <button type="button" disabled={saving} onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-3 text-sm">Close</button>
    </div>
  </div>;
}
