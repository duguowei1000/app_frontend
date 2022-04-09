
//dotenv inbuilt in CRA
import { useEffect, useState } from "react";
import urlcat from 'urlcat' 

const backend = process.env.REACT_APP_BACKEND ?? "http://localhost:2500" 

function Seed() {
  const [seed, setSeed] = useState([]);

  useEffect(() => {
    fetch(urlcat(backend, "/api/holidays/seed"))
      .then((response) => response.json())
      .then((data) => setSeed(data));
  }, []);

  return (
    <>
      <h1>Seed hihi</h1>
      <pre>{JSON.stringify(seed, null, 2)}</pre>
    </>
  );
}

export default Seed;