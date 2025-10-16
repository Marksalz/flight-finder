import React from "react";
import { useLocation } from "react-router";
import SearchSummaryBar from "../components/SearchSummaryBar";
import { allFlights } from "../utils/mockFlights";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function ResultsPage() {
  const { state } = useLocation();
  const { from, to, departDate, returnDate } = state || {};

  console.log(`state: `, state);

  console.log(`All flights: `, allFlights);

  const flights = allFlights.filter((flight) => {
    return (
      flight.origin.code === from &&
      flight.destination.code === to &&
      flight.date === departDate
    );
  });

  console.log(`Filtered flights: `, flights);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "95vw",
        bgcolor: "background.paper",
        padding: 0,
      }}
    >
      <SearchSummaryBar
        from={from}
        to={to}
        date={departDate.toLocaleString()}
      />
      <Divider />
      <List>
        {flights.map((flight) => (
          <React.Fragment key={flight.id}>
            <ListItem alignItems="flex-start" sx={{ py: 2 }}>
              <Grid container spacing={2} alignItems="center">
                {/* 1. Origin & Destination */}
                <Grid sx={{ flexBasis: { xs: "100%", sm: "50%" } }}>
                  <Box display="flex" alignItems="center">
                    <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          component="span"
                          color="text.primary"
                        >
                          {flight.origin.code} → {flight.destination.code}
                        </Typography>
                      }
                      secondary="Flight Route"
                    />
                  </Box>
                </Grid>

                {/* 2. Date */}
                <Grid sx={{ flexBasis: { xs: "50%", sm: "25%" } }}>
                  <Box display="flex" alignItems="center">
                    <CalendarMonthIcon color="action" sx={{ mr: 1 }} />
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="text.secondary">
                          {flight.date}
                        </Typography>
                      }
                      secondary="Departure Date"
                    />
                  </Box>
                </Grid>

                {/* 3. Price (Secondary Action/Detail) */}
                <Grid
                  sx={{
                    flexBasis: { xs: "50%", sm: "25%" },
                    textAlign: "right",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="success.main"
                    component="span"
                  >
                    {flight.price.amount} {flight.price.currency}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  // return (
  //   <>
  //     <SearchSummaryBar
  //       from={from}
  //       to={to}
  //       date={departDate.toLocaleString()}
  //     />
  //     {/* Render flights here */}
  //   </>
  // );
}
