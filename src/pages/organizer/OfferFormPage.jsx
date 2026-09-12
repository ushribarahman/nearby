import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import offersData from "../../data/offers";
import OfferForm from "../../components/organizer/OfferForm";
import useAuth from "../../hooks/useAuth";

const emptyFormData = {
  title: "",
  location: "",
  date: "",
  time: "",
  duration: "",
  image: "",
  imagePublicId: "",
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
};

function OfferFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const isEdit = Boolean(id);

  const [editingOffer, setEditingOffer] = useState(null);
  const [formData, setFormData] = useState(emptyFormData);

  // Same status-mapping logic Offers.jsx uses, so a direct visit to
  // /organizer/offers/:id/edit (e.g. a page refresh) still finds the offer.
  useEffect(() => {
    if (!isEdit) return;

    const mappedOffers = offersData.map((offer) => {
      let newStatus = offer.status;
      if (offer.status === "Active") newStatus = "Approved";
      else if (offer.status === "Upcoming") newStatus = "Pending";
      return { ...offer, status: newStatus };
    });

    const found = mappedOffers.find((o) => String(o.id) === String(id));

    if (found) {
      setEditingOffer(found);
      setFormData({
        title: found.title || "",
        location: found.location || "",
        date: found.date || "",
        time: found.time || "",
        duration: found.duration || "",
        image: found.image || "",
        imagePublicId: found.imagePublicId || "",
        category: found.category || "",
        originalPrice: found.originalPrice?.toString() || "",
        discount: found.discount || "",
        about: found.about || "",
        organizer: {
          name: found.organizer?.name || "",
          description: found.organizer?.description || "",
          email: found.organizer?.email || "",
          phone: found.organizer?.phone || "",
        },
      });
    }
  }, [id, isEdit]);

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

  const resetForm = () => setFormData(emptyFormData);

  const handleImageChange = ({ url, publicId }) => {
    setFormData((current) => ({
      ...current,
      image: url,
      imagePublicId: publicId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedOffer = {
      id: editingOffer ? editingOffer.id : Date.now(),
      type: "offer",
      ...formData,
      originalPrice: parseFloat(formData.originalPrice) || 0,
      status: editingOffer ? editingOffer.status : "Pending",
      vendors: editingOffer?.vendors || ["Vendor 1", "Vendor 2"],
      schedule: editingOffer?.schedule || [
        { time: formData.time || "TBA", activity: "Offer Available" },
      ],
    };

    // Hand the saved offer back to the table page via router state —
    // there's no offers API yet, so this is how the table picks it up.
    navigate("/organizer/offers", { state: { savedOffer } });
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <button
          onClick={() => navigate("/organizer/offers")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to Offers
        </button>

        <OfferForm
          formData={formData}
          editingOffer={editingOffer}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          setShowForm={() => navigate("/organizer/offers")}
          setEditingOffer={() => {}}
          onImageChange={handleImageChange}
          authToken={authToken}
        />
      </div>
    </div>
  );
}

export default OfferFormPage;
