import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { auth } from "../firebase";
import { trackEvent } from "../utils/analyticsTracker";

export default function Pricing() {
  const navigate = useNavigate();

  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState("");
  const [serverStatus, setServerStatus] = useState("checking");

  /* ================= BACKEND URL ================= */
  const BACKEND_URL = useMemo(() => {
    const url = import.meta.env.VITE_BACKEND_URL;

    if (!url) {
      console.error("❌ Missing VITE_BACKEND_URL");
      return "";
    }

    return url.replace(/\/$/, "");
  }, []);

  /* ================= HEALTH CHECK ================= */
  useEffect(() => {
    if (!BACKEND_URL) {
      setServerStatus("offline");
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 15000);

    const checkBackend = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/health`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        console.log("✅ Backend health:", data);

        setServerStatus("connected");
      } catch (err) {
        if (err.name === "AbortError") {
          console.warn("⏱️ Backend timeout / cold start");
          setServerStatus("checking");
        } else if (
          err.message === "Failed to fetch" ||
          err.message.includes("NetworkError")
        ) {
          console.error("🌐 Network / CORS / Backend unreachable");
          setServerStatus("offline");
        } else {
          console.error("🔴 Backend error:", err.message);
          setServerStatus("offline");
        }
      } finally {
        clearTimeout(timeoutId);
      }
    };

    checkBackend();

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [BACKEND_URL]);

  /* ================= PAYMENT ================= */
  const handlePlanClick = async (plan, price) => {
    setError("");

    const user = auth.currentUser;

    if (!BACKEND_URL) {
      setError("Backend not configured.");
      return;
    }

    if (serverStatus !== "connected") {
      setError("Backend offline. Please try again.");
      return;
    }

    if (!user) {
      navigate("/login", {
        state: {
          from: "/pricing",
          action: { plan, price },
        },
      });

      return;
    }

    if (loadingPlan) return;

    setLoadingPlan(plan);

    try {
      trackEvent("order_click", {
        plan,
        price,
        user: user.email,
      });

      const response = await axios.post(
        `${BACKEND_URL}/api/create-payment`,
        {
          plan,
          price,
          email: user.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000,
        }
      );

      const checkoutUrl = response.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("Checkout URL missing");
      }

      trackEvent("order_success", {
        plan,
        price,
        user: user.email,
      });

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("❌ Payment error:", err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ||
            err.message ||
            "Payment failed."
        );
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoadingPlan(null);
    }
  };

  /* ================= PLANS ================= */
  const plans = [
    {
      title: "UI Only",
      price: 500,
      desc: [
        "Frontend Design",
        "Responsive Layout",
        "Basic Components",
      ],
    },
    {
      title: "UI + Interaction",
      price: 1500,
      highlight: true,
      badge: "MOST POPULAR",
      desc: [
        "Animations",
        "Interactive UI",
        "Advanced Components",
      ],
    },
    {
      title: "Full Stack",
      price: 3000,
      desc: [
        "Frontend + Backend",
        "Database",
        "Authentication",
      ],
    },
  ];

  return (
    <section className="pricing modern-pricing">
      <div className="container">

        {/* TITLE */}
        <div className="section-title">
          <span>PRICING</span>

          <h2>Choose Your Plan</h2>

          <p>Secure GCash Payment via PayMongo</p>
        </div>

        {/* SERVER STATUS */}
        <div className="server-status">
          {serverStatus === "checking" && (
            <p>🟡 Checking backend...</p>
          )}

          {serverStatus === "connected" && (
            <p>🟢 Backend Connected</p>
          )}

          {serverStatus === "offline" && (
            <p>🔴 Backend Offline</p>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="error-box-modern">
            <span>{error}</span>

            <button onClick={() => setError("")}>
              ✕
            </button>
          </div>
        )}

        {/* PRICING GRID */}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${
                plan.highlight ? "highlight" : ""
              }`}
            >
              {plan.badge && (
                <div className="popular-badge">
                  {plan.badge}
                </div>
              )}

              <h3>{plan.title}</h3>

              <p className="price">
                ₱{plan.price}
              </p>

              <ul>
                {plan.desc.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <button
                disabled={
                  loadingPlan === plan.title ||
                  serverStatus !== "connected"
                }
                onClick={() =>
                  handlePlanClick(plan.title, plan.price)
                }
              >
                {loadingPlan === plan.title
                  ? "Processing..."
                  : "Pay with GCash"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}