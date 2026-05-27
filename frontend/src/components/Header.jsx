import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Header({
  scrollTo,
  refs,
  menuOpen,
  setMenuOpen,
  scrolled,
  activeSection,
}) {
  const navigate = useNavigate();

  const navRef = useRef(null);

  const [underlineStyle, setUnderlineStyle] = useState({});

  /* ================= NAVIGATION ITEMS ================= */
  const navItems = [
    {
      label: "Home",
      key: "hero",
      ref: "heroRef",
    },

    {
      label: "Features",
      key: "features",
      ref: "featuresRef",
    },

    {
      label: "Collaboration",
      key: "collaboration",
      ref: "collaborationRef",
    },

    {
      label: "Pricing",
      key: "pricing",
      ref: "pricingRef",
    },

    /* ✅ ADDED CONTACT */
    {
      label: "Contact",
      key: "contact",
      ref: "contactRef",
    },
  ];

  /* ================= MOVE UNDERLINE ================= */
  useEffect(() => {
    if (!navRef.current) return;

    const buttons =
      navRef.current.querySelectorAll(".nav-item");

    const index = navItems.findIndex(
      (item) => item.key === activeSection
    );

    const activeButton = buttons[index];

    if (!activeButton) return;

    setUnderlineStyle({
      left: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
    });
  }, [activeSection]);

  return (
    <header
      className={`header ${
        scrolled ? "shrink" : ""
      }`}
    >
      <div className="container navbar">

        {/* ================= LOGO ================= */}
        <div
          className="logo"
          onClick={() => navigate("/")}
        >
          HazelUI
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav
          className={`nav ${
            menuOpen ? "active" : ""
          }`}
          ref={navRef}
        >
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${
                activeSection === item.key
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                scrollTo(refs[item.ref]);

                /* close mobile menu */
                setMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}

          {/* ================= MOVING UNDERLINE ================= */}
          <span
            className="nav-underline"
            style={underlineStyle}
          />
        </nav>

        {/* ================= CTA BUTTON ================= */}
        <button
          className="nav-btn"
          onClick={() => {
            scrollTo(refs.contactRef);

            setMenuOpen(false);
          }}
        >
          Start Now
        </button>

        {/* ================= MOBILE MENU ================= */}
        <button
          className="menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <Menu />
        </button>

      </div>
    </header>
  );
}