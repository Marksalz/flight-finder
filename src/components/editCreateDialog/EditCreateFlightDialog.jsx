import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import {
  selectAirportById,
  selectAirports,
} from "../../features/airports/airportsSlice.js";
import { toISOString } from "../../utils/helpFunctions.js";
import { airlines, airlineCodes } from "../../utils/consts.js";
import AirlineInfoSection from "../editCreateDialog/AirlineInfoSection.jsx";
import RouteSection from "../editCreateDialog/RouteSection.jsx";
import TimingSection from "../editCreateDialog/TimingSection";
import AdditionalDetailsSection from "../editCreateDialog/AdditionalDetailsSection";

export default function EditCreateFlightDialog({
  open,
  onClose,
  flight = {},
  onSave,
}) {
  const isEdit = !!flight.id;

  const airports = useSelector(selectAirports);

  const [formData, setFormData] = useState(flight);

  useEffect(() => {
    setFormData(flight);
  }, [flight]);

  const originAirport = useSelector(selectAirportById(formData.origin));
  const destinationAirport = useSelector(
    selectAirportById(formData.destination)
  );

  function updateAirline(value, formData) {
    const code = airlineCodes[value] || "";
    const flightNumber = prevFlightNumberWithoutPrefix(formData.flightNumber);
    setFormData((prev) => ({
      ...prev,
      airline: value,
      flightNumber: code + flightNumber,
    }));
  }

  function updateFlightNumber(value, formData) {
    const code = airlineCodes[formData.airline] || "";
    const updatedValue = code + value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      flightNumber: updatedValue,
    }));
  }

  const handleChange = ({ target: { name, value } }) => {
    let updatedValue = value;

    if (name === "origin" || name === "destination") {
      updatedValue = Number(
        airports.find((airport) => airport.code === value)?.id || 0
      );
    } else if (name === "airline") {
      updateAirline(value, formData);
      return;
    } else if (name === "flightNumber") {
      updateFlightNumber(value, formData);
      return;
    } else if (name === "price.amount" || name === "durationMinutes") {
      updatedValue = Number(updatedValue);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = () => {
    const updatedFlight = {
      ...formData,
      departureTime: toISOString(formData.departureTime),
      arrivalTime: toISOString(formData.arrivalTime),
      date: formData.departureTime ? formData.departureTime.slice(0, 10) : "",
    };
    onSave(formData.id, updatedFlight);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#cfdef3",
            borderRadius: "20px",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
            p: { xs: 1.5, sm: 3 },
          },
        },
      }}
    >
      <DialogTitle
        fontWeight="600"
        textAlign="center"
        sx={{ pb: 1, fontSize: "1.5rem" }}
      >
        {isEdit ? "Edit Flight" : "Add Flight"}
      </DialogTitle>

      <DialogContent>
        {/* --- Airline Info --- */}
        <Section title="Airline Information">
          <AirlineInfoSection
            formData={formData}
            handleChange={handleChange}
            airlines={airlines}
          />
        </Section>

        {/* --- Route --- */}
        <Section title="Route">
          <RouteSection
            formData={formData}
            handleChange={handleChange}
            airports={airports}
            originAirport={originAirport}
            destinationAirport={destinationAirport}
          />
        </Section>

        {/* --- Timing --- */}
        <Section title="Timing">
          <TimingSection
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
        </Section>

        {/* --- Additional Details --- */}
        <Section title="Additional Details">
          <AdditionalDetailsSection
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
        </Section>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", pt: 2 }}>
        <Button
          onClick={onClose}
          color="inherit"
          variant="outlined"
          sx={{ fontSize: { xs: 12, md: 16 }, borderRadius: "10px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ fontSize: { xs: 12, md: 16 }, borderRadius: "10px", px: 3 }}
          disabled={!formData.flightNumber || !formData.airline}
        >
          {isEdit ? "Save Changes" : "Add Flight"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Helper component for section headings of the form
function Section({ title, children }) {
  return (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, mb: 1, color: "text.secondary" }}
      >
        {title}
      </Typography>
      <Divider sx={{ mb: 2, opacity: 0.5 }} />
      {children}
    </Box>
  );
}

// Helper to remove prefix from flight number
function prevFlightNumberWithoutPrefix(flightNumber) {
  if (!flightNumber) return "";
  return flightNumber.slice(2);
}
