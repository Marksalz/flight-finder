import { Outlet, useNavigate, useLocation } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router";
import Link from "@mui/material/Link";
import appLogo from "../assets/app_logo2.png";
import { useDispatch } from "react-redux";
import { clearFlights, createFlight } from "../features/flights/flightsSlice";
import { useState, useEffect } from "react";
import EditCreateFlightDialog from "./EditCreateFlightDialog";
import { Grid } from "@mui/material";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [createOpen, setCreateOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const showButton =
    location.pathname === "/" || location.pathname === "/admin";

  const handleClose = () => setCreateOpen(false);

  const handleSave = (id, flightData) => {
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
      const timer = setTimeout(() => setMessage(null), 4000);
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
              src={appLogo}
              alt="AeroFind Logo"
              sx={{
                width: { xs: 120, sm: 200 },
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Link>

          {showButton && (
            <Button
              onClick={() => {
                if (location.pathname === "/") {
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
          backgroundImage: 'url("/background.jpg")',
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
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: message.type === "success" ? "#4caf50" : "#f44336",
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
