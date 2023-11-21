import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import { getVans } from "../../api";

// loaders in the elements get access to an object called params
export function loader({ params }) {
  return getVans(params.id);
}

export default function VanDetail() {
  //useParams() hooks only works inside component. So can be used in loader() function above.
  const params = useParams();
  const location = useLocation(); //this is how we grab the state saved in <Link in Vans.jsx
  const van = useLoaderData();

  const linkTo =
    location.state === null ? ".." : `/vans?${location.state.search}`;

  //optional chaining
  const search = location.state?.search || "";
  // same as
  // const search = location.state && location.state.search || ""

  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link
        to={`..${search}`}
        relative="path" //! this is as oppose to being relative to route for the to=""
        className="back-button"
      >
        &larr; <span>Back to {type} vans</span>
      </Link>
      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <button className="link-button">Rent this van</button>
      </div>
      ) : (<h2>Loading...</h2>
    </div>
  );
}

// <div className="van-detail">
//   <img src={van.imageUrl} />
//   <div className="van-info">
//     <h3>{van.name}</h3>
//     <p>
//       ${van.price}
//       <span>/day</span>
//     </p>
//     <p>{van.description}</p>
//   </div>
// </div>
