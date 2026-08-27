import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import OrganizerLayout from "./layouts/OrganizerLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import Offers from "./pages/public/Offers";
import Explore from "./pages/public/Explore";
import About from "./pages/public/About";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Details
import EventDetails from "./components/events/EventDetails";
import OffersDetails from "./components/offers/OffersDetails";
import ExploreDetails from "./components/explore/ExploreDetails";

// Organizer
import OrganizerDashboard from "./pages/organizer/Dashboard";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";

import ScrollToTop from "./components/common/ScrollToTop";

function PublicLayoutWrapper() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}

function OrganizerLayoutWrapper() {
  return (
    <OrganizerLayout>
      <Outlet />
    </OrganizerLayout>
  );
}

function AdminLayoutWrapper() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

function App() {
  return (
    <BrowserRouter>

    <ScrollToTop />
    
      <Routes>

        {/* ==========================================
            PUBLIC SECTION
        ========================================== */}

        <Route element={<PublicLayoutWrapper />}>

          <Route path="/" element={<Home />} />

          <Route path="/events" element={<Events />} />

          <Route path="/events/:id" element={<EventDetails />} />

          <Route path="/offers" element={<Offers />} />

          <Route path="/offers/:id" element={<OffersDetails />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/explore/:id" element={<ExploreDetails />} />

          <Route path="/about" element={<About />} />

        </Route>


        {/* ==========================================
            AUTH SECTION
        ========================================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ==========================================
            ORGANIZER SECTION
        ========================================== */}

        <Route element={<OrganizerLayoutWrapper />}>

          <Route
            path="/organizer/dashboard"
            element={<OrganizerDashboard />}
          />

          <Route
            path="/organizer/events"
            element={
              <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-3xl font-bold">
                  Organizer Events
                </h1>
                <p className="mt-2 text-gray-500">
                  Manage your events here.
                </p>
              </div>
            }
          />

          <Route
            path="/organizer/offers"
            element={
              <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-3xl font-bold">
                  Organizer Offers
                </h1>
                <p className="mt-2 text-gray-500">
                  Manage your offers here.
                </p>
              </div>
            }
          />

          <Route
            path="/organizer/profile"
            element={
              <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-3xl font-bold">
                  Organizer Profile
                </h1>
                <p className="mt-2 text-gray-500">
                  Manage your organizer profile here.
                </p>
              </div>
            }
          />

        </Route>


        {/* ==========================================
            ADMIN SECTION
        ========================================== */}

        <Route element={<AdminLayoutWrapper />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/users"
            element={
              <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-3xl font-bold">
                  Users
                </h1>
                <p className="mt-2 text-gray-500">
                  Manage users here.
                </p>
              </div>
            }
          />

          <Route
            path="/admin/organizers"
            element={
              <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-3xl font-bold">
                  Organizers
                </h1>
                <p className="mt-2 text-gray-500">
                  Manage organizers here.
                </p>
              </div>
            }
          />

          <Route
            path="/admin/events"
            element={
              <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-3xl font-bold">
                  Events
                </h1>
                <p className="mt-2 text-gray-500">
                  Manage events here.
                </p>
              </div>
            }
          />

          <Route
            path="/admin/offers"
            element={
              <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-3xl font-bold">
                  Offers
                </h1>
                <p className="mt-2 text-gray-500">
                  Manage offers here.
                </p>
              </div>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;