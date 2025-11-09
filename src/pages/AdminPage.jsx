import { useDispatch, useSelector } from "react-redux";
import AdminFilterForm from "../components/adminFliterForm";
import { fetchFlights, clearFlights } from "../features/flights/flightsSlice";
import FlightsList from "../components/FlightsList";
import { useEffect } from "react";
import { setAdminSearchParams } from "../features/search/searchSlice";
import { Typography } from "@mui/material";

export default function AdminPage() {
  const dispatch = useDispatch();

  const handeleSubmit = (formData) => {
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
      {flights && flights.length > 0 ? (
        <FlightsList flights={flights} isAdmin={true} />
      ) : (
        <Typography
          variant={{ xs: "h6", md: "h4" }}
          sx={{
            color: "red",
            display: "flex",
            justifyContent: "center",
            m: 2,
          }}
        >
          No flights to be shown
        </Typography>
      )}
    </>
  );
}
