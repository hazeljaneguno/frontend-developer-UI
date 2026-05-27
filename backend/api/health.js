export default function handler(req, res) {
  const FRONTEND_URL = process.env.FRONTEND_URL;

  const origin = req.headers.origin;

  const allowedOrigins = new Set([
    FRONTEND_URL,
    "http://localhost:5173",
  ].filter(Boolean));

  /* ================= CORS ================= */

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // fallback for safety (optional but stable)
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  /* ================= PRE-FLIGHT ================= */
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  /* ================= METHOD CHECK ================= */
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  /* ================= RESPONSE ================= */
  return res.status(200).json({
    success: true,
    message: "Backend connected 🚀",
    timestamp: Date.now(),
  });
}