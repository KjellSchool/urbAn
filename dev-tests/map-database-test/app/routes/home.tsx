import { useEffect, useState } from "react";
import { getRoutes } from "../database/routes";
import { Map } from "../components/map";
import { Routes } from "../components/routes";

export default function Home() {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  async function loadRoutes() {
    const { data } = await getRoutes();
    setRoutes(data);
  }

  useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <>
      <Routes routes={routes} setSelectedRoute={setSelectedRoute} />

      <div className="map-container">
        <Map route={selectedRoute} />
      </div>
    </>
  );
}