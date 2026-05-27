import ReactGA from "react-ga4";

export const initGA = () => {
  const GA_ID = import.meta.env.VITE_GA_ID;

  if (!GA_ID) {
    console.warn("❌ Missing VITE_GA_ID");
    return;
  }

  ReactGA.initialize(GA_ID);
};

export default ReactGA;