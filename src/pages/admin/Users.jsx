import { useEffect, useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import UsersTable from "../../components/admin/UsersTable";
import UserDetailsModal from "../../components/admin/UserDetailsModal";
import adminService from "../../services/adminService";

// The backend sends createdAt as an ISO date string — format it the
// same way the rest of the admin panel displays dates.
const formatJoinedDate = (isoDate) => {
  if (!isoDate) return "Unknown";

  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function Users() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await adminService.getUsers();

        setUsers(
          response.users.map((user) => ({
            ...user,
            joined: formatJoinedDate(user.joined),
          }))
        );
      } catch (err) {
        setError(err.message || "Failed to load users.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || user.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [users, search, filter]);

  const toggleStatus = async (id) => {
    setActionError("");

    const target = users.find((user) => user.id === id);

    if (!target) return;

    const nextStatus = target.status === "Active" ? "Suspended" : "Active";

    try {
      const response = await adminService.updateUserStatus(id, nextStatus);

      setUsers((current) =>
        current.map((user) =>
          user.id === id
            ? {
                ...user,
                ...response.user,
                joined: formatJoinedDate(response.user.joined),
              }
            : user
        )
      );
    } catch (err) {
      setActionError(err.message || "Failed to update user status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <AdminPageHeader
          title="Users"
          description="View and manage all registered users."
          right={
            <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
              {users.length} total users
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
          searchPlaceholder="Search users..."
          filters={["All", "Active", "Suspended"]}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        {isLoading ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center text-sm text-gray-500">
            Loading users...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center text-sm text-red-600">
            {error}
          </div>
        ) : (
          <UsersTable
            users={filteredUsers}
            onView={setSelectedUser}
            onToggleStatus={toggleStatus}
          />
        )}
      </div>

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default Users;
