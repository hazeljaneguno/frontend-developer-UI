import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import ReactGA from "react-ga4";

/* ================= GA INIT ================= */

const GA_ID = import.meta.env.VITE_GA_ID;

if (GA_ID) {
  ReactGA.initialize(GA_ID);
} else {
  console.warn("❌ Missing VITE_GA_ID in environment variables");
}

/* ================= PAGE VIEW TRACKER ================= */

function GAListener() {
  const location = useLocation();

  React.useEffect(() => {
    if (GA_ID) {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

/* ================= APP ROOT ================= */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GAListener />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);