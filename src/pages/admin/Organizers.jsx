import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import OrganizersTable from "../../components/admin/OrganizersTable";
import OrganizerReviewModal from "../../components/admin/OrganizerReviewModal";
import adminService from "../../services/adminService";

function Organizers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);

  const [organizers, setOrganizers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const loadOrganizers = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await adminService.getOrganizers();

        setOrganizers(response.organizers);
      } catch (err) {
        setError(err.message || "Failed to load organizers.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrganizers();
  }, []);

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

  const updateStatus = async (id, status) => {
    setActionError("");

    try {
      const response = await adminService.updateOrganizerStatus(id, status);

      setOrganizers((current) =>
        current.map((organizer) =>
          organizer.id === id
            ? { ...organizer, ...response.organizer }
            : organizer
        )
      );

      setSelectedOrganizer(null);
    } catch (err) {
      setActionError(err.message || "Failed to update organizer status.");
    }
  };

  return (
    <div className="px-8 py-10">
      <AdminPageHeader
        title="Organizers"
        description="Review and manage organizer accounts."
        right={
          <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
            {organizers.length} organizers
          </div>
        }
      />

      {actionError && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {actionError}
        </div>
      )}

      <SearchFilterBar
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search organizers..."
        filters={["All", "Approved", "Pending", "Suspended"]}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      {isLoading ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center text-sm text-gray-500">
          Loading organizers...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center text-sm text-red-600">
          {error}
        </div>
      ) : (
        <OrganizersTable
          organizers={filteredOrganizers}
          onReview={setSelectedOrganizer}
        />
      )}

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
