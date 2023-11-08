import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VanDetail() {
  const params = useParams();

  const [van, setVan] = useState(null);

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVan(data.vans);
      });
  }, [params]);

  return (
    <div className="van-detail-container">
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
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
