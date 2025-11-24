import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  useNavigate,
  useLocation,
  Link as RouterLink,
} from "react-router";

import { Container, Box, Button, IconButton, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  clearFlights,
  createFlight,
} from "../../features/flights/flightsSlice";
import { clearSearchParams } from "../../features/search/searchSlice";
import EditCreateFlightDialog from "../editCreateDialog/EditCreateFlightDialog";
import HomePageButton from "./HomePageButton";

export default function Layout() {
  const TIMER_TIME = 4000;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [createOpen, setCreateOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const showButton =
    location.pathname === "/" || location.pathname === "/admin";

  const handleClose = () => setCreateOpen(false);

  const handleSave = (flightData) => {
    setMessage(null);
    try {
      dispatch(createFlight(flightData));
      setCreateOpen(false);
      setMessage({ type: "success", text: "Flight added successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add flight." });
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), TIMER_TIME);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        component="header"
        sx={{
          bgcolor: "#cfdef3",
          py: { xs: 1, sm: 2 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 0,
            gap: 0,
          }}
        >
          {/* Go Back Button*/}
          {location.pathname !== "/" && (
            <IconButton
              aria-label="Go back"
              onClick={() => navigate(-1)}
              sx={{
                color: "white",
                borderRadius: 3,
                background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
                boxShadow: "0 4px 16px 0 rgba(33, 203, 243, 0.15)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 24px 0 rgba(33, 203, 243, 0.25)",
                  background:
                    "linear-gradient(90deg, #21cbf3 0%, #2196f3 100%)",
                },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 24 } }} />
            </IconButton>
          )}
          <HomePageButton />

          {showButton && (
            <Button
              onClick={() => {
                if (location.pathname === "/") {
                  dispatch(clearFlights());
                  navigate("/admin");
                } else {
                  setCreateOpen(true);
                }
              }}
              size="medium"
              sx={{
                fontSize: { xs: 10, sm: 16 },
                color: "white",
                borderRadius: 3,
                background: "linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)",
                boxShadow: "0 4px 16px 0 rgba(33, 203, 243, 0.15)",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 24px 0 rgba(33, 203, 243, 0.25)",
                  background:
                    "linear-gradient(90deg, #21cbf3 0%, #2196f3 100%)",
                },
              }}
            >
              {location.pathname === "/" ? "Admin" : "Add FLight"}
            </Button>
          )}
        </Container>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "70vh",
          backgroundImage: 'url("/images/background.jpg")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          bgcolor: "#cfdef3",
          py: { xs: 1, sm: 2 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            textAlign: "center",
            gap: { xs: 1, sm: 2 },
          }}
        >
          <Box component="small">© {new Date().getFullYear()} AeroFind</Box>
        </Container>
      </Box>
      {createOpen && (
        <EditCreateFlightDialog
          open={true}
          onClose={handleClose}
          onSave={handleSave}
          flight={{}}
        />
      )}
      {message && (
        <Box
          sx={{
            bgcolor: message.type === "success" ? "#4caf50" : "#f44336",
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            px: 3,
            py: 1,
            borderRadius: 2,
            boxShadow: 2,
            zIndex: 9999,
          }}
        >
          {message.text}
        </Box>
      )}
    </Box>
  );
}
