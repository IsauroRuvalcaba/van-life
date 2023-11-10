import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function VanDetail() {
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

  return <h1>Host Van Details</h1>;
}
