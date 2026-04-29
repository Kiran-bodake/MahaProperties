// src/components/property/ContactPopup.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const showcaseSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
    title: "Verified Premium Listings",
    desc: "100% verified NA plots, commercial spaces & investment properties.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop",
    title: "Trusted Property Experts",
    desc: "Get instant support for pricing, site visits & documentation.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
    title: "Prime Nashik Locations",
    desc: "Discover high-growth investment opportunities in premium areas.",
  },
];

export default function ContactPopup({ open, onClose }: Props) {
  const [selected, setSelected] = useState("Buy");
  const [activeSlide, setActiveSlide] = useState(0);

  // FORM STATES
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const goNext = useCallback(() => {
    setActiveSlide((p) => (p === showcaseSlides.length - 1 ? 0 : p + 1));
  }, []);

  const goPrev = useCallback(() => {
    setActiveSlide((p) => (p === 0 ? showcaseSlides.length - 1 : p - 1));
  }, []);

  // SAVE DATA TO MONGODB
  const handleSubmit = async () => {
    if (!name || !phone || !email) {
      alert("Please fill all fields");
      return;
    }

    // remove non-numeric characters
    const cleanPhone = phone.replace(/\D/g, "");

    // validate 10 digit mobile number
    if (cleanPhone.length !== 10) {
      alert("Invalid mobile number. Please enter 10 digits.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone: cleanPhone,
          email,
          interest: selected,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Information saved successfully");

        setName("");
        setPhone("");
        setEmail("");
        setSelected("Buy");

        onClose();
      } else {
        alert("Failed to save information");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const timer = setInterval(goNext, 3500);

    return () => clearInterval(timer);
  }, [open, goNext]);

  if (!open) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="closeBtn"
            aria-label="Close Popup"
          >
            ×
          </button>

          {/* LEFT PANEL */}
          <div className="leftPanel">
            <div className="slider">
              {showcaseSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${activeSlide === index ? "active" : ""}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="slideOverlay" />

                  <div className="slideContent">
                    <span className="brandBadge">★ MAHAPROPERTY</span>

                    <h2 className="slideTitle">{slide.title}</h2>

                    <p className="slideDesc">{slide.desc}</p>
                  </div>
                </div>
              ))}

              {/* ARROWS */}
              <button
                type="button"
                className="navArrow navArrow--left"
                onClick={goPrev}
              >
                ‹
              </button>

              <button
                type="button"
                className="navArrow navArrow--right"
                onClick={goNext}
              >
                ›
              </button>

              {/* DOTS */}
              <div className="dots">
                {showcaseSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${
                      activeSlide === index ? "activeDot" : ""
                    }`}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="rightPanel">
            <div className="header">
              <h2>Contact Property Owner</h2>

              <p>
                Get pricing details, brochures, site visit support and expert
                consultation instantly.
              </p>
            </div>

            {/* INTEREST */}
            <div className="section">
              <label className="label">I am interested in</label>

              <div className="radioWrap">
                {["Buy", "Rent", "Investment"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelected(item)}
                    className={
                      selected === item ? "pillBtn active" : "pillBtn"
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div className="form">
              <input
                type="text"
                placeholder="Your Name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="input"
                value={phone}
                maxLength={10}
                pattern="[0-9]{10}"
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email Address"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="checkWrap">
              <input type="checkbox" defaultChecked />
              <span>Get instant updates on WhatsApp</span>
            </label>

            {/* SUBMIT */}
            <button
              className="submitBtn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Get Contact Details"}
            </button>

            <div className="trustInfo">
              🔒 Your information is safe & secure with MahaProperty
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 18px;
          z-index: 9999;
          backdrop-filter: blur(10px);
        }

        .popup {
          width: 100%;
          max-width: 1100px;
          height: 88vh;
          background: white;
          border-radius: 28px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          position: relative;
        }

        .closeBtn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 28px;
          cursor: pointer;
          z-index: 10;
        }

        .leftPanel {
          position: relative;
          overflow: hidden;
        }

        .slider {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
          background-size: cover;
          background-position: center;
          padding: 30px;
          display: flex;
          align-items: flex-end;
        }

        .slide.active {
          opacity: 1;
        }

        .slideOverlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
        }

        .slideContent {
          position: relative;
          z-index: 2;
          color: white;
        }

        .slideTitle {
          font-size: 2rem;
          font-weight: 900;
        }

        .slideDesc {
          margin-top: 10px;
        }

        .brandBadge {
          background: #16a34a;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
        }

        .navArrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
        }

        .navArrow--left {
          left: 10px;
        }

        .navArrow--right {
          right: 10px;
        }

        .dots {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.5);
        }

        .activeDot {
          background: #22c55e;
        }

        .rightPanel {
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .header h2 {
          font-size: 2rem;
          margin: 0;
        }

        .header p {
          color: #64748b;
          margin-top: 10px;
        }

        .section {
          margin-top: 20px;
        }

        .label {
          font-weight: 700;
          margin-bottom: 10px;
          display: block;
        }

        .radioWrap {
          display: flex;
          gap: 10px;
        }

        .pillBtn {
          height: 42px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid #d1d5db;
          background: white;
          cursor: pointer;
        }

        .pillBtn.active {
          background: #16a34a;
          color: white;
          border-color: #16a34a;
        }

        .form {
          margin-top: 20px;
        }

        .input {
          width: 100%;
          height: 52px;
          border-radius: 14px;
          border: 1px solid #d1d5db;
          padding: 0 16px;
          margin-bottom: 12px;
        }

        .checkWrap {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .submitBtn {
          width: 100%;
          height: 54px;
          margin-top: 20px;
          border: none;
          border-radius: 14px;
          background: #16a34a;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .submitBtn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .trustInfo {
          margin-top: 12px;
          text-align: center;
          color: #64748b;
          font-size: 12px;
        }
      `}</style>
    </>
  );
}