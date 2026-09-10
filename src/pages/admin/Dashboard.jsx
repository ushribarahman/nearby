import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DashboardStats from "../../components/admin/DashboardStats";
import RecentEventsTable from "../../components/admin/RecentEventsTable";
import RecentUsersList from "../../components/admin/RecentUsersList";
import QuickActions from "../../components/admin/QuickActions";

const stats = [
  {
    label: "Total Users",
    value: "1,284",
    change: "+12.5%",
    description: "from last month",
  },
  {
    label: "Organizers",
    value: "86",
    change: "+8.2%",
    description: "from last month",
  },
  {
    label: "Total Events",
    value: "342",
    change: "+18.4%",
    description: "from last month",
  },
  {
    label: "Total Offers",
    value: "198",
    change: "+9.7%",
    description: "from last month",
  },
];

const recentEvents = [
  {
    name: "Dhaka Art Festival",
    organizer: "Dhaka Art Club",
    date: "Aug 30, 2026",
    status: "Pending",
  },
  {
    name: "Food & Culture Fest",
    organizer: "Taste Bangladesh",
    date: "Sep 02, 2026",
    status: "Approved",
  },
  {
    name: "Tech Meetup 2026",
    organizer: "Tech Community BD",
    date: "Sep 05, 2026",
    status: "Pending",
  },
  {
    name: "Night Music Festival",
    organizer: "Live Nation BD",
    date: "Sep 08, 2026",
    status: "Approved",
  },
];

const recentUsers = [
  {
    name: "Arif Rahman",
    email: "arif@example.com",
    joined: "Today",
  },
  {
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    joined: "Yesterday",
  },
  {
    name: "Sakib Hasan",
    email: "sakib@example.com",
    joined: "2 days ago",
  },
  {
    name: "Mim Akter",
    email: "mim@example.com",
    joined: "3 days ago",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <AdminPageHeader
          title="Dashboard"
          description="Overview of everything happening across Nearby."
          right={
            <div className="text-sm text-gray-500">
              Friday, August 28, 2026
            </div>
          }
        />

        <DashboardStats stats={stats} />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <RecentEventsTable events={recentEvents} />
          <RecentUsersList users={recentUsers} />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}

export default Dashboard;
