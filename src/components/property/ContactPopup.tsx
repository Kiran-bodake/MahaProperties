// src/components/property/ContactPopup.tsx

"use client";

import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ContactPopup({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={popup}>
        <button onClick={onClose} style={closeBtn}>
          ×
        </button>

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: 800,
          }}
        >
          Contact Property Owner
        </h2>

        <label style={label}>I am interested in</label>

        <div style={radioWrap}>
          <button style={pillBtn}>Buy</button>
          <button style={pillBtn}>Rent</button>
          <button style={pillBtn}>Investment</button>
        </div>

        <input
          type="text"
          placeholder="Your Name"
          style={input}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          style={input}
        />

        <input
          type="email"
          placeholder="Email Address"
          style={input}
        />

        <div style={checkWrap}>
          <input type="checkbox" />
          <span>
            I agree to receive updates on WhatsApp
          </span>
        </div>

        <button style={submitBtn}>
          Get Contact Details
        </button>
      </div>
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const popup: React.CSSProperties = {
  width: "100%",
  maxWidth: "520px",
  background: "#fff",
  borderRadius: "24px",
  padding: "32px",
  position: "relative",
};

const closeBtn: React.CSSProperties = {
  position: "absolute",
  top: "16px",
  right: "16px",
  border: "none",
  background: "transparent",
  fontSize: "28px",
  cursor: "pointer",
};

const label: React.CSSProperties = {
  display: "block",
  marginBottom: "12px",
  fontSize: "14px",
  fontWeight: 700,
  color: "#374151",
};

const radioWrap: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  marginBottom: "24px",
  flexWrap: "wrap",
};

const pillBtn: React.CSSProperties = {
  height: "42px",
  padding: "0 18px",
  borderRadius: "999px",
  border: "1px solid #d1d5db",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};

const input: React.CSSProperties = {
  width: "100%",
  height: "54px",
  border: "1px solid #d1d5db",
  borderRadius: "14px",
  padding: "0 16px",
  marginBottom: "18px",
  fontSize: "15px",
  outline: "none",
};

const checkWrap: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "18px",
  color: "#4b5563",
  fontSize: "14px",
};

const submitBtn: React.CSSProperties = {
  width: "100%",
  height: "56px",
  borderRadius: "16px",
  border: "none",
  background: "linear-gradient(135deg,#16a34a,#22c55e)",
  color: "white",
  fontWeight: 900,
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "18px",
};