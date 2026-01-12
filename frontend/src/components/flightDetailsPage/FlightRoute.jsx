import { useEffect } from "react";
import * as LeafletLib from "leaflet";
import { useMap } from "react-leaflet";

function FlightRoute({ origin, destination }) {
  const map = useMap();

  useEffect(() => {
    if (origin && destination) {
      let curve;

      const lngDiff = Math.abs(destination.lng - origin.lng);
      const latDiff = Math.abs(destination.lat - origin.lat);

      const distance = Math.sqrt(lngDiff * lngDiff + latDiff * latDiff);

      const curveFactor = Math.min(Math.max(distance * 0.3, 2), 20);

      const controlPoint = [
        (origin.lat + destination.lat) / 2 + curveFactor,
        (origin.lng + destination.lng) / 2,
      ];

      const latlngs = [
        "M",
        [origin.lat, origin.lng],
        "Q",
        controlPoint,
        [destination.lat, destination.lng],
      ];

      curve = LeafletLib.curve(latlngs, {
        color: "dodgerblue",
        weight: 3,
        dashArray: null,
        smoothFactor: 1,
      }).addTo(map);

      map.fitBounds([origin, destination], { padding: [50, 50] });

      return () => {
        if (curve) {
          map.removeLayer(curve);
        }
      };
    }
  }, [map, origin, destination]);

  return null;
}

export default FlightRoute;
