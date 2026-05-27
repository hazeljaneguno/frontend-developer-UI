import React, { useRef, useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { trackEvent } from "./utils/analyticsTracker";

import "./styles/global.css";
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/cards.css";
import "./styles/features.css";
import "./styles/modal.css";
import "./styles/pricing.css";
import "./styles/footer.css";
import "./styles/contact.css";
import "./styles/collaboration.css";
import "./styles/login.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/animations/Reveal";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

import Hero from "./sections/Hero";
import Features from "./sections/Features";
import LiveCards from "./sections/LiveCards";
import Collaboration from "./sections/Collaboration";
import Pricing from "./sections/Pricing";
import Contact from "./sections/Contact";

export default function App() {
  const location = useLocation();

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const collaborationRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  const refs = {
    heroRef,
    featuresRef,
    collaborationRef,
    pricingRef,
    contactRef,
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const timeout = setTimeout(() => {
      trackEvent("page_view", {
        page: location.pathname,
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [location.pathname]);
  const scrollTo = (ref) => {
    if (!ref?.current) return;

    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    trackEvent("scroll_to_section", {
      section: ref.current.id || "unknown",
    });
  };

  useEffect(() => {
    const sections = [
      { ref: heroRef, name: "hero" },
      { ref: featuresRef, name: "features" },
      { ref: collaborationRef, name: "collaboration" },
      { ref: pricingRef, name: "pricing" },
      { ref: contactRef, name: "contact" },
    ];

    let ticking = false;

    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 200;

        sections.forEach((section) => {
          const el = section.ref.current;
          if (!el) return;

          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection((prev) => {
              if (prev !== section.name) {
                trackEvent("section_view", {
                  section: section.name,
                });
              }
              return section.name;
            });
          }
        });

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* MAIN PAGE */}
      <Route
        path="/"
        element={
          <div className="website">

            <Header
              scrollTo={scrollTo}
              refs={refs}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              scrolled={scrolled}
              activeSection={activeSection}
            />

            <main onClick={() => setMenuOpen(false)}>

              <section ref={heroRef} id="hero">
                <Hero scrollTo={scrollTo} refs={refs} />
              </section>

              <section ref={featuresRef} id="features">
                <Reveal>
                  <Features />
                </Reveal>

                <Reveal>
                  <LiveCards />
                </Reveal>
              </section>

              <section ref={collaborationRef} id="collaboration">
                <Reveal>
                  <Collaboration />
                </Reveal>
              </section>

              <section ref={pricingRef} id="pricing">
                <Reveal>
                  <ProtectedRoute>
                    <Pricing />
                  </ProtectedRoute>
                </Reveal>
              </section>

              <section ref={contactRef} id="contact">
                <Reveal>
                  <Contact />
                </Reveal>
              </section>

              <Footer
                scrollTo={scrollTo}
                refs={refs}
                activeSection={activeSection}
              />

            </main>

          </div>
        }
      />

    </Routes>
  );
}