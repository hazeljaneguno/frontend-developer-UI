import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ================= CONFIG ================= */
const PORT = process.env.PORT || 5000;
const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

/* ================= VALIDATION ================= */
if (!PAYMONGO_SECRET) console.error("❌ Missing PAYMONGO_SECRET_KEY");
if (!FRONTEND_URL) console.error("❌ Missing FRONTEND_URL");

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= CORS FIX (ROBUST) ================= */
const allowedOrigins = [
  FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // allow requests with no origin (Render, Postman, health checks)
  if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } 
  // allow known origins
  else if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* ================= HEALTH CHECK ================= */
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Backend is running 🚀",
  });
});

/* ================= PAYMENT ROUTE ================= */
app.post("/api/create-payment", async (req, res) => {
  try {
    const { plan, price, email } = req.body;

    if (!plan || !price || !email) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const amount = Math.round(Number(price) * 100);

    const response = await axios.post(
      "https://api.paymongo.com/v1/checkout_sessions",
      {
        data: {
          attributes: {
            send_email_receipt: true,
            description: `Payment for ${plan}`,
            line_items: [
              {
                name: plan,
                quantity: 1,
                amount,
                currency: "PHP",
              },
            ],
            payment_method_types: ["gcash"],
            customer_email: email,
            success_url: `${FRONTEND_URL}/success`,
            cancel_url: `${FRONTEND_URL}/cancel`,
          },
        },
      },
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${PAYMONGO_SECRET}:`).toString("base64"),
          "Content-Type": "application/json",
        },
      }
    );

    const checkoutUrl =
      response.data?.data?.attributes?.checkout_url;

    if (!checkoutUrl) {
      return res.status(500).json({
        success: false,
        error: "No checkout URL returned",
      });
    }

    return res.json({
      success: true,
      checkoutUrl,
    });

  } catch (err) {
    console.error("PAYMONGO ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error:
        err.response?.data?.errors?.[0]?.detail ||
        "Payment failed",
    });
  }
});

/* ================= START SERVER ================= */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});