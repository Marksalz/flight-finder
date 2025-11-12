import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
} from "@mui/material";

import { selectAirportById } from "../features/airports/airportsSlice";
import { toISOString, toLocalInputValue } from "../utils/helpFunctions";
import SelectField from "./SelectField";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function EditCreateFlightDialog({
  open,
  onClose,
  flight = {},
  onSave,
}) {
  const isEdit = !!flight.id;

  const airlines = [
    "United Airlines",
    "Delta Airlines",
    "El Al Israel Airlines",
    "American Airlines",
  ];

  const airlineCodes = {
    "El Al Israel Airlines": "LY",
    "Delta Airlines": "DL",
    "American Airlines": "AA",
    "United Airlines": "UA",
  };

  const airports = useSelector((state) => state.airports.airports);

  const [formData, setFormData] = useState(flight);

  useEffect(() => {
    setFormData(flight);
  }, [flight]);

  const originAirport = useSelector((state) =>
    selectAirportById(state, formData.origin)
  );
  const destinationAirport = useSelector((state) =>
    selectAirportById(state, formData.destination)
  );

  const handleChange = ({ target: { name, value } }) => {
    let updatedValue = value;

    if (name === "origin" || name === "destination") {
      updatedValue = Number(airports.find((ap) => ap.code === value)?.id || 0);
    } else if (name === "airline") {
      const code = airlineCodes[value] || "";
      const flightNumber = prevFlightNumberWithoutPrefix(formData.flightNumber);
      updatedValue = value;
      setFormData((prev) => ({
        ...prev,
        airline: value,
        flightNumber: code + flightNumber,
      }));
      return;
    } else if (name === "flightNumber") {
      const code = airlineCodes[formData.airline] || "";
      updatedValue = code + value.replace(/[^0-9]/g, "");
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
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, lg: 3.5 }}>
              <SelectField
                name="airline"
                label="Airline"
                value={formData.airline || ""}
                options={airlines}
                onChange={handleChange}
                autoFocus
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                label="Flight Number"
                name="flightNumber"
                value={formData.flightNumber || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Section>

        {/* --- Route --- */}
        <Section title="Route">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, lg: 3.5 }}>
              <SelectField
                name="origin"
                options={airports}
                label="Origin"
                value={originAirport?.code || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <SelectField
                name="destination"
                options={airports}
                label="Destination"
                value={destinationAirport?.code || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Section>

        {/* --- Timing --- */}
        <Section title="Timing">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                label="Departure Time"
                name="departureTime"
                type="datetime-local"
                value={toLocalInputValue(formData.departureTime)}
                onChange={({ target: { value } }) =>
                  setFormData((prev) => ({
                    ...prev,
                    departureTime: value,
                  }))
                }
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                label="Arrival Time"
                name="arrivalTime"
                type="datetime-local"
                value={toLocalInputValue(formData.arrivalTime)}
                onChange={({ target: { value } }) =>
                  setFormData((prev) => ({
                    ...prev,
                    arrivalTime: value,
                  }))
                }
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                label="Duration (minutes)"
                name="durationMinutes"
                type="number"
                value={formData.durationMinutes || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Section>

        {/* --- Additional Details --- */}
        <Section title="Additional Details">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextField
                label="Price (USD)"
                name="price.amount"
                type="number"
                value={formData.price?.amount || ""}
                onChange={({ target: { value } }) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: {
                      ...prev.price,
                      amount: Number(value),
                      currency: "USD",
                    },
                  }))
                }
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <TextField
                label="Aircraft"
                name="aircraft"
                value={formData.aircraft || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
              <TextField
                label="Terminal"
                name="terminal"
                value={formData.terminal || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <TextField
                label="Baggage Allowance"
                name="baggageAllowance"
                value={formData.baggageAllowance || ""}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
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
