import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { dashboardStats, recentActivities } from "../../data/Dashboard";

function StatCard({ title, count, icon, linkTo, linkText }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{count}</p>
        </div>
        <div className="rounded-lg bg-black p-3">
          {icon}
        </div>
      </div>
      <Link to={linkTo} className="mt-4 inline-block text-sm text-black hover:underline">
        {linkText || "View all →"}
      </Link>
    </div>
  );
}

function WaitingApprovalSection({ waitingEvents, waitingOffers }) {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Waiting for Approval</h2>
        <p className="text-sm text-gray-500">Items pending admin review</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        <div className="pr-0 sm:pr-6 pt-4 sm:pt-0 pb-4 sm:pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-black p-2">
                <img 
                  src="https://img.icons8.com/?size=100&id=10053&format=png&color=ffffff" 
                  alt="events" 
                  className="h-5 w-5"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Events</p>
                <p className="text-2xl font-bold text-gray-900">{waitingEvents}</p>
              </div>
            </div>
            <Link 
              to="/organizer/events?status=pending" 
              className="text-sm text-black hover:underline"
            >
              View →
            </Link>
          </div>
        </div>

        <div className="pl-0 sm:pl-6 pt-4 sm:pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-black p-2">
                <img 
                  src="https://img.icons8.com/?size=100&id=95874&format=png&color=ffffff" 
                  alt="offers" 
                  className="h-5 w-5"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Offers</p>
                <p className="text-2xl font-bold text-gray-900">{waitingOffers}</p>
              </div>
            </div>
            <Link 
              to="/organizer/offers?status=pending" 
              className="text-sm text-black hover:underline"
            >
              View →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentActivityTable({ activities }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Recent Activity</h2>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="inline-flex text-xs font-medium capitalize">
                    {activity.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activity.image || "https://via.placeholder.com/40"}
                      alt={activity.title}
                      className="h-8 w-8 rounded object-cover"
                    />
                    <span className="text-sm text-gray-900">{activity.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={"inline-flex rounded-full px-2 py-1 text-xs font-medium " + (
                    activity.status === "Waiting for Approval" ? "bg-gray-100 text-gray-700" : "bg-[#01BBC1]/10 text-[#01BBC1]"
                  )}>
                  {activity.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Dashboard() {
  const stats = dashboardStats;
  const activities = recentActivities;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-500">Manage your events and offers from one place.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          title="Total Events"
          count={stats.totalEvents}
          linkTo="/organizer/events"
          icon={
            <img 
              src="https://img.icons8.com/?size=100&id=10053&format=png&color=ffffff" 
              alt="events" 
              className="h-6 w-6"
            />
          }
          linkText="View all →"
        />

        <StatCard
          title="Total Offers"
          count={stats.totalOffers}
          linkTo="/organizer/offers"
          icon={
            <img 
              src="https://img.icons8.com/?size=100&id=95874&format=png&color=ffffff" 
              alt="offers" 
              className="h-6 w-6"
            />
          }
          linkText="View all →"
        />
      </div>

      <WaitingApprovalSection 
        waitingEvents={stats.waitingEvents} 
        waitingOffers={stats.waitingOffers} 
      />

      <RecentActivityTable activities={activities} />
    </div>
  );
}

export default Dashboard;