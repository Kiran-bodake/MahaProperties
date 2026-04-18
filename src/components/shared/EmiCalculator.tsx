"use client";

import { useState } from "react";

type EmiCalculatorProps = {
  price: number;
};

export function EmiCalculator({ price }: EmiCalculatorProps) {
  const [downPayment, setDownPayment] = useState(20);
  const [rate, setRate] = useState(7.5);
  const [term, setTerm] = useState(20);

  const principal = price * (100 - downPayment) / 100;
  const monthlyRate = rate / 12 / 100;
  const months = term * 12;
  const emi = principal > 0 ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1) : 0;

  return (
    <div style={{ background: "white", borderRadius: "12px", padding: "18px", boxShadow: "0 12px 30px rgba(0,0,0,.08)" }}>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "12px" }}>EMI Calculator</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", color: "#475569" }}>Down payment (%)</label>
          <input type="range" min={0} max={80} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
          <div style={{ fontWeight: 700 }}>{downPayment}%</div>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", color: "#475569" }}>Interest rate (p.a.)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} style={{ width: "100%", padding: "6px 8px", borderRadius: "8px", border: "1px solid #d1d5db" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", color: "#475569" }}>Loan term (years)</label>
          <input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} style={{ width: "100%", padding: "6px 8px", borderRadius: "8px", border: "1px solid #d1d5db" }} />
        </div>
      </div>
      <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#16a34a" }}>₹{Math.round(emi).toLocaleString()} / month</div>
      <p style={{ marginTop: "6px", color: "#64748b" }}>EMI starting from ₹{Math.round(price * 0.8 / (term * 12)).toLocaleString()}</p>
    </div>
  );
}
