import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import useSmoothScroll from "./Components/SmoothScroll/useSmoothScroll";

import ScrollToTop from "./Components/GoToTop/ScrollToTop";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Products from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";



function App() {
  useSmoothScroll();
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/categories" element={<Categories />} />


        </Routes>

<Footer/>
      </div>
    </Router>
  );
}

export default App;