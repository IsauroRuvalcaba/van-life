import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Header />
      <Outlet /> {/* this creates a hole for the children routes to show */}
      <Footer />
    </div>
  );
}
