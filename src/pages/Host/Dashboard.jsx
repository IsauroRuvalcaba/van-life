import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div>This is the Dashboard</div>
      <Link to="/host/income">Income</Link>
      <Link to="/host/reviews">Reviews</Link>
      <Outlet />
    </>
  );
}
