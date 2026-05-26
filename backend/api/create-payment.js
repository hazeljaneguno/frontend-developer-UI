import axios from "axios";

export default async function handler(req, res) {
  const FRONTEND_URL = process.env.FRONTEND_URL;
  const PAYMONGO_SECRET = process.env.PAYMONGO_SECRET_KEY;

  /* ================= VALIDATION ================= */

  if (!FRONTEND_URL || !PAYMONGO_SECRET) {
    return res.status(500).json({
      success: false,
      error: "Missing environment variables",
    });
  }

  /* ================= CORS ================= */

  const origin = req.headers.origin;

  const allowedOrigins = [
    FRONTEND_URL,
    "http://localhost:5173",
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  /* ================= PRE-FLIGHT ================= */

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  /* ================= METHOD CHECK ================= */

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { plan, price, email } = req.body;

    /* ================= INPUT VALIDATION ================= */

    if (!plan || !price || !email) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const parsedPrice = Number(price);

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid price",
      });
    }

    const amount = Math.round(parsedPrice * 100);

    /* ================= PAYMONGO REQUEST ================= */

    const response = await axios.post(
      "https://api.paymongo.com/v1/checkout_sessions",
      {
        data: {
          attributes: {
            send_email_receipt: true,
            show_description: true,
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

    return res.status(200).json({
      success: true,
      checkoutUrl,
    });

  } catch (error) {
    console.error("PAYMONGO ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error:
        error.response?.data?.errors?.[0]?.detail ||
        "Payment failed",
    });
  }
}