export default function handler(req, res) {
  const FRONTEND_URL = process.env.FRONTEND_URL;

  const origin = req.headers.origin;

  const allowedOrigins = [
    FRONTEND_URL,
    "http://localhost:5173",
  ].filter(Boolean); // IMPORTANT FIX

  // ================= CORS =================
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  // ================= PRE-FLIGHT =================
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ================= METHOD CHECK =================
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  // ================= RESPONSE =================
  return res.status(200).json({
    success: true,
    message: "Backend connected 🚀",
    timestamp: new Date().toISOString(),
  });
}