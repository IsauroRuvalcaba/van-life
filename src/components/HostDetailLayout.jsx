import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

export default function HostDetailLayout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const params = useParams();

  const [van, setVan] = useState([]);

  useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVan(data.vans[0]);
      });
  }, [params]);

  return (
    <>
      <div className="van-detail">
        <Link to=".." relative="path" className="back-button">
          &larr; <span>Back to all vans</span>
        </Link>
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
      </div>
      <nav className="host-nav">
        <NavLink
          to="."
          end // this is so the matching of routes stops here. its a nasty bug if left out
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Details
        </NavLink>
        <NavLink
          to="pricing"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Pricing
        </NavLink>
        <NavLink
          to="photos"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Photos
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
