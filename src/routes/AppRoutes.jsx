import { BrowserRouter, Routes, Route } from "react-router-dom";

// ==========================================
// Layouts
// ==========================================

import PublicLayout from "../layouts/PublicLayout";
import OrganizerLayout from "../layouts/OrganizerLayout";
import AdminLayout from "../layouts/AdminLayout";

// ==========================================
// Route Guards
// ==========================================

import ProtectedRoute from "./ProtectedRoute";
import OrganizerRoute from "./OrganizerRoute";
import AdminRoute from "./AdminRoute";

// ==========================================
// Public Pages
// ==========================================

import Home from "../pages/public/Home";
import Events from "../pages/public/Events";
import Offers from "../pages/public/Offers";
import Explore from "../pages/public/Explore";
import About from "../pages/public/About";

// ==========================================
// Public Detail Components
// ==========================================

import EventDetails from "../components/events/EventDetails";
import OfferDetails from "../components/offers/OffersDetails";
import ExploreDetails from "../components/explore/ExploreDetails";

// ==========================================
// Authentication Pages
// ==========================================

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// ==========================================
// Organizer Pages
// ==========================================

import OrganizerDashboard from "../pages/organizer/Dashboard";
import OrganizerEvent from "../pages/organizer/Event";
import OrganizerOffers from "../pages/organizer/Offers";
import OrganizerProfile from "../pages/organizer/Profile";

// ==========================================
// Admin Pages
// ==========================================

import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminOrganizers from "../pages/admin/Organizers";
import AdminEvents from "../pages/admin/Events";
import AdminOffers from "../pages/admin/Offers";
import AdminReports from "../pages/admin/Reports";

// ==========================================
// Common Components
// ==========================================

import ScrollToTop from "../components/common/ScrollToTop";


function AppRoutes() {
  return (
    <BrowserRouter>

      {/* Scroll to top on route change */}
      <ScrollToTop />

      <Routes>

        {/* ======================================
            PUBLIC ROUTES
        ====================================== */}

        <Route element={<PublicLayout />}>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Events */}
          <Route
            path="/events"
            element={<Events />}
          />

          {/* Event Details */}
          <Route
            path="/events/:id"
            element={<EventDetails />}
          />

          {/* Offers */}
          <Route
            path="/offers"
            element={<Offers />}
          />

          {/* Offer Details */}
          <Route
            path="/offers/:id"
            element={<OfferDetails />}
          />

          {/* Explore */}
          <Route
            path="/explore"
            element={<Explore />}
          />

          {/* Explore Details */}
          <Route
            path="/explore/:id"
            element={<ExploreDetails />}
          />

          {/* About */}
          <Route
            path="/about"
            element={<About />}
          />

        </Route>


        {/* ======================================
            AUTH ROUTES
        ====================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ======================================
            PROTECTED USER ROUTES
        ====================================== */}

        <Route element={<ProtectedRoute />}>

          {/* User profile route can be added
              when the user Profile page exists. */}

        </Route>


        {/* ======================================
            ORGANIZER ROUTES
        ====================================== */}

        <Route element={<OrganizerRoute />}>

          <Route element={<OrganizerLayout />}>

            {/* Organizer Dashboard */}
            <Route
              path="/organizer/dashboard"
              element={<OrganizerDashboard />}
            />

            {/* Organizer Events */}
            <Route
              path="/organizer/events"
              element={<OrganizerEvent />}
            />

            {/* Organizer Offers */}
            <Route
              path="/organizer/offers"
              element={<OrganizerOffers />}
            />

            {/* Organizer Profile */}
            <Route
              path="/organizer/profile"
              element={<OrganizerProfile />}
            />

          </Route>

        </Route>


        {/* ======================================
            ADMIN ROUTES
        ====================================== */}

        <Route element={<AdminRoute />}>

          <Route element={<AdminLayout />}>

            {/* Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            {/* Users */}
            <Route
              path="/admin/users"
              element={<AdminUsers />}
            />

            {/* Organizers */}
            <Route
              path="/admin/organizers"
              element={<AdminOrganizers />}
            />

            {/* Events */}
            <Route
              path="/admin/events"
              element={<AdminEvents />}
            />

            {/* Offers */}
            <Route
              path="/admin/offers"
              element={<AdminOffers />}
            />

            {/* Reports */}
            <Route
              path="/admin/reports"
              element={<AdminReports />}
            />

          </Route>

        </Route>


        {/* ======================================
            FALLBACK
        ====================================== */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;

