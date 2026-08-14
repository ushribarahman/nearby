import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import Offers from "./pages/public/Offers";
import Explore from "./pages/public/Explore";
import About from "./pages/public/About";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;