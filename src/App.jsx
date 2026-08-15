import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import Offers from "./pages/public/Offers";
import Explore from "./pages/public/Explore";
import About from "./pages/public/About";
import Footer from "./components/common/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EventDetails from "./components/events/EventDetails";
import OffersDetails from "./components/offers/OffersDetails";
import ExploreDetails from "./components/explore/ExploreDetails";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />

        <Route path="/offers" element={<Offers />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/offers/:id" element={<OffersDetails />} />
        
        <Route path="/explore/:id" element={<ExploreDetails />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;