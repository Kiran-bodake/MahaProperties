"use client";

import { useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  const isValidMobile = mobile.length === 10;
  const isOtpComplete = otp.every((d) => d !== "");

  /* TIMER */
  useEffect(() => {
    if (step !== "otp") return;
    setTimer(30);

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  /* AUTO FOCUS */
  useEffect(() => {
    if (step === "otp") inputRefs.current[0]?.focus();
  }, [step]);

  /* SEND OTP */
  const sendOtp = async () => {
    setError("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter valid mobile number");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        return;
      }

      alert("OTP: " + data.otp);
      setStep("otp");
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  /* VERIFY OTP */
  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile, otp: finalOtp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid OTP");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login Successful 🎉");
      window.location.href = "/";
    } catch {
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const closeModal = () => {
    window.location.href = "/";
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        
        {/* CLOSE BUTTON */}
        <button onClick={closeModal} style={styles.close}>
          ✕
        </button>

        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            {step === "mobile" ? "Welcome Back" : "Verify OTP"}
          </h2>
          <p style={styles.subtitle}>
            {step === "mobile"
              ? "Login with your mobile number"
              : `OTP sent to +91 ${mobile}`}
          </p>
        </div>

        {/* BODY */}
        <div style={styles.body}>
          {step === "mobile" && (
            <>
              <label style={styles.label}>Mobile Number</label>

              <div style={styles.inputBox}>
                <span style={styles.prefix}>+91</span>
                <input
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter mobile number"
                  style={styles.input}
                />
              </div>

              {error && <p style={styles.error}>{error}</p>}

              <button
                onClick={sendOtp}
                disabled={!isValidMobile || loading}
                style={{
                  ...styles.button,
                  backgroundColor:
                    isValidMobile && !loading ? "#16a34a" : "#ccc",
                }}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <p style={styles.otpText}>Enter 6-digit OTP</p>

              <div style={styles.otpContainer}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    value={digit}
                    maxLength={1}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, i)
                    }
                    style={styles.otpBox}
                  />
                ))}
              </div>

              {error && <p style={styles.error}>{error}</p>}

              <button
                onClick={verifyOtp}
                disabled={!isOtpComplete || loading}
                style={{
                  ...styles.button,
                  backgroundColor:
                    isOtpComplete && !loading ? "#16a34a" : "#ccc",
                }}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <p style={styles.timer}>Resend OTP in {timer}s</p>

              <button
                onClick={() => {
                  setStep("mobile");
                  setOtp(["", "", "", "", "", ""]);
                }}
                style={styles.link}
              >
                Change mobile number
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
  },

  modal: {
    width: "100%",
    maxWidth: "380px",
    background: "#fff",
    borderRadius: "18px",
    overflow: "hidden",
    position: "relative",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },

  close: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    background: "#ffffffcc",
    cursor: "pointer",
    fontSize: "16px",
  },

  header: {
    background: "linear-gradient(135deg, #22c55e, #15803d)",
    color: "#fff",
    padding: "28px 20px 40px",
    textAlign: "center",
    borderBottomLeftRadius: "40% 20%",
    borderBottomRightRadius: "40% 20%",
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "6px",
    fontSize: "13px",
    opacity: 0.9,
  },

  body: {
    padding: "20px",
  },

  label: {
    fontSize: "13px",
    color: "#444",
  },

  inputBox: {
    display: "flex",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "8px",
  },

  prefix: {
    marginRight: "8px",
    color: "#555",
  },

  input: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
  },

  button: {
    marginTop: "20px",
    width: "100%",
    height: "45px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },

  otpText: {
    textAlign: "center",
    marginBottom: "12px",
    fontSize: "14px",
  },

  otpContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  otpBox: {
    width: "42px",
    height: "45px",
    textAlign: "center",
    fontSize: "18px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  },

  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "8px",
    textAlign: "center",
  },

  timer: {
    textAlign: "center",
    marginTop: "12px",
    fontSize: "13px",
    color: "#555",
  },

  link: {
    display: "block",
    margin: "10px auto 0",
    background: "none",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "13px",
  },
};