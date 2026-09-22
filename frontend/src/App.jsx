import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import MovieDetails from "./pages/MovieDetails";

import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;
