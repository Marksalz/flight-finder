import { Link, Outlet } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import "../styles/Layout.css";
import appLogo from "../assets/app_logo2.png";

export default function Layout() {
  return (
    <Box>
      <header>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#cfdef3",
            borderRadius: 4,
            flexDirection: { xs: "column", sm: "row" }, // Stack on mobile
            gap: { xs: 1, sm: 0 },
            minWidth: "95vw",
            margin: "1% auto",
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

      <footer>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#cfdef3",
            borderRadius: 4,
            flexDirection: { xs: "column", sm: "row" },
            textAlign: "center",
            gap: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 2 },
            px: { xs: 2, sm: 4 },
            minWidth: "95vw",
            margin: "1% auto",
          }}
        >
          <small>© {new Date().getFullYear()} AeroFind</small>
        </Container>
      </footer>
    </Box>
  );
}
