import { useEffect } from "react";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import * as LeafletLib from "leaflet";
import "leaflet/dist/leaflet.css";
import "@elfalem/leaflet-curve";

import { Card } from "@mui/material";

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

export default function FlightRouteMap({ origin, destination }) {
  return (
    <Card
      sx={{
        height: { xs: 300, sm: 400 },
        position: "relative",
        p: 0,
        borderRadius: "16px",
      }}
    >
      <MapContainer
        center={[
          (origin.lat + destination.lat) / 2,
          (origin.lng + destination.lng) / 2,
        ]}
        zoom={3}
        style={{ height: "100%", width: "100%", borderRadius: "16px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <FlightRoute origin={origin} destination={destination} />
      </MapContainer>
    </Card>
  );
}
