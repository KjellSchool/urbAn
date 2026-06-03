import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50d2VycHVyYmFudGVhbSIsImEiOiJjbXB0aTVwcnIwOXhkMnpzZWR6dzl6MHRsIn0.6oxgIvb_wD5lre3xUm_5mA";

export function Map({ route }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapLoaded = useRef(false);

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error);

        setUserLocation({ latitude: 0, longitude: 0 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    if (!userLocation || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [userLocation.longitude, userLocation.latitude],
      zoom: 10,
      antialias: true,
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: false,
    });

    map.current.addControl(geolocate);

    map.current.on("load", () => {
      mapLoaded.current = true;

      geolocate.trigger();

      geolocate.on("geolocate", (e) => {
        map.current.flyTo({
          center: [e.coords.longitude, e.coords.latitude],
          zoom: 16,
        });
      });

      const layers = map.current.getStyle().layers;

      layers.forEach((layer) => {
        if (layer.type === "symbol") {
          map.current.setLayoutProperty(layer.id, "visibility", "none");
        }
      });

      const labelLayerId = layers.find(
        (layer) =>
          layer.type === "symbol" && layer.layout?.["text-field"]
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
            "fill-extrusion-color": "#ff0000",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.8,
          },
        },
        labelLayerId
      );
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [userLocation]);

  useEffect(() => {
    if (!map.current || !mapLoaded.current || !route?.coordinates?.length) {
      return;
    }

    const formattedCoordinates = route.coordinates.map((p) => [
      p.lng,
      p.lat,
    ]);

    const geojson = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: formattedCoordinates,
      },
    };

    const drawRoute = () => {
      if (map.current.getSource("route")) {
        map.current.getSource("route").setData(geojson);
        return;
      }

      map.current.addSource("route", {
        type: "geojson",
        data: geojson,
      });

      map.current.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#3b82f6",
          "line-width": 6,
        },
      });
    };

    if (map.current.isStyleLoaded()) {
      drawRoute();
    } else {
      map.current.once("load", drawRoute);
    }
  }, [route]);

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