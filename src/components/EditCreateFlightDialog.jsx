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
import SelectField from "./SelectField";
import { useSelector } from "react-redux";
import { selectAirportById } from "../features/airports/airportsSlice";
import { toISOString, toLocalInputValue } from "../utils/helpFunctions";

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

  const [formData, setFormData] = useState(flight);

  const airports = useSelector((state) => state.airports.airports);

  useEffect(() => {
    setFormData(flight);
  }, [flight]);

  const originAirport = useSelector((state) =>
    selectAirportById(state, formData.origin)
  );
  const destinationAirport = useSelector((state) =>
    selectAirportById(state, formData.destination)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
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
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            boxShadow: "0 8px 32px 0 rgba(207, 222, 243, 0.45)",
            p: 2,
          },
        },
      }}
    >
      <DialogTitle fontWeight="600">
        {isEdit ? "Edit Flight" : "Add Flight"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          {/* Airline */}
          <Grid xs={6}>
            <SelectField
              name="airline"
              label="Airline"
              value={formData.airline || ""}
              options={airlines}
              onChange={handleChange}
              autoFocus
            />
          </Grid>

          {/* Flight Number */}
          <Grid xs={6}>
            <TextField
              label="Flight Number"
              name="flightNumber"
              value={formData.flightNumber || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Origin */}
          <Grid xs={6}>
            <SelectField
              name="origin"
              options={airports}
              label="Origin"
              value={originAirport?.code || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Destination */}
          <Grid xs={6}>
            <SelectField
              name="destination"
              options={airports}
              label="Destination"
              value={destinationAirport?.code || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Departure Time */}
          <Grid xs={6}>
            <TextField
              label="Departure Time"
              name="departureTime"
              type="datetime-local"
              value={toLocalInputValue(formData.departureTime)}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  departureTime: e.target.value,
                }));
              }}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              fullWidth
            />
          </Grid>

          {/* Arrival Time */}
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
              slotProps={{
                inputLabel: { shrink: true },
              }}
              fullWidth
            />
          </Grid>

          {/* Duration */}
          <Grid xs={6}>
            <TextField
              label="Duration (minutes)"
              name="durationMinutes"
              type="number"
              value={formData.durationMinutes || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Price */}
          <Grid xs={6}>
            <TextField
              label="Price (USD)"
              name="price.amount"
              type="number"
              value={formData.price?.amount || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: {
                    ...prev.price,
                    amount: Number(e.target.value),
                    currency: "USD",
                  },
                }))
              }
              fullWidth
            />
          </Grid>

          {/* Aircraft */}
          <Grid xs={6}>
            <TextField
              label="Aircraft"
              name="aircraft"
              value={formData.aircraft || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Terminal */}
          <Grid xs={6}>
            <TextField
              label="Terminal"
              name="terminal"
              value={formData.terminal || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Baggage Allowance */}
          <Grid xs={12}>
            <TextField
              label="Baggage Allowance"
              name="baggageAllowance"
              value={formData.baggageAllowance || ""}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.flightNumber || !formData.airline}
        >
          {isEdit ? "Save Changes" : "Add Flight"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Helper to remove prefix from flight number
function prevFlightNumberWithoutPrefix(flightNumber) {
  if (!flightNumber) return "";
  return flightNumber.slice(2);
}
