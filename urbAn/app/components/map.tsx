import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getRoute } from "../database/routes.js";
import { getLocation } from "../database/locations.js";
import { getChallenges } from "../database/challenges.js";

import { useUser } from "../contexts/userContext.js";
import { setProfileLocation } from "../database/profiles.js";

import { supabase } from "../database/supabase.js";
import { getProfile } from "../database/profiles.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW50d2VycHVyYmFudGVhbSIsImEiOiJjbXB0aTVwcnIwOXhkMnpzZWR6dzl6MHRsIn0.6oxgIvb_wD5lre3xUm_5mA";

export function Map({ meetRequests, onRouteLoaded }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const challengesRef = useRef([]);
  const popupRef = useRef([]);
  const userLocationRef = useRef(null);
  const meetupMarkersRef = useRef([]);
  const meetupCircleRef = useRef(null);

  const { currentUser } = useUser();

  const [userLocation, setUserLocation] = useState(null);

  const [urlSearchParams] = useSearchParams();
  const routeId = urlSearchParams.get("route");

  const [activeRoute, setActiveRoute] = useState(null);
  const [activeRouteLocations, setActiveRouteLocation] = useState([]);
  const [fullCoordinateList, setFullCoordinateList] = useState([]);
  const [coordinateString, setCoordinateString] = useState("");

  const [challenges, setChallenges] = useState([]);

  const activeMeetup = meetRequests?.find(
    (request) => request.status === "accepted",
  );

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

    const routeChallenges = challenges.filter(
      (challenge) => challenge.route_id === routeId,
    );
  };

  const loadChallenges = async () => {
    const { data: challenges, error } = await getChallenges();
    setChallenges(challenges);
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  useEffect(() => {
    if (!routeId) {
      onRouteLoaded?.({
        route: null,
        locations: [],
        challenges: [],
      });

      setActiveRoute(null);
      setActiveRouteLocation([]);
      setFullCoordinateList([]);
      setCoordinateString("");

      return;
    }

    if (!userLocation) return;

    loadRoute(routeId);
  }, [routeId, userLocation]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.watchPosition(
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
      },
    );
  }, []);

  const updateUserLocation = async () => {
    const location = userLocationRef.current;
    if (!location) return;
    const profileLocation = [
      userLocationRef.current.latitude,
      userLocationRef.current.longitude,
    ];
    const { data: updatedUser, error } = await setProfileLocation(
      currentUser?.profile_id,
      profileLocation,
    );
  };

  useEffect(() => {
    userLocationRef.current = userLocation;
  }, [userLocation]);

  useEffect(() => {
    if (!currentUser?.profile_id) return;

    updateUserLocation();

    const locationInterval = setInterval(() => {
      updateUserLocation();
    }, 5_000);

    return () => clearInterval(locationInterval);
  }, [currentUser?.profile_id]);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/antwerpurbanteam/cmq7z64tc000d01s53xpofty6",
      zoom: 10,
      center: [3.0, 51.0],
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: false,
    });

    map.current.addControl(geolocate);

    map.current.on("load", () => {
      geolocate.trigger();
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!userLocation || !map.current) return;

    map.current.flyTo({
      center: [userLocation.longitude, userLocation.latitude],
      zoom: 16,
    });
  }, [userLocation]);

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

      const routeChallenges = challenges.filter(
        (challenge) => challenge.route_id === routeId,
      );

      onRouteLoaded?.({
        route: activeRoute,
        locations: activeRouteLocations,
        challenges: routeChallenges,
      });

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

  useEffect(() => {
    if (!map.current) return;

    if (!routeId) {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      if (map.current.getLayer("route-line")) {
        map.current.removeLayer("route-line");
      }

      if (map.current.getSource("route")) {
        map.current.removeSource("route");
      }

      setActiveRoute(null);
      setActiveRouteLocation([]);
      setFullCoordinateList([]);
      setCoordinateString("");
    }
  }, [routeId]);

  useEffect(() => {
    if (!map.current) return;

    const meetup = meetRequests?.find((r) => r.status !== "concluded");

    meetupMarkersRef.current.forEach((m) => m.remove());
    meetupMarkersRef.current = [];

    if (map.current.getLayer("meetup-circle")) {
      map.current.removeLayer("meetup-circle");
    }

    if (map.current.getSource("meetup-circle")) {
      map.current.removeSource("meetup-circle");
    }

    if (!meetup || !meetup.location) return;

    const middle = meetup.location;
    const lngLat = [middle[1], middle[0]];

    const marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map.current);

    meetupMarkersRef.current.push(marker);

    map.current.addSource("meetup-circle", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: lngLat,
        },
      },
    });

    map.current.addLayer({
      id: "meetup-circle",
      type: "circle",
      source: "meetup-circle",
      paint: {
        "circle-radius": 25,
        "circle-color": "#ff0000",
        "circle-opacity": 0.2,
      },
    });
  }, [meetRequests]);

  useEffect(() => {
    if (!map.current) return;
    if (!activeMeetup?.location) return;

    let insideStartTime = null;
    let intervalId;

    const checkCompletion = async () => {
      const { data: sender } = await getProfile(activeMeetup.sender_id);
      const { data: receiver } = await getProfile(activeMeetup.receiver_id);

      if (!sender?.coordinates || !receiver?.coordinates) return;

      const center = activeMeetup.location;

      const distance = (a, b) => {
        const [lat1, lon1] = a;
        const [lat2, lon2] = b;

        const R = 6371000;
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;

        const x =
          Math.sin(dLat / 2) ** 2 +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) ** 2;

        return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
      };

      const senderIn = distance(sender.coordinates, center) <= 25;
      const receiverIn = distance(receiver.coordinates, center) <= 25;

      const bothInside = senderIn && receiverIn;

      if (bothInside) {
        if (!insideStartTime) insideStartTime = Date.now();

        if (Date.now() - insideStartTime >= 5000) {
          await supabase
            .from("meet_requests")
            .update({ status: "concluded" })
            .eq("meet_id", activeMeetup.meet_id);

          meetupMarkersRef.current.forEach((m) => m.remove());
          meetupMarkersRef.current = [];

          if (map.current.getLayer("meetup-circle")) {
            map.current.removeLayer("meetup-circle");
          }

          if (map.current.getSource("meetup-circle")) {
            map.current.removeSource("meetup-circle");
          }

          clearInterval(intervalId);
        }
      } else {
        insideStartTime = null;
      }
    };

    intervalId = setInterval(checkCompletion, 1000);

    return () => clearInterval(intervalId);
  }, [activeMeetup]);

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
