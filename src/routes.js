import React from "react";
import { Routes, Route } from "react-router-dom";
import ArticleDetail from "./components/ArticleDetail";
import ArticleList from "./components/ArticleList";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import Sports from "./components/Sports";
import Business from "./components/Business";
import Politics from "./components/Politics";
import Entertainment from "./components/Entertainment";
import Technology from "./components/Technology";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/business" element={<Business />} />
      <Route path="/politics" element={<Politics />} />
      <Route path="/entertainment" element={<Entertainment />} />
      <Route path="/technology" element={<Technology />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/article" element={<ArticleList />} />
      {/* <Route path="/articles" element={<ArticleSection />} /> */}
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
