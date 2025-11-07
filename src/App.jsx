import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import SocialFixed from "./Components/SocialFixed";
import MainProducts from "./Pages/MainProducts";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<MainProducts />} />
      </Routes>

      <SocialFixed />
      <Footer />
    </Router>
  );
}

export default App;
