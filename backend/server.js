import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

/* ================= CONFIG ================= */
const PORT = process.env.PORT || 5000;
const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

/* ================= ENV VALIDATION ================= */
if (!PAYMONGO_SECRET) {
  throw new Error("❌ Missing PAYMONGO_SECRET_KEY in .env");
}

if (!FRONTEND_URL) {
  throw new Error("❌ Missing FRONTEND_URL in .env");
}

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= CORS ================= */
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5173"].filter(Boolean),
    credentials: true,
  })
);

/* ================= HEALTH CHECK ================= */
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀",
  });
});

/* ================= PAYMENT ROUTE ================= */
app.post("/api/create-payment", async (req, res) => {
  try {
    const { plan, price, email } = req.body;

    console.log("📩 Incoming payment request:", req.body);

    /* VALIDATION */
    if (!plan || !price || !email) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid price value",
      });
    }

    // Convert PHP → centavos
    const amount = Math.round(numericPrice * 100);

    /* PAYMONGO REQUEST */
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
          Accept: "application/json",
        },
      }
    );

    const checkoutUrl = response.data?.data?.attributes?.checkout_url;

    console.log("🧾 PayMongo response:", response.data);

    if (!checkoutUrl) {
      return res.status(500).json({
        success: false,
        error: "Checkout URL not returned by PayMongo",
      });
    }

    return res.json({
      success: true,
      checkoutUrl,
    });
  } catch (err) {
    console.error("❌ PAYMONGO ERROR:", err.response?.data || err.message);

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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});