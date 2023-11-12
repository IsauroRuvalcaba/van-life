import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Vans() {
  const [searchParams, setSeachParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  const [vans, setVans] = useState([]);

  useEffect(() => {
    fetch("/api/vans")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVans(data.vans);
      });
  }, []);

  const displayVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayVans.map((van) => (
    <div className="van-tile" key={van.id}>
      {/* <Link to={`/vans/${van.id}`} */}
      <Link to={van.id}>
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <Link to="?type=simple" className="van-type simple">
          Simple
        </Link>
        <Link to="?type=luxury" className="van-type luxury">
          Luxury
        </Link>
        <Link to="?type=rugged" className="van-type rugged">
          Rugged
        </Link>
        <Link to="." className="van-type clear-filter">
          Clear Filter
        </Link>
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
