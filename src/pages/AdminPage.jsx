import { useDispatch, useSelector } from "react-redux";
import AdminFilterForm from "../components/adminFliterForm";
import { fetchFlights, clearFlights } from "../features/flights/flightsSlice";
import FlightsList from "../components/FlightsList";
import { useEffect } from "react";
import { setAdminSearchParams } from "../features/search/searchSlice";

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
      {flights && flights.length > 0 && <FlightsList flights={flights} />}
    </>
  );
}
