import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWxzbGFuZGVyIiwiYSI6ImNtcHFsOGUyNDBmZ2gycnNhOWMyajBvemMifQ.8uKbpU9LWO32-4NxRD0w_A";

export function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [4.4025, 51.2194],
      zoom: 12,
      antialias: true,
    });
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
