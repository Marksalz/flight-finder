import { Link, Outlet } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import "../styles/Layout.css";
import appLogo from "../assets/app_logo2.png";

export default function Layout() {
  return (
    <Box>
      {/* ---------- HEADER ---------- */}
      <header className="site-header">
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" }, // Stack on mobile
            gap: { xs: 1, sm: 0 },
            maxWidth: "1000px",
            margin: "0 auto",
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
        </Container>
      </header>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="site-main">
        <Container
          sx={{
            maxWidth: "1000px",
            margin: "0 auto",
            px: { xs: 2, sm: 4 },
            py: { xs: 2, sm: 4 },
          }}
        >
          <Outlet />
        </Container>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="site-footer">
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            textAlign: "center",
            gap: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 2 },
            px: { xs: 2, sm: 4 },
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <small>© {new Date().getFullYear()} AeroFind</small>
        </Container>
      </footer>
    </Box>
  );
}
