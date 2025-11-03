import { Link, Outlet, useNavigate } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useLocation } from "react-router";
import "../styles/Layout.css";
import appLogo from "../assets/app_logo2.png";
import Button from "@mui/material/Button";

export default function Layout({ showAdminBtn = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  showAdminBtn = location.pathname === "/";

  return (
    <Box>
      <header>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#cfdef3",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
            minWidth: "100%",
            py: { xs: 1, sm: 2 },
            px: { xs: 2, sm: 4 },
          }}
        >
          <Link
            to="/"
            className="logo"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={appLogo}
              alt="AeroFind Logo"
              style={{
                height: "auto",
                width: "150px",
                maxWidth: "80%",
              }}
            />
          </Link>
          {showAdminBtn && (
            <Button
              onClick={() => {
                navigate("/admin");
              }}
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
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#cfdef3",
            flexDirection: { xs: "column", sm: "row" },
            textAlign: "center",
            gap: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 2 },
            px: { xs: 2, sm: 4 },
            minWidth: "100%",
          }}
        >
          <small>© {new Date().getFullYear()} AeroFind</small>
        </Container>
      </footer>
    </Box>
  );
}
