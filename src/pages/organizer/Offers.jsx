import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import offersData from "../../data/Offers";
import OfferForm from "../../components/organizer/OfferForm";
import OfferTable from "../../components/organizer/OfferTable";

function Offers() {
  const location = useLocation();
  const [offers, setOffers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status === "pending") {
      setFilterStatus("Pending");
    }
    const mappedOffers = offersData.map(offer => {
    let newStatus = offer.status;
    if (offer.status === "Active") {
        newStatus = "Approved";
    } else if (offer.status === "Upcoming") {
        newStatus = "Pending";  
    }
    return { ...offer, status: newStatus };
    });
    setOffers(mappedOffers);
  }, [location]);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    duration: "",
    image: "",
    category: "",
    originalPrice: "",
    discount: "",
    about: "",
    organizer: {
      name: "",
      description: "",
      email: "",
      phone: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("organizer.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        organizer: {
          ...formData.organizer,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOffer = {
      id: offers.length + 1,
      type: "offer",
      ...formData,
      originalPrice: parseFloat(formData.originalPrice) || 0,
      status: "Pending",
      vendors: ["Vendor 1", "Vendor 2"],
      schedule: [
        { time: formData.time || "TBA", activity: "Offer Available" },
      ],
    };

    if (editingOffer) {
      setOffers(offers.map(o => o.id === editingOffer.id ? { ...o, ...newOffer } : o));
    } else {
      setOffers([...offers, newOffer]);
    }

    resetForm();
    setShowForm(false);
    setEditingOffer(null);
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title || "",
      location: offer.location || "",
      date: offer.date || "",
      time: offer.time || "",
      duration: offer.duration || "",
      image: offer.image || "",
      category: offer.category || "",
      originalPrice: offer.originalPrice?.toString() || "",
      discount: offer.discount || "",
      about: offer.about || "",
      organizer: {
        name: offer.organizer?.name || "",
        description: offer.organizer?.description || "",
        email: offer.organizer?.email || "",
        phone: offer.organizer?.phone || "",
      },
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      setOffers(offers.filter(o => o.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      date: "",
      time: "",
      duration: "",
      image: "",
      category: "",
      originalPrice: "",
      discount: "",
      about: "",
      organizer: {
        name: "Your Organization",
        description: "",
        email: "",
        phone: "",
      },
    });
  };

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

          {!showForm && (
            <button
              onClick={() => {
                resetForm();
                setEditingOffer(null);
                setShowForm(true);
              }}
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
            >
              + Create Offer
            </button>
          )}
        </div>

        <div className="mb-5 flex justify-end">
          <span className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
            {totalOffers} offers
          </span>
        </div>

        {showForm && (
          <OfferForm
            formData={formData}
            editingOffer={editingOffer}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            setShowForm={setShowForm}
            setEditingOffer={setEditingOffer}
          />
        )}

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