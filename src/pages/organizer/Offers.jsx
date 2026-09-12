import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import offersData from "../../data/offers";
import OfferTable from "../../components/organizer/OfferTable";

function Offers() {
  const location = useLocation();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "pending") {
      setFilterStatus("Pending");
    }

    const mappedOffers = offersData.map((offer) => {
      let newStatus = offer.status;
      if (offer.status === "Active") {
        newStatus = "Approved";
      } else if (offer.status === "Upcoming") {
        newStatus = "Pending";
      }
      return { ...offer, status: newStatus };
    });

    // If we just came back from the create/edit page (OfferFormPage),
    // location.state carries the offer that was created or updated —
    // there's no offers API yet, so this is how it gets folded back in.
    const savedOffer = location.state?.savedOffer;

    if (savedOffer) {
      const alreadyExists = mappedOffers.some((o) => o.id === savedOffer.id);

      setOffers(
        alreadyExists
          ? mappedOffers.map((o) =>
              o.id === savedOffer.id ? { ...o, ...savedOffer } : o
            )
          : [...mappedOffers, savedOffer]
      );
    } else {
      setOffers(mappedOffers);
    }
  }, [location]);

  const handleEdit = (offer) => {
    navigate(`/organizer/offers/${offer.id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      setOffers(offers.filter((o) => o.id !== id));
    }
  };

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || offer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalOffers = offers.length;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Offers
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your offers, create new ones, or edit existing ones.
            </p>
          </div>

          <Link
            to="/organizer/offers/new"
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            + Create Offer
          </Link>
        </div>

        <div className="mb-5 flex justify-end">
          <span className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
            {totalOffers} offers
          </span>
        </div>

        <OfferTable
          filteredOffers={filteredOffers}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

      </div>
    </div>
  );
}

export default Offers;
