export async function getVans() {
  const res = await fetch("/api/vans");
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
