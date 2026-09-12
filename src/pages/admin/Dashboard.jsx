import useOffers from "../../hooks/useOffers";
import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DashboardStats from "../../components/admin/DashboardStats";
import RecentEventsTable from "../../components/admin/RecentEventsTable";
import RecentUsersList from "../../components/admin/RecentUsersList";
import QuickActions from "../../components/admin/QuickActions";
import { UsersIcon, OrganizersIcon, EventsIcon, OffersIcon } from "../../components/admin/icons";
import adminService from "../../services/adminService";


const formatJoinedDate = (isoDate) => {
  if (!isoDate) return "Unknown";

  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};



function Dashboard() {
  const offerData = useOffers("admin");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userStats, setUserStats] = useState({
    totalUsers: null,
    totalOrganizers: null,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [statsResponse, usersResponse, eventsResponse] = await Promise.all([
          adminService.getStats(),
          adminService.getUsers(),
          adminService.getEvents(),
        ]);

        setUserStats(statsResponse);
        setTotalEvents(eventsResponse.events.length);
        setRecentEvents(eventsResponse.events.slice(0, 4).map((event) => ({
          ...event, name: event.title, organizer: event.organizer?.name || "Unknown organizer",
        })));

        setRecentUsers(
          usersResponse.users.slice(0, 4).map((user) => ({
            name: user.name,
            profilePicture: user.profilePicture,
            email: user.email,
            joined: formatJoinedDate(user.joined),
          }))
        );
      } catch (err) {
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // All counts come from the corresponding live API.
  const stats = [
    {
      label: "Total Users",
      value: isLoading ? "…" : userStats.totalUsers,
      description: "registered users",
      Icon: UsersIcon,
    },
    {
      label: "Organizers",
      value: isLoading ? "…" : userStats.totalOrganizers,
      description: "registered organizers",
      Icon: OrganizersIcon,
    },
    { label: "Total Events", value: isLoading ? "…" : totalEvents, description: "submitted events", Icon: EventsIcon },
    { label: "Total Offers", value: offerData.loading ? "…" : offerData.error ? "—" : offerData.offers.length, description: "submitted offers", Icon: OffersIcon },
  ];

  return (
    <div className="px-8 py-10">
      <AdminPageHeader
        title="Dashboard"
        description="Overview of everything happening across Nearby."
        right={
          <div className="rounded-lg bg-white px-4 py-2 text-sm text-gray-500 shadow-sm">
            {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
          </div>
        }
      />

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <DashboardStats stats={stats} />
      {offerData.error && <p role="alert" className="mt-4 text-red-600">{offerData.error}</p>}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentEventsTable events={recentEvents} />
        <RecentUsersList users={recentUsers} />
      </div>

      <QuickActions />
    </div>
  );
}

export default Dashboard;
