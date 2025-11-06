import { Box, Stack, Typography } from "@mui/material";
import FlightCard from "./FlightCard";
import EditFlightDialog from "./EditFlightDialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedFlight,
  createFlight,
  modifyFlight,
  removeFlight,
} from "../features/flights/flightsSlice";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function FlightsList({ flights = [], isAdmin = false }) {
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const selectedFlight = useSelector((state) => state.flights.selectedFlight);

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
    dispatch(clearSelectedFlight());
  };

  const handleSave = (id, updatedFlight) => {
    if (id === updatedFlight.id) {
      dispatch(modifyFlight({ flightId: id, flightData: updatedFlight }));
    } else {
      dispatch(createFlight(updatedFlight));
      dispatch(removeFlight(id));
    }
    handleClose();
  };

  if (flights.length === 0) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          No flights found for the selected route and date.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", sm: "70%" },
          maxWidth: "1100px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3, md: 4 },
          mt: { xs: 2, sm: 3 },
          mb: { xs: 2, sm: 3 },
          backgroundColor: "#cfdef390",
          borderRadius: 4,
        }}
      >
        {flights.map((f) => (
          <FlightCard
            key={f.id}
            flightInfo={f}
            isClickable={true}
            isAdmin={isAdmin}
            onEdit={() => handleEdit()}
          />
        ))}
      </Stack>
      {editOpen && selectedFlight && (
        <EditFlightDialog
          open={editOpen}
          onClose={handleClose}
          flight={selectedFlight}
          onSave={handleSave}
        />
      )}
    </>
  );
}
