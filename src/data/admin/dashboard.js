// Total Users / Organizers and the "New Users" list are now fetched
// live from MongoDB (see pages/admin/Dashboard.jsx + adminService).
// Events and Offers don't have a real backend yet, so those two stat
// cards and the "Recent Events" table stay mocked for now.

const eventOfferStats = [
  {
    label: "Total Events",
    value: "342",
    description: "mock data — no Event backend yet",
  },
  {
    label: "Total Offers",
    value: "198",
    description: "mock data — no Offer backend yet",
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

export { eventOfferStats, recentEvents };
