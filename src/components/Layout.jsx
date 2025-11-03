import { Outlet, useNavigate, useLocation } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router";
import Link from "@mui/material/Link";
import appLogo from "../assets/app_logo2.png";

export default function Layout({ showAdminBtn = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const showButton = showAdminBtn || location.pathname === "/";

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
            flexDirection: { xs: "column", sm: "row" },
            px: 0,
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            aria-label="Go to homepage"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={appLogo}
              alt="AeroFind Logo"
              sx={{
                width: 150,
                maxWidth: "80%",
                height: "auto",
              }}
            />
          </Link>

          {showButton && (
            <Button
              onClick={() => navigate("/admin")}
              size="medium"
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
              Admin
            </Button>
          )}
        </Container>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 4 },
          minHeight: "70vh",
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
    </Box>
  );
}
