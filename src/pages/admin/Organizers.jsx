import { useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import OrganizersTable from "../../components/admin/OrganizersTable";
import OrganizerReviewModal from "../../components/admin/OrganizerReviewModal";

const initialOrganizers = [
  {
    id: 1,
    name: "Dhaka Art Club",
    owner: "Arif Rahman",
    email: "hello@dhakaartclub.com",
    phone: "+880 1712-345678",
    events: 18,
    offers: 5,
    status: "Approved",
  },
  {
    id: 2,
    name: "Taste Bangladesh",
    owner: "Nusrat Jahan",
    email: "hello@tastebd.com",
    phone: "+880 1812-456789",
    events: 12,
    offers: 8,
    status: "Approved",
  },
  {
    id: 3,
    name: "Tech Community BD",
    owner: "Sakib Hasan",
    email: "contact@techbd.com",
    phone: "+880 1912-567890",
    events: 9,
    offers: 2,
    status: "Pending",
  },
  {
    id: 4,
    name: "Live Nation BD",
    owner: "Tanvir Ahmed",
    email: "info@livenationbd.com",
    phone: "+880 1512-789012",
    events: 21,
    offers: 4,
    status: "Approved",
  },
  {
    id: 5,
    name: "City Walk Dhaka",
    owner: "Farhana Islam",
    email: "hello@citywalk.com",
    phone: "+880 1312-890123",
    events: 6,
    offers: 3,
    status: "Pending",
  },
  {
    id: 6,
    name: "Creative Hub",
    owner: "Mim Akter",
    email: "contact@creativehub.com",
    phone: "+880 1612-678901",
    events: 4,
    offers: 1,
    status: "Suspended",
  },
];

function Organizers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [organizers, setOrganizers] = useState(initialOrganizers);

  const filteredOrganizers = useMemo(() => {
    return organizers.filter((organizer) => {
      const matchesSearch =
        organizer.name.toLowerCase().includes(search.toLowerCase()) ||
        organizer.owner.toLowerCase().includes(search.toLowerCase()) ||
        organizer.email.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || organizer.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [organizers, search, filter]);

  const updateStatus = (id, status) => {
    setOrganizers((current) =>
      current.map((organizer) =>
        organizer.id === id ? { ...organizer, status } : organizer
      )
    );

    setSelectedOrganizer(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <AdminPageHeader
          title="Organizers"
          description="Review and manage organizer accounts."
          right={
            <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              {organizers.length} organizers
            </div>
          }
        />

        <SearchFilterBar
          searchTerm={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search organizers..."
          filters={["All", "Approved", "Pending", "Suspended"]}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        <OrganizersTable
          organizers={filteredOrganizers}
          onReview={setSelectedOrganizer}
        />
      </div>

      {selectedOrganizer && (
        <OrganizerReviewModal
          organizer={selectedOrganizer}
          onClose={() => setSelectedOrganizer(null)}
          onApprove={(id) => updateStatus(id, "Approved")}
          onSuspend={(id) => updateStatus(id, "Suspended")}
        />
      )}
    </div>
  );
}

export default Organizers;
