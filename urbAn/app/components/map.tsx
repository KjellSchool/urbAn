import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50d2VycHVyYmFudGVhbSIsImEiOiJjbXB0aTVwcnIwOXhkMnpzZWR6dzl6MHRsIn0.6oxgIvb_wD5lre3xUm_5mA";

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

        setUserLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log("ERROR");
        console.log(error);
        setUserLocation({
          latitude: 51.0,
          longitude: 3.0,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    const end = [userLocation.longitude + 0.02, userLocation.latitude + 0.02];

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      zoom: 10,
      antialias: true,
      center: [userLocation.longitude, userLocation.latitude],
    });

    // new mapboxgl.Marker()
    //   .setLngLat([userLocation.longitude, userLocation.latitude])
    //   .addTo(map.current);

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: false,
    });

    const getRoute = async (start, end) => {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/` +
          `${start[0]},${start[1]};${end[0]},${end[1]}` +
          `?geometries=geojson&access_token=${mapboxgl.accessToken}`,
      );

      const json = await query.json();
      return json.routes[0].geometry;
    };

    map.current.addControl(geolocate);

    map.current.on("load", () => {
      geolocate.trigger(); // 👈 THIS is what starts the blue dot

      geolocate.on("geolocate", (e) => {
        map.current.flyTo({
          center: [e.coords.longitude, e.coords.latitude],
          zoom: 16,
        });
      });

      const layers = map.current.getStyle().layers;

      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout?.["text-field"],
      )?.id;

      map.current.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 14,
          paint: {
            "fill-extrusion-color": "#DED7D3",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.8,
          },
        },
        labelLayerId,
      );

      layers.forEach((layer) => {
        if (layer.type === "symbol") {
          map.current.setLayoutProperty(layer.id, "visibility", "none");
        }
      });

      const addRoute = async () => {
        const start = [userLocation.longitude, userLocation.latitude];
        const route = await getRoute(start, end);

        // remove old route if it exists
        if (map.current.getSource("route")) {
          map.current.getSource("route").setData({
            type: "Feature",
            geometry: route,
          });
          return;
        }

        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: route,
          },
        });

        map.current.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#3b82f6",
            "line-width": 8,
          },
        });
      };

      addRoute();
    });

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
