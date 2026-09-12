import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import OffersTable from "../../components/admin/OffersTable";
import OfferReviewModal from "../../components/admin/OfferReviewModal";
import offerService from "../../services/offerService";

const displayOffer = (offer) => ({ ...offer, organizer: offer.organizer?.name || "Unknown organizer" });

function Offers() {
  const [search, setSearch] = useState("");
  const [params,setParams]=useSearchParams();
  const filter=["Pending","Approved","Rejected"].find(value=>value.toLowerCase()===params.get("status")) || "All";
  const setFilter=value=>setParams({status:value.toLowerCase()});
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    offerService.list("admin").then(({ offers }) => {
      if (active) setOffers(offers.map(displayOffer));
    }).catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch =
        offer.title.toLowerCase().includes(search.toLowerCase()) ||
        offer.organizer.toLowerCase().includes(search.toLowerCase()) ||
        offer.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || offer.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [offers, search, filter]);

  const updateStatus = async (id, status, rejectionReason) => {
    if (saving) return;
    setSaving(true);
    setReviewError("");
    try {
      const { offer } = await offerService.moderate(id, status, rejectionReason);
      setOffers((current) => current.map((item) => item.id === id ? displayOffer(offer) : item));
      setSelectedOffer(null);
    } catch (err) { setReviewError(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="px-8 py-10">
      <AdminPageHeader
        title="Offers"
        description="Review, approve and manage submitted offers."
        right={
          <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
            {offers.length} total offers
          </div>
        }
      />

      <SearchFilterBar
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search offers..."
        filters={["All", "Pending", "Approved", "Rejected"]}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      {error && <p role="alert" className="mb-4 text-red-600">{error}</p>}
      {loading ? <LoadingSkeleton variant="list" /> : <OffersTable offers={filteredOffers} onReview={item => { setReviewError(""); setSelectedOffer(item); }} />}

      {selectedOffer && (
        <OfferReviewModal
          key={selectedOffer.id}
          offer={selectedOffer}
          saving={saving}
          error={reviewError}
          onClose={() => setSelectedOffer(null)}
          onApprove={(id) => updateStatus(id, "Approved")}
          onReject={(id, reason) => updateStatus(id, "Rejected", reason)}
        />
      )}
    </div>
  );
}

export default Offers;
