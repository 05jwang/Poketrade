import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Store from "./pages/Store";
import Trade from "./pages/Trade";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import Creator from "./pages/Creator";
import Battles from "./pages/Battles";

import Profile from "./pages/Profile";
import LoginRewards from "./pages/LoginRewards";
import ForgotPassword from "./pages/ForgotPassword";

import CustomNavbar from "./components/CustomNavbar";
import Footer from "./components/Footer";
import Sell from "./pages/Sell";

import "./App.css";

const App: React.FC = () => {
  const [navbarExpanded, setNavbarExpanded] = useState(false);

  return (
    <div className="app-container">
      <CustomNavbar setNavbarExpanded={setNavbarExpanded} />
      <div className={`content ${navbarExpanded ? "navbar-expanded" : ""}`}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/store" element={<Store />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/creator" element={<Creator />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/loginrewards" element={<LoginRewards />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/battles" element={<Battles />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
