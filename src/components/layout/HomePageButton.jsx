import { Link as RouterLink } from "react-router";
import { useDispatch } from "react-redux";

import { Link, Box } from "@mui/material";

import { clearFlights } from "../../features/flights/flightsSlice";
import { clearSearchParams } from "../../features/search/searchSlice";

export default function HomePageButton() {
  const dispatch = useDispatch();

  return (
    <Link
      component={RouterLink}
      to="/"
      aria-label="Go to homepage"
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => {
        dispatch(clearFlights());
        dispatch(clearSearchParams());
      }}
    >
      <Box
        component="img"
        src={"/images/app_logo2.png"}
        alt="AeroFind Logo"
        sx={{
          width: { xs: 110, sm: 150 },
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </Link>
  );
}
