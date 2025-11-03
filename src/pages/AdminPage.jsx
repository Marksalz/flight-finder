import { useDispatch, useSelector } from "react-redux";
import AdminFilterForm from "../components/adminFliterForm";
import { fetchFlights, clearFlights } from "../features/flights/flightsSlice";
import FlightsList from "../components/FlightsList";
import { useEffect } from "react";

export default function AdminPage() {
  const dispatch = useDispatch();

  const handeleSubmit = (formData) => {
    console.log(formData);
    dispatch(fetchFlights({ searchParams: formData }));
  };

  const handleClear = () => {
    dispatch(clearFlights());
  };

//   useEffect(() => {
//     // Cleanup flights when leaving the page
//     return () => {
//       dispatch(clearFlights());
//     };
//   }, [dispatch]);

  const flights = useSelector((state) => state.flights.flights);
  return (
    <>
      <AdminFilterForm handeleSubmit={handeleSubmit} onClear={handleClear} />
      {flights && flights.length > 0 && <FlightsList flights={flights} />}
    </>
  );
}
