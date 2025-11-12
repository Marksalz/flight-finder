import { setAdminSearchParams } from "../features/search/searchSlice";
import { fetchFlights } from "../features/flights/flightsSlice";
import AdminFilterForm from "../components/adminFliterForm";
import FlightsList from "../components/FlightsList";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Box, Typography } from "@mui/material";

export default function AdminPage() {
  const dispatch = useDispatch();

  const [filterClicked, setFilterClicked] = useState(false);

  const handeleSubmit = (formData) => {
    setFilterClicked(true);
    const serializableFormData = {
      ...formData,
      startDate: formData.startDate
        ? formData.startDate.format("YYYY-MM-DD")
        : null,
      endDate: formData.endDate ? formData.endDate.format("YYYY-MM-DD") : null,
    };
    dispatch(setAdminSearchParams(serializableFormData));
    dispatch(fetchFlights({ searchParams: serializableFormData }));
  };

  const flights = useSelector((state) => state.flights.flights);

  return (
    <>
      <AdminFilterForm handeleSubmit={handeleSubmit} />
      {flights.length > 0 ? (
        <FlightsList flights={flights} isAdmin={true} />
      ) : (
        filterClicked && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              m: 2,
              color: "red",
            }}
          >
            <Typography variant="h4">
              No flights found for the selected route and dates range
            </Typography>
          </Box>
        )
      )}
    </>
  );
}
