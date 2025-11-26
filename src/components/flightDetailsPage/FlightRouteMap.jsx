import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@elfalem/leaflet-curve";
import { Card } from "@mui/material";
import FlightRoute from "./FlightRoute";

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
