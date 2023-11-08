import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet /> {/* this creates a hole for the children routes to show */}
    </>
  );
}
