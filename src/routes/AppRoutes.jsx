import { BrowserRouter, Routes, Route } from "react-router-dom";

//layouts
import PublicLayout from "../layouts/PublicLayout";
import OrganizerLayout from "../layouts/OrganizerLayout";
import AdminLayout from "../layouts/AdminLayout";

//route guards
import ProtectedRoute from "./ProtectedRoute";
import OrganizerRoute from "./OrganizerRoute";
import AdminRoute from "./AdminRoute";

//public pages
import Home from "../pages/public/Home";
import Events from "../pages/public/Events";
import Offers from "../pages/public/Offers";
import Explore from "../pages/public/Explore";
import About from "../pages/public/About";

//public detail components
import EventDetails from "../components/events/EventDetails";
import OfferDetails from "../components/offers/OffersDetails";
import ExploreDetails from "../components/explore/ExploreDetails";

//authentication pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

//organizer pages
import OrganizerDashboard from "../pages/organizer/Dashboard";
import OrganizerEvent from "../pages/organizer/Event";
import OrganizerOffers from "../pages/organizer/Offers";
import OrganizerProfile from "../pages/organizer/Profile";

//admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminOrganizers from "../pages/admin/Organizers";
import AdminEvents from "../pages/admin/Events";
import AdminOffers from "../pages/admin/Offers";
import AdminReports from "../pages/admin/Reports";

//common components
import ScrollToTop from "../components/common/ScrollToTop";

function AppRoutes() {
  return (
    <BrowserRouter>
      {/*scroll to top*/}
      <ScrollToTop />

      <Routes>
        {/*public routes*/}
        <Route element={<PublicLayout />}>
          {/*home*/}
          <Route
            path="/"
            element={<Home />}
          />

          {/*events*/}
          <Route
            path="/events"
            element={<Events />}
          />

          {/*event details*/}
          <Route
            path="/events/:id"
            element={<EventDetails />}
          />

          {/*offers*/}
          <Route
            path="/offers"
            element={<Offers />}
          />

          {/*offer details*/}
          <Route
            path="/offers/:id"
            element={<OfferDetails />}
          />

          {/*explore*/}
          <Route
            path="/explore"
            element={<Explore />}
          />

          {/*explore details*/}
          <Route
            path="/explore/:id"
            element={<ExploreDetails />}
          />

          {/*about*/}
          <Route
            path="/about"
            element={<About />}
          />
        </Route>

        {/*auth routes*/}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/*protected user routes*/}
        <Route element={<ProtectedRoute />}>
          {/*user profile route*/}
        </Route>

        {/*organizer routes*/}
        <Route element={<OrganizerRoute />}>
          <Route element={<OrganizerLayout />}>
            {/*organizer dashboard*/}
            <Route
              path="/organizer/dashboard"
              element={<OrganizerDashboard />}
            />

            {/*organizer events*/}
            <Route
              path="/organizer/events"
              element={<OrganizerEvent />}
            />

            {/*organizer offers*/}
            <Route
              path="/organizer/offers"
              element={<OrganizerOffers />}
            />

            {/*organizer profile*/}
            <Route
              path="/organizer/profile"
              element={<OrganizerProfile />}
            />
          </Route>
        </Route>

        {/*admin routes*/}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            {/*admin dashboard*/}
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            {/*users*/}
            <Route
              path="/admin/users"
              element={<AdminUsers />}
            />

            {/*organizers*/}
            <Route
              path="/admin/organizers"
              element={<AdminOrganizers />}
            />

            {/*events*/}
            <Route
              path="/admin/events"
              element={<AdminEvents />}
            />

            {/*offers*/}
            <Route
              path="/admin/offers"
              element={<AdminOffers />}
            />

            {/*reports*/}
            <Route
              path="/admin/reports"
              element={<AdminReports />}
            />
          </Route>
        </Route>

        {/*fallback*/}
        <Route
          path="*"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;