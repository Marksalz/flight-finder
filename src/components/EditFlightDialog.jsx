import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function EditFlightDialog({ open, onClose, flight, onSave }) {
  const [formData, setFormData] = useState(flight);

  useEffect(() => {
    setFormData(flight);
  }, [flight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedFlight = {
      ...formData,
      departureTime: toISOString(formData.departureTime),
      arrivalTime: toISOString(formData.arrivalTime),
    };
    onSave(updatedFlight);
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
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            boxShadow: "0 8px 32px 0 rgba(207, 222, 243, 0.45)",
            p: 2,
          },
        },
      }}
     
    >
      <DialogTitle fontWeight="600">Edit Flight</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid xs={6}>
            <TextField
              label="Airline"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Flight Number"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Origin"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Departure Time"
              name="departureTime"
              type="datetime-local"
              value={toLocalInputValue(formData.departureTime)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  departureTime: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Arrival Time"
              name="arrivalTime"
              type="datetime-local"
              value={toLocalInputValue(formData.arrivalTime)}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  arrivalTime: e.target.value,
                }))
              }
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Duration (minutes)"
              name="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Price (USD)"
              name="price.amount"
              value={formData.price.amount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: { ...prev.price, amount: e.target.value },
                }))
              }
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Aircraft"
              name="aircraft"
              value={formData.aircraft}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              label="Terminal"
              name="terminal"
              value={formData.terminal}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              label="Baggage Allowance"
              name="baggageAllowance"
              value={formData.baggageAllowance}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Helper to convert ISO string to 'YYYY-MM-DDTHH:mm'
function toLocalInputValue(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  // Get timezone offset in minutes and adjust
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISO = new Date(date - tzOffset).toISOString().slice(0, 16);
  return localISO;
}

// Helper to convert 'YYYY-MM-DDTHH:mm' to ISO string (UTC)
function toISOString(localValue) {
  if (!localValue) return "";
  const date = new Date(localValue);
  return date.toISOString();
}
