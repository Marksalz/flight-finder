import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import "../styles/SearchPage.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router";

const airports = [
  { code: "JFK", name: "New York (JFK)" },
  { code: "LAX", name: "Los Angeles (LAX)" },
  { code: "ORD", name: "Chicago (ORD)" },
  // Add more airports as needed
];

export default function SearchPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="searchpage-container">
      <Box className="searchpage-box">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className="searchpage-title"
        >
          ✈️ Find Your Perfect Flight
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          className="searchpage-subtitle"
        >
          Search and compare flights
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {/* First row: From and To selectors */}
          <Grid container item spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Tooltip title="Select your departure airport" arrow>
                <TextField
                  select
                  label="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  fullWidthx
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoffIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Where are you flying from?"
                  className="searchpage-field"
                >
                  {airports.map((airport) => (
                    <MenuItem key={airport.code} value={airport.code}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="Select your destination airport" arrow>
                <TextField
                  select
                  label="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightLandIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Where are you flying to?"
                  className="searchpage-field"
                >
                  {airports.map((airport) => (
                    <MenuItem key={airport.code} value={airport.code}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Tooltip>
            </Grid>
          </Grid>

          {/* Second row: Date selectors */}
          <Grid
            container
            item
            spacing={3}
            justifyContent="center"
            sx={{ mt: 0 }}
          >
            <Grid item xs={12} sm={6}>
              <Tooltip title="Choose your departure date" arrow>
                <TextField
                  label="Depart"
                  type="date"
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Select your departure date"
                  className="searchpage-field"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Tooltip title="Choose your return date (optional)" arrow>
                <TextField
                  label="Return"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Select your return date (optional)"
                  className="searchpage-field"
                />
              </Tooltip>
            </Grid>
          </Grid>

          {/* Third row: Search button */}
          <Grid container item justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="searchpage-button"
                  onClick={() => navigate("/results")}
                >
                  🔍 Search Flights
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
