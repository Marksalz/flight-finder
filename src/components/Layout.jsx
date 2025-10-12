import React from "react";
import { Link, Outlet } from "react-router";
import Container from "@mui/material/Container";
import "../styles/Layout.css";

export default function Layout() {
  return (
    <div className="app-layout">
      <header className="site-header">
        <Container className="header-inner">
          <Link to="/" className="logo">
            AeroFind
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
          <small>© {new Date().getFullYear()} Flight Finder</small>
        </Container>
      </footer>
    </div>
  );
}
