import { setUserSearchParams } from "../features/search/searchSlice";
import SubmitButton from "../components/SubmitButton";
import SelectField from "../components/SelectField";
import DateField from "../components/DateField";

import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { Box, Container, Grid, Typography } from "@mui/material";
import FlightLandIcon from "@mui/icons-material/FlightLand";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import dayjs from "dayjs";

export default function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const airports = useSelector((state) => state.airports.airports);
  const userSearchParams = useSelector((state) => state.search.userSearch);

  const [formData, setFormData] = useState({
    origin: userSearchParams.origin,
    destination: userSearchParams.destination,
    depDate:
      userSearchParams.depDate !== "" && userSearchParams.depDate != null
        ? dayjs(userSearchParams.depDate)
        : null,
    retDate:
      userSearchParams.retDate !== "" && userSearchParams.retDate != null
        ? dayjs(userSearchParams.retDate)
        : null,
  });

  useEffect(() => {
    setFormData({
      origin: userSearchParams.origin,
      destination: userSearchParams.destination,
      depDate:
        userSearchParams.depDate !== "" && userSearchParams.depDate != null
          ? dayjs(userSearchParams.depDate)
          : null,
      retDate:
        userSearchParams.retDate !== "" && userSearchParams.retDate != null
          ? dayjs(userSearchParams.retDate)
          : null,
    });
  }, [userSearchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setUserSearchParams({
        origin: formData.origin,
        destination: formData.destination,
        depDate: formData.depDate ? formData.depDate.format("YYYY-MM-DD") : "",
        retDate: formData.retDate ? formData.retDate.format("YYYY-MM-DD") : "",
      })
    );
    navigate("/results");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        width: "90%",
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
      <Box
        component="img"
        src="/app_logo4.png"
        alt="app logo"
        sx={{
          maxWidth: { xs: 200, sm: 400 },
          width: "100%",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />
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
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: 18, md: 36 },
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          ✈️ Find Your Perfect Flight
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "#555", mb: 2 }}
        >
          Search and compare flights
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Grid container spacing={3} justifyContent="center">
            {/* First row: From and To selectors */}
            <Grid container spacing={3} justifyContent="center">
              <SelectField
                label="From"
                value={formData.origin}
                onChange={({ target: { value } }) =>
                  setFormData((prev) => ({ ...prev, origin: value }))
                }
                options={airports}
                icon={<FlightTakeoffIcon color="primary" />}
                tooltip="Select your departure airport"
                required
                helperText="Where are you flying from?"
              />
              <SelectField
                label="To"
                value={formData.destination}
                onChange={({ target: { value } }) =>
                  setFormData((prev) => ({
                    ...prev,
                    destination: value,
                  }))
                }
                options={airports}
                icon={<FlightLandIcon color="primary" />}
                tooltip="Select your destination airport"
                required
                helperText="Where are you flying to?"
              />
            </Grid>

            {/* Second row: Date selectors */}
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 0 }}>
              <DateField
                label="Departure Date"
                value={formData.depDate}
                onChange={(newValue) =>
                  setFormData((prev) => ({ ...prev, depDate: newValue }))
                }
                required
              />
              <DateField
                label="Return Date"
                value={formData.retDate}
                onChange={(newValue) =>
                  setFormData((prev) => ({ ...prev, retDate: newValue }))
                }
                minDate={formData.depDate}
              />
            </Grid>

            {/* Third row: Search button */}
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <SubmitButton>🔍 Search Flights</SubmitButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
