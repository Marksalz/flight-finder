import { useEffect, useState } from "react";
import "../styles/searchPage.css";
import { Box, Container, Grid, Typography } from "@mui/material";
import SelectField from "../components/SelectField";
import DateField from "../components/DateField";
import SubmitButton from "../components/SubmitButton";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParams } from "../features/search/searchSlice";
import { fetchAirports } from "../features/airports/airportsSlice";

export default function SearchPage() {
  const dispatch = useDispatch();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchAirports());
  // }, [dispatch]);

  const airports = useSelector((state) => state.airports.airports);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setSearchParams({
        origin: from,
        destination: to,
        depDate: departDate ? departDate.format("YYYY-MM-DD") : "",
        retDate: returnDate ? returnDate.format("YYYY-MM-DD") : "",
      })
    );
    navigate("/results");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        width: "90%",
        minHeight: { xs: "87.8vh", sm: "100vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "#CEDDF0",
        borderRadius: 4,
        margin: "3% auto",
        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 4 },
      }}
    >
      <img className="app_logo" src="/app_logo4.png" alt="app logo" />
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "90%", sm: 500, md: 600 },
          bgcolor: "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
          borderRadius: { xs: 2, sm: 3, md: 4 },
          p: { xs: 2, sm: 3, md: 5 },
          mx: "auto",
          backdropFilter: "blur(4px)",
          backgroundColor: "#a6c3e9ab",
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
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={3} justifyContent="center">
            {/* First row: From and To selectors */}
            <Grid container spacing={3} justifyContent="center">
              <Grid size={{ xs: 8, sm: 6 }}>
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
              <Grid size={{ xs: 8, sm: 6 }}>
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
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 0 }}>
              <Grid size={{ xs: 8, sm: 6 }}>
                <DateField
                  label="Departure Date"
                  value={departDate}
                  onChange={setDepartDate}
                  required
                />
              </Grid>
              <Grid size={{ xs: 8, sm: 6 }}>
                <DateField
                  label="Return Date"
                  value={returnDate}
                  onChange={setReturnDate}
                  required
                  minDate={departDate}
                />
              </Grid>
            </Grid>

            {/* Third row: Search button */}
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid size={{ xs: 12 }}>
                <SubmitButton>🔍 Search Flights</SubmitButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
