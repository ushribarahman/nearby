import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useOffers from "../../hooks/useOffers";
import offerService from "../../services/offerService";
import OfferContent from "../../components/offers/OfferContent";
import StatusBadge from "../../components/admin/StatusBadge";

export default function OfferDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { offers, loading, error } = useOffers("mine");
  const offer = offers.find(item => item.id === id);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");
  const remove = async () => {
    if (busy || !window.confirm("Delete this offer permanently?")) return;
    setBusy(true);
    setActionError("");
    try {
      await offerService.remove(id);
      window.dispatchEvent(new Event("offers-updated"));
      navigate("/organizer/offers", { replace: true });
    } catch (error) { setActionError(error.message); }
    finally { setBusy(false); }
  };
  return <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
    <div className="flex items-center justify-between gap-4"><Link to="/organizer/offers" className="text-sm font-semibold text-gray-600">← Back to offers</Link>{offer && <StatusBadge status={offer.status}/>}</div>
    {loading ? <LoadingSkeleton variant="details" /> : error || !offer ? <p role="alert">{error || "Offer not found."}</p> : <>
      {offer.status === "Rejected" && <div className="rounded-xl bg-teal-50 p-5"><h2 className="font-semibold text-teal-700">Rejection reason</h2><p className="mt-2 whitespace-pre-line text-teal-800">{offer.rejectionReason || "No reason recorded."}</p><p className="mt-2 text-sm text-teal-700">This submission cannot be edited or resubmitted.</p></div>}
      <OfferContent offer={offer} fullBanner />
      {actionError && <p role="alert" className="text-red-600">{actionError}</p>}
      <div className="flex gap-3">{offer.status !== "Rejected" && <Link to={`/organizer/offers/${id}/edit`} className="rounded-lg border px-5 py-3">Edit offer</Link>}<button disabled={busy} onClick={remove} className="rounded-lg border px-5 py-3 text-red-600 disabled:opacity-50">{busy ? "Deleting..." : "Delete offer"}</button></div>
    </>}
  </main>;
}
