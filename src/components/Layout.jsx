import { Link, Outlet } from "react-router";
import Container from "@mui/material/Container";
import "../styles/Layout.css";
import appLogo from "../assets/app_logo2.png";

export default function Layout() {
  return (
    <div className="app-layout">
      <header className="site-header">
        <Container className="header-inner">
          <Link to="/" className="logo">
            <img className="logo" src={appLogo} alt="aaa" />
          </Link>
        </Container>
      </header>

      <main className="site-main">
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer className="site-footer">
        <Container className="footer-inner">
          <small>© {new Date().getFullYear()} AeroFind</small>
        </Container>
      </footer>
    </div>
  );
}
