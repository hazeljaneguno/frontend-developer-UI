export default function handler(req, res) {
  try {
    /* ================= METHOD CHECK ================= */
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    /* ================= BODY SAFETY ================= */
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    console.log("📩 Webhook received:", body);

    /* ================= RESPONSE ================= */
    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("❌ Webhook error:", error.message);

    return res.status(500).json({
      error: "Webhook processing failed",
    });
  }
}