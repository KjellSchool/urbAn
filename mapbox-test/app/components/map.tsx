import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWxzbGFuZGVyIiwiYSI6ImNtcHFsOGUyNDBmZ2gycnNhOWMyajBvemMifQ.8uKbpU9LWO32-4NxRD0w_A";

export function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    console.log("hello");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("SUCCESS");
        console.log(position);

        const { latitude, longitude } = position.coords;

        console.log(latitude, longitude);
        console.log("fff");

        setUserLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log("ERROR");
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    console.log("1");
    if (!userLocation) return;
    console.log("2");
    if (map.current) return;
    console.log("3");

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",

      // lng first, then lat
      center: [userLocation.longitude, userLocation.latitude],

      zoom: 12,
      antialias: true,
    });

    new mapboxgl.Marker()
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .addTo(map.current);

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      }),
    );

    return () => {
      map.current.remove();
    };
  }, [userLocation]);

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
