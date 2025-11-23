import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Box, Stack, Typography, Collapse } from "@mui/material";

import {
  clearSelectedFlight,
  modifyFlight,
  removeFlight,
  selectedFlight as selectedFlightSelector,
} from "../../features/flights/flightsSlice";
import EditCreateFlightDialog from "../editCreateDialog/EditCreateFlightDialog";
import FlightCard from "../flightCard/FlightCard";

export default function FlightsList({ flights = [], isAdmin = false }) {
  const ANIMATION_MS = 300;
  const dispatch = useDispatch();

  const [editOpen, setEditOpen] = useState(false);

  const [closingIds, setClosingIds] = useState([]);

  const selectedFlight = useSelector(selectedFlightSelector);

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleDelete = (idParam) => {
    const id = idParam ?? selectedFlight?.id;

    if (id && !closingIds.includes(id)) {
      setClosingIds((prev) => [...prev, id]);
      setTimeout(() => {
        dispatch(removeFlight(id));
        if (selectedFlight?.id === id) dispatch(clearSelectedFlight());

        setClosingIds((prev) => prev.filter((x) => x !== id));
      }, ANIMATION_MS);
    }
  };

  const handleClose = () => {
    setEditOpen(false);
    dispatch(clearSelectedFlight());
  };

  const handleSave = (id, updatedFlight) => {
    dispatch(modifyFlight({ flightId: id, flightData: updatedFlight }));
    handleClose();
  };

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
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
        {flights.map((flight) => (
          <Collapse
            key={flight.id}
            in={!closingIds.includes(flight.id)}
            timeout={300}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                m: 0,
              }}
            >
              <FlightCard
                key={flight.id}
                flightInfo={flight}
                isClickable={true}
                isAdmin={isAdmin}
                onEdit={() => handleEdit()}
                onDelete={() => handleDelete(flight.id)}
              />
            </Box>
          </Collapse>
        ))}
      </Stack>
      {editOpen && selectedFlight && (
        <EditCreateFlightDialog
          open={editOpen}
          onClose={handleClose}
          flight={selectedFlight}
          onSave={handleSave}
        />
      )}
      {flights.length === 0 && (
        <Box
          sx={{ display: "flex", justifyContent: "center", m: 2, color: "red" }}
        >
          <Typography variant="h4">
            No flights found for the selected route and date.
          </Typography>
        </Box>
      )}
    </>
  );
}
