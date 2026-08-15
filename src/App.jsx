import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import Offers from "./pages/public/Offers";
import Explore from "./pages/public/Explore";
import About from "./pages/public/About";
import Footer from "./components/common/Footer";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

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

      </Routes>
      <div className="my-10"></div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;