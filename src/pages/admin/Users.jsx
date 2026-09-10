import { useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import SearchFilterBar from "../../components/admin/SearchFilterBar";
import UsersTable from "../../components/admin/UsersTable";
import UserDetailsModal from "../../components/admin/UserDetailsModal";

const initialUsers = [
  {
    id: 1,
    name: "Arif Rahman",
    email: "arif.rahman@example.com",
    phone: "+880 1712-345678",
    joined: "Aug 28, 2026",
    status: "Active",
    events: 4,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    phone: "+880 1812-456789",
    joined: "Aug 27, 2026",
    status: "Active",
    events: 7,
  },
  {
    id: 3,
    name: "Sakib Hasan",
    email: "sakib.hasan@example.com",
    phone: "+880 1912-567890",
    joined: "Aug 26, 2026",
    status: "Active",
    events: 2,
  },
  {
    id: 4,
    name: "Mim Akter",
    email: "mim.akter@example.com",
    phone: "+880 1612-678901",
    joined: "Aug 25, 2026",
    status: "Suspended",
    events: 1,
  },
  {
    id: 5,
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@example.com",
    phone: "+880 1512-789012",
    joined: "Aug 24, 2026",
    status: "Active",
    events: 5,
  },
  {
    id: 6,
    name: "Farhana Islam",
    email: "farhana.islam@example.com",
    phone: "+880 1312-890123",
    joined: "Aug 23, 2026",
    status: "Active",
    events: 3,
  },
  {
    id: 7,
    name: "Rakib Hossain",
    email: "rakib.hossain@example.com",
    phone: "+880 1412-901234",
    joined: "Aug 22, 2026",
    status: "Suspended",
    events: 0,
  },
  {
    id: 8,
    name: "Samia Chowdhury",
    email: "samia.chowdhury@example.com",
    phone: "+880 1212-123456",
    joined: "Aug 21, 2026",
    status: "Active",
    events: 6,
  },
];

function Users() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || user.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [users, search, filter]);

  const toggleStatus = (id) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Suspended" : "Active",
            }
          : user
      )
    );
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

        <SearchFilterBar
          searchTerm={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search users..."
          filters={["All", "Active", "Suspended"]}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        <UsersTable
          users={filteredUsers}
          onView={setSelectedUser}
          onToggleStatus={toggleStatus}
        />
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
