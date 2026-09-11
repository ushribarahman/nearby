import { useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import OffersTable from "../../components/admin/OffersTable";
import OfferReviewModal from "../../components/admin/OfferReviewModal";
import initialOffers from "../../data/admin/offers";

function Offers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offers, setOffers] = useState(initialOffers);

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

  const updateStatus = (id, status) => {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === id ? { ...offer, status } : offer
      )
    );

    setSelectedOffer(null);
  };

  return (
    <div className="px-8 py-10">
      <AdminPageHeader
        title="Offers"
        description="Review and manage promotional offers."
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

      <OffersTable offers={filteredOffers} onReview={setSelectedOffer} />

      {selectedOffer && (
        <OfferReviewModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onApprove={(id) => updateStatus(id, "Approved")}
          onReject={(id) => updateStatus(id, "Rejected")}
        />
      )}
    </div>
  );
}

export default Offers;
