import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getRoute } from "../database/routes.js";
import { getLocation } from "../database/locations.js";
import { getChallenges } from "../database/challenges.js";

import { useUser } from "../contexts/userContext.js";
import { setProfileLocation } from "../database/profiles.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50d2VycHVyYmFudGVhbSIsImEiOiJjbXB0aTVwcnIwOXhkMnpzZWR6dzl6MHRsIn0.6oxgIvb_wD5lre3xUm_5mA";

export function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const challengesRef = useRef([]);
  const popupRef = useRef([]);

  const { currentUser } = useUser();

  const [userLocation, setUserLocation] = useState(null);

  const [urlSearchParams] = useSearchParams();
  const routeId = urlSearchParams.get("route");

  const [activeRoute, setActiveRoute] = useState(null);
  const [activeRouteLocations, setActiveRouteLocation] = useState([]);
  const [fullCoordinateList, setFullCoordinateList] = useState([]);
  const [coordinateString, setCoordinateString] = useState("");

  const [challenges, setChallenges] = useState([]);

  const loadRoute = async (routeId) => {
    if (!routeId) return;

    const { data: route, error } = await getRoute(routeId);
    setActiveRoute(route);

    let activeRouteLocationsNew = [];
    let coordinateList = [];

    const allLocations = await Promise.all(
      route.locations.map(async (location) => {
        const { data: locationData, error } = await getLocation(location);
        return locationData;
      }),
    );

    setActiveRouteLocation(allLocations);

    const toLngLat = ([lat, lng]) => [lng, lat];
    coordinateList = [
      [userLocation?.longitude, userLocation?.latitude],
      ...allLocations.map((location) => toLngLat(location.coordinates)),
    ];
    setFullCoordinateList(coordinateList);

    const result = coordinateList
      .map(([lng, lat]) => `${lng},${lat}`)
      .join(";");
    setCoordinateString(result);
  };

  const loadChallenges = async () => {
    const { data: challenges, error } = await getChallenges();
    setChallenges(challenges);
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    if (!routeId) return;

    loadRoute(routeId);
  }, [routeId, userLocation]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

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

  const updateUserLocation = async () => {
    const profileLocation = [userLocation.latitude, userLocation.longitude];
    console.log(profileLocation);
    console.log(currentUser?.profile_id)
    const { data: updatedUser, error } =
      await setProfileLocation(currentUser?.profile_id, profileLocation);
    console.log(updatedUser);
    console.log(error);
  };

  useEffect(() => {
    if (!userLocation || !currentUser?.profile_id) return;

    updateUserLocation();
    
    const locationInterval = setInterval(() => {
      updateUserLocation();
    }, 5_000);

    return () => clearInterval(locationInterval);
  }, [userLocation]);

  useEffect(() => {
    if (!userLocation) return;
    const end = [userLocation.longitude + 0.02, userLocation.latitude + 0.02];

    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/antwerpurbanteam/cmq7z64tc000d01s53xpofty6",
      zoom: 10,
      antialias: true,
      center: [userLocation.longitude, userLocation.latitude],
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
      geolocate.trigger();

      geolocate.on("geolocate", (e) => {
        const userPos = [e.coords.longitude, e.coords.latitude];

        map.current.flyTo({
          center: userPos,
          zoom: 16,
        });

        challengesRef.current.map((challengeData) => {
          if (challengeData.discovered) return;

          const distance = mapboxgl.LngLat.convert(userPos).distanceTo(
            mapboxgl.LngLat.convert(challengeData.coordinate),
          );

          if (distance < 50) {
            challengeData.discovered = true;

            const popup = new mapboxgl.Popup()
              .setLngLat(challengeData.coordinate)
              .setHTML(`${challengeData.challenge.title}`)
              .addTo(map.current);

            popupRef.current.push(popup);
          }
        });
      });

      const layers = map.current.getStyle().layers;

      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout?.["text-field"],
      )?.id;

      // map.current.addLayer(
      //   {
      //     id: "3d-buildings",
      //     source: "composite",
      //     "source-layer": "building",
      //     filter: ["==", "extrude", "true"],
      //     type: "fill-extrusion",
      //     minzoom: 14,
      //     paint: {
      //       "fill-extrusion-color": "#DED7D3",
      //       "fill-extrusion-height": ["get", "height"],
      //       "fill-extrusion-base": ["get", "min_height"],
      //       "fill-extrusion-opacity": 0.8,
      //     },
      //   },
      //   labelLayerId,
      // );

      // layers.forEach((layer) => {
      //   if (layer.type === "symbol") {
      //     map.current.setLayoutProperty(layer.id, "visibility", "none");
      //   }
      // });
    });

    return () => {
      map.current.remove();
      map.current = null;
    };
  }, [userLocation]);

  // CREATING ROUTES
  useEffect(() => {
    const getRoute = async (coordinates) => {
      if (!coordinates) return;
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/` +
          `${coordinates}` +
          `?geometries=geojson&steps=true&overview=full&access_token=${mapboxgl.accessToken}`,
      );

      const json = await query.json();
      return json.routes[0].geometry;
    };

    const addRoute = async () => {
      if (!coordinateString) return;
      popupRef.current.forEach((p) => p.remove());
      popupRef.current = [];

      challengesRef.current = [];

      const start = [userLocation?.longitude, userLocation?.latitude];
      const route = await getRoute(coordinateString);

      challenges.map((challenge) => {
        if (challenge.route_id === routeId) {
          const randomPoint = Math.floor(
            Math.random() * route.coordinates?.length,
          );
          const randomCoordinate = route.coordinates[randomPoint];
          console.log("added: ", challenge.title, randomCoordinate);

          challengesRef.current.push({
            challenge,
            coordinate: randomCoordinate,
            discovered: false,
          });
        } else {
          console.log("not you");
        }
      });

      // this line gives an error everytime the map is loaded
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
  }, [coordinateString]);

  const renderWaypoints = (coords) => {
    if (!map.current) return;

    // remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    coords.forEach((coord, index) => {
      if (!coord) return;

      const marker = new mapboxgl.Marker({
        color: index === 0 ? "#22c55e" : "#3b82f6", // start vs stops
      })
        .setLngLat(coord)
        .setPopup(new mapboxgl.Popup().setText(`Stop ${index}`))
        .addTo(map.current);

      markersRef.current.push(marker);
    });
  };

  const cancelRoute = () => {
    if (map.current.getSource("route")) {
      map.current.getSource("route").setData({
        type: "Feature",
        geometry: route,
      });
      return;
    }
  };

  useEffect(() => {
    if (!map.current) return;
    if (!fullCoordinateList.length) return;

    renderWaypoints(fullCoordinateList);
  }, [fullCoordinateList]);

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
