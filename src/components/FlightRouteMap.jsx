import "leaflet/dist/leaflet.css";

import { Card, CardContent, Typography } from "@mui/material";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "@elfalem/leaflet-curve";

import { useEffect } from "react";

function FlightRoute({ origin, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!origin || !destination) return;

    // Store curve reference for cleanup
    let curve;

    // Create a curved line (Quadratic Bezier curve)
    const controlPoint = [
      (origin.lat + destination.lat) / 2 + 20, // curve height
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

        <Typography
          variant="subtitle1"
          sx={{
            position: "absolute",
            top: 8,
            left: 16,
            background: "rgba(255,255,255,0.8)",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
          }}
        >
          {fromLabel} ✈ {toLabel}
        </Typography>
      </CardContent>
    </Card>
  );
}
