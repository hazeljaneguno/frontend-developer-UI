import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { initGA, logPageView } from "./analytics";

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
}
initGA();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GAListener />
    <App />
  </BrowserRouter>
);