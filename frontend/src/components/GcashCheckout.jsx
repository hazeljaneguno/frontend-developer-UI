import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function GcashCheckout({ plan, price, onClose }) {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const confirmOrder = async () => {
    setLoading(true);

    const templateParams = {
      plan,
      price,
      message: `GCash Payment Confirmed for ${plan} (${price})`,
      status: "PAID (manual confirmation)",
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setPaid(true);

    } catch (err) {
      console.error(err);
      alert("Failed to confirm order");
    }

    setLoading(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">

        <h2>💳 GCash Checkout</h2>

        <p><b>Plan:</b> {plan}</p>
        <p><b>Price:</b> {price}</p>

        {/* YOUR GCASH QR CODE */}
        <img
          src="/gcash-qr.png"
          alt="GCash QR"
          style={{ width: "250px", margin: "20px auto" }}
        />

        <p>Scan this QR using GCash app</p>

        {!paid ? (
          <button onClick={confirmOrder} disabled={loading}>
            {loading ? "Confirming..." : "I Already Paid"}
          </button>
        ) : (
          <h3>✅ Payment Recorded!</h3>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}