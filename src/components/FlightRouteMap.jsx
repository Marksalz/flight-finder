import "leaflet/dist/leaflet.css";

import { Card, CardContent } from "@mui/material";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "@elfalem/leaflet-curve";

import { useEffect } from "react";

function FlightRoute({ origin, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!origin || !destination) return;

    let curve;

    const lngDiff = Math.abs(destination.lng - origin.lng);
    const latDiff = Math.abs(destination.lat - origin.lat);

    const distance = Math.sqrt(lngDiff * lngDiff + latDiff * latDiff);

    // Dynamic curve height based on distance
    // For short flights: minimal curve, for long flights: more pronounced curve
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

    curve = L.curve(latlngs, {
      color: "dodgerblue",
      weight: 3,
      dashArray: null,
      smoothFactor: 1,
    }).addTo(map);

    map.fitBounds([origin, destination], { padding: [50, 50] });

    // Cleanup only the curve layer
    return () => {
      if (curve) {
        map.removeLayer(curve);
      }
    };
  }, [map, origin, destination]);

  return null;
}

export default function FlightRouteMap({
  origin,
  destination,
  fromLabel,
  toLabel,
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        overflow: "hidden",
        margin: 2,
        maxWidth: "70%",
        width: "100%",
        mx: "auto",
      }}
    >
      <CardContent
        sx={{
          height: { xs: 300, sm: 400 },
          position: "relative",
          p: 0,
        }}
      >
        <MapContainer
          center={[
            (origin.lat + destination.lat) / 2,
            (origin.lng + destination.lng) / 2,
          ]}
          zoom={3}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <FlightRoute origin={origin} destination={destination} />
        </MapContainer>
      </CardContent>
    </Card>
  );
}
