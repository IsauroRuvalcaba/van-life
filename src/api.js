export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  const res = await fetch(url);

  //this is checking if 400 or 500 level error are given by server
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();

  return data.vans;
}

// old version that was in Vans.jsx
/* 
fetch("/api/vans")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setVans(data.vans);
    });

*/

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const res = await fetch(url);

  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();

  return data.vans;
}
