import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxzbGFuZGVyIiwiYSI6ImNtcHFsOGUyNDBmZ2gycnNhOWMyajBvemMifQ.8uKbpU9LWO32-4NxRD0w_A';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,

      // your custom style later
      style: 'mapbox://styles/mapbox/streets-v12',
      
      // we probably want to center the map around the user eventually, not around Antwerp
      // we can always add a popup if they are not in antwerp saying they are not where they are supposed to be
      center: [4.4025, 51.2194], // Antwerp
      zoom: 14,
      pitch: 45,
      bearing: -17,
      antialias: true
    });
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        // this can be done with css instead
        width: '100%',
        height: '100vh' 
      }}
    />
  );
}