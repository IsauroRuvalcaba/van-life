import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// https://youtu.be/nDGA3km5He4?t=3349
// https://phenomenal-sunshine-94a254.netlify.app/

export default function Vans() {
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

  const vanElements = vans.map((van) => (
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
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
