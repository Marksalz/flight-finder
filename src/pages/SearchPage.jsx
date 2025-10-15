import React, { useState } from "react";
import "../styles/searchPage.css";
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

import appLogo from "../assets/app_logo3.png";

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
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#cfdef3",
        borderRadius: 4,
        py: 6,
      }}
    >
      <img className="app_logo" src={appLogo} alt="app logo" />
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
          borderRadius: 4,
          p: 5,
          mx: "auto",
          backdropFilter: "blur(4px)",
          transition: "box-shadow 0.3s",
          "&:hover": { boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.25)" },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, color: "primary.main" }}
        >
          ✈️ Find Your Perfect Flight
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          sx={{ color: "#555" }}
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
                  sx={{ mb: 0 }}
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
                  sx={{ mb: 0 }}
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
                  sx={{ mb: 0 }}
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
                  sx={{ mb: 0 }}
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
                  sx={{
                    px: 5,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1.15rem",
                    borderRadius: 3,
                    background:
                      "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
                    boxShadow: "0 4px 16px 0 rgba(33, 203, 243, 0.15)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 24px 0 rgba(33, 203, 243, 0.25)",
                      background:
                        "linear-gradient(90deg, #21cbf3 0%, #2196f3 100%)",
                    },
                  }}
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
