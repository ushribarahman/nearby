import { useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import OffersTable from "../../components/admin/OffersTable";
import OfferReviewModal from "../../components/admin/OfferReviewModal";

const initialOffers = [
  {
    id: 1,
    title: "20% Off Weekend Dining",
    organizer: "Taste Bangladesh",
    category: "Food",
    discount: "20%",
    validUntil: "Sep 10, 2026",
    status: "Approved",
  },
  {
    id: 2,
    title: "Early Bird Event Tickets",
    organizer: "Live Nation BD",
    category: "Entertainment",
    discount: "15%",
    validUntil: "Sep 05, 2026",
    status: "Pending",
  },
  {
    id: 3,
    title: "Free Coffee with Breakfast",
    organizer: "Grand Dining",
    category: "Food",
    discount: "Free",
    validUntil: "Sep 15, 2026",
    status: "Approved",
  },
  {
    id: 4,
    title: "Photography Workshop Deal",
    organizer: "City Walk Dhaka",
    category: "Photography",
    discount: "25%",
    validUntil: "Sep 20, 2026",
    status: "Pending",
  },
  {
    id: 5,
    title: "Student Tech Pass",
    organizer: "Tech Community BD",
    category: "Technology",
    discount: "30%",
    validUntil: "Sep 25, 2026",
    status: "Rejected",
  },
  {
    id: 6,
    title: "Creative Market Special",
    organizer: "Creative Hub",
    category: "Shopping",
    discount: "10%",
    validUntil: "Sep 30, 2026",
    status: "Approved",
  },
];

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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
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
      </div>

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
