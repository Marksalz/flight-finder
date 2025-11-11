import { Box, Stack, Typography, Collapse } from "@mui/material";
import FlightCard from "./FlightCard";
import EditCreateFlightDialog from "./EditCreateFlightDialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedFlight,
  createFlight,
  modifyFlight,
  removeFlight,
} from "../features/flights/flightsSlice";

export default function FlightsList({ flights = [], isAdmin = false }) {
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);
  const [closingIds, setClosingIds] = useState([]);
  const selectedFlight = useSelector((state) => state.flights.selectedFlight);

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleDelete = (idParam) => {
    const id = idParam ?? selectedFlight?.id;
    if (!id) return;
    if (closingIds.includes(id)) return;
    const ANIM_MS = 300;
    setClosingIds((prev) => [...prev, id]);
    setTimeout(() => {
      dispatch(removeFlight(id));
      if (selectedFlight?.id === id) dispatch(clearSelectedFlight());
      setClosingIds((prev) => prev.filter((x) => x !== id));
    }, ANIM_MS);
  };

  const handleClose = () => {
    setEditOpen(false);
    dispatch(clearSelectedFlight());
  };

  const handleSave = (id, updatedFlight) => {
    dispatch(modifyFlight({ flightId: id, flightData: updatedFlight }));
    handleClose();
  };

  if (flights.length === 0) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", m: 2, color: "red" }}
      >
        <Typography variant="h4">
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
        {flights.map((f) => (
          <Collapse key={f.id} in={!closingIds.includes(f.id)} timeout={300}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                m: 0,
              }}
            >
              <FlightCard
                key={f.id}
                flightInfo={f}
                isClickable={true}
                isAdmin={isAdmin}
                onEdit={() => handleEdit()}
                onDelete={() => handleDelete(f.id)}
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
    </>
  );
}
