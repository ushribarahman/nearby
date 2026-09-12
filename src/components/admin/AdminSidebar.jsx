import Avatar from "../common/Avatar";
import { NavLink, Link } from "react-router-dom";
import logoAdmin from "/logo_admin.png";
import useAuth from "../../hooks/useAuth";
import {
  DashboardIcon,
  UsersIcon,
  OrganizersIcon,
  EventsIcon,
  OffersIcon,
  ReportsIcon,
  LogoutIcon,
} from "./icons";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", Icon: DashboardIcon },
  { to: "/admin/users", label: "Users", Icon: UsersIcon },
  { to: "/admin/organizers", label: "Organizers", Icon: OrganizersIcon },
  { to: "/admin/events", label: "Events", Icon: EventsIcon },
  { to: "/admin/offers", label: "Offers", Icon: OffersIcon },
  { to: "/admin/reports", label: "Reports", Icon: ReportsIcon },
];

function AdminSidebar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };


  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-800 bg-[#0B0D12]">
      {/* Logo */}
      <div className="flex h-18 items-center border-b border-gray-800 px-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <img
            src={logoAdmin}
            alt="Nearby"
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-[#01BBC1]/10 text-[#01BBC1]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Admin identity + logout */}
      <div className="border-t border-gray-800 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#01BBC1] text-sm font-semibold text-black">
            <Avatar user={user} fallback="A" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user?.name || "Admin"}
            </p>
            <p className="truncate text-xs text-gray-500">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
