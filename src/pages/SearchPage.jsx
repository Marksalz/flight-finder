import React, { useState } from "react";
import "../styles/searchPage.css";
import { Box, Container, Grid, Typography } from "@mui/material";
import SelectField from "../components/SelectField";
import DateField from "../components/DateField";
import SubmitButton from "../components/SubmitButton";

import appLogo from "../assets/app_logo3.png";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router";

const airports = [
  { code: "JFK", name: "New York (JFK)" },
  { code: "LAX", name: "Los Angeles (LAX)" },
  { code: "ORD", name: "Chicago (ORD)" },
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/results");
          }}
          style={{ width: "100%" }}
        >
          <Grid container spacing={3} justifyContent="center">
            {/* First row: From and To selectors */}
            <Grid container item spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <SelectField
                  label="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  options={airports}
                  icon={<FlightTakeoffIcon color="primary" />}
                  tooltip="Select your departure airport"
                  required
                  helperText="Where are you flying from?"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectField
                  label="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  options={airports}
                  icon={<FlightLandIcon color="primary" />}
                  tooltip="Select your destination airport"
                  required
                  helperText="Where are you flying to?"
                />
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
                <DateField
                  label="Depart"
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  icon={<CalendarMonthIcon color="primary" />}
                  tooltip="Choose your departure date"
                  required
                  helperText="Select your departure date"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateField
                  label="Return"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  icon={<CalendarMonthIcon color="primary" />}
                  tooltip="Choose your return date (optional)"
                  required
                  helperText="Select your return date"
                />
              </Grid>
            </Grid>

            {/* Third row: Search button */}
            <Grid container item justifyContent="center" sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <SubmitButton>🔍 Search Flights</SubmitButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
