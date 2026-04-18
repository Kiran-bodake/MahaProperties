"use client";
import { useState } from "react";

interface StickyContactFormProps {
  title?: string;
  description?: string;
}

export function StickyContactForm({
  title = "Contact Us",
  description = "Get in touch to book viewing, pricing info or site support.",
}: StickyContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [visible, setVisible] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 750));
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setStatus("Thank you! We will contact you shortly.");
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }
  };

  if (!visible) return null;

  return (
    <aside
      style={{
        position: "fixed",
        right: "20px",
        bottom: "23px",
        width: "360px",
        maxWidth: "calc(100vw - 32px)",
        zIndex: 999,
        background: "#ffffff",
        border: "1px solid #d6dce1",
        borderRadius: "14px",
        boxShadow: "0 18px 44px rgba(15, 23, 42, 0.24)",
        overflow: "hidden",
        fontFamily: "var(--font-dm, 'DM Sans', sans-serif)",
      }}
    >
      <div style={{ position: "relative", padding: "14px 16px", background: "linear-gradient(135deg, #14532d, #16a34a)", color: "white" }}>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Close contact form"
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.15)",
            color: "white",
            fontSize: "16px",
            lineHeight: "26px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <h4 style={{ margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 800, color: "white" }}>{title}</h4>
        <p style={{ margin: 0, fontSize: "0.88rem", opacity: 0.93 }}>{description}</p>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            style={{ width: "100%", marginBottom: "8px", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            style={{ width: "100%", marginBottom: "8px", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            type="tel"
            required
            style={{ width: "100%", marginBottom: "8px", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            required
            style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", minHeight: "86px" }}
          />
          <button
            type="submit"
            style={{ width: "100%", padding: "11px", background: "#047857", color: "white", borderRadius: "8px", border: "none", fontWeight: 700, fontSize: "0.95rem" }}
          >
            Submit request
          </button>
        </form>
        {status && <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#065f46" }}>{status}</p>}
      </div>
    </aside>
  );
}
