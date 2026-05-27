import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ReactGA from "react-ga4";

/* ================= GA INIT ================= */

const GA_ID = import.meta.env.VITE_GA_ID;

if (GA_ID && !window.__GA_INITIALIZED__) {
  ReactGA.initialize(GA_ID);
  window.__GA_INITIALIZED__ = true;
} else if (!GA_ID) {
  console.warn("❌ Missing VITE_GA_ID in environment variables");
}

/* ================= PAGE VIEW TRACKER ================= */

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID) return;

    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

/* ================= APP ROOT ================= */

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GAListener />
    <App />
  </BrowserRouter>
);