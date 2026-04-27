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

  const goNext = useCallback(() => {
    setActiveSlide((p) => (p === showcaseSlides.length - 1 ? 0 : p + 1));
  }, []);

  const goPrev = useCallback(() => {
    setActiveSlide((p) => (p === 0 ? showcaseSlides.length - 1 : p - 1));
  }, []);

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
          <button onClick={onClose} className="closeBtn" aria-label="Close Popup">
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
                  {/* Strong gradient overlay for text contrast */}
                  <div className="slideOverlay" />

                  <div className="slideContent">
                    <span className="brandBadge">★ MAHAPROPERTY</span>

                    <h2 className="slideTitle">{slide.title}</h2>

                    <p className="slideDesc">{slide.desc}</p>

                    <div className="featureScroller">
                      <div className="featureCard">
                        <span>✅</span>
                        <p>Verified Listings</p>
                      </div>
                      <div className="featureCard">
                        <span>📍</span>
                        <p>Prime Locations</p>
                      </div>
                      <div className="featureCard">
                        <span>💰</span>
                        <p>Best Deals</p>
                      </div>
                      <div className="featureCard">
                        <span>🏢</span>
                        <p>Premium Projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* MANUAL ARROWS */}
              <button
                type="button"
                className="navArrow navArrow--left"
                onClick={goPrev}
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                type="button"
                className="navArrow navArrow--right"
                onClick={goNext}
                aria-label="Next slide"
              >
                ›
              </button>

              {/* DOTS */}
              <div className="dots">
                {showcaseSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${activeSlide === index ? "activeDot" : ""}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
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

            <div className="section">
              <label className="label">I am interested in</label>
              <div className="radioWrap">
                {["Buy", "Rent", "Investment"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelected(item)}
                    className={selected === item ? "pillBtn active" : "pillBtn"}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="form">
              <input type="text" placeholder="Your Name" className="input" />
              <input type="tel" placeholder="Phone Number" className="input" />
              <input type="email" placeholder="Email Address" className="input" />
            </div>

            <label className="checkWrap">
              <input type="checkbox" defaultChecked />
              <span>Get instant updates on WhatsApp</span>
            </label>

            <button className="submitBtn">Get Contact Details</button>

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
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
          animation: popup 0.25s ease;
        }
        @keyframes popup {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* CLOSE BUTTON */
        .closeBtn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(0, 0, 0, 0.75);
          color: #ffffff;
          font-size: 30px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 999;
          transition: 0.25s ease;
        }
        .closeBtn:hover {
          background: #16a34a;
          transform: scale(1.05);
        }

        /* LEFT PANEL */
        .leftPanel {
          position: relative;
          overflow: hidden;
          height: 100%;
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
          display: flex;
          align-items: flex-end;
          padding: 32px;
        }
        .slide.active { opacity: 1; }

        /* STRONG dark gradient overlay for text contrast */
        .slideOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.35) 40%,
            rgba(0, 0, 0, 0.85) 100%
          );
          z-index: 1;
        }

        .slideContent {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 480px;
          color: white;
        }

        /* BADGE */
        .brandBadge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
          box-shadow: 0 6px 18px rgba(22, 163, 74, 0.45);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
        }

        /* TITLE — high contrast, clear, attractive */
        .slideTitle {
          margin-top: 18px;
          margin-bottom: 12px;
          font-size: 2.25rem;
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-shadow:
            0 2px 8px rgba(0, 0, 0, 0.7),
            0 1px 2px rgba(0, 0, 0, 0.9);
        }

        /* DESCRIPTION */
        .slideDesc {
          font-size: 14.5px;
          line-height: 1.6;
          color: #f1f5f9;
          font-weight: 500;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
          margin: 0;
        }

        /* FEATURES */
        .featureScroller {
          margin-top: 20px;
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .featureScroller::-webkit-scrollbar { display: none; }
        .featureCard {
          min-width: 150px;
          background: rgba(255, 255, 255, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .featureCard p {
          margin: 0;
          font-size: 12px;
          font-weight: 800;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
        }

        /* === MANUAL NAVIGATION ARROWS === */
        .navArrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(8px);
          color: white;
          font-size: 32px;
          font-weight: 700;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 15;
          transition: all 0.25s ease;
          padding: 0 0 4px 0;
        }
        .navArrow:hover {
          background: #16a34a;
          border-color: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 22px rgba(22, 163, 74, 0.5);
        }
        .navArrow--left { left: 16px; }
        .navArrow--right { right: 16px; }

        /* DOTS */
        .dots {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: none;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: 0.2s ease;
        }
        .dot:hover { background: rgba(255, 255, 255, 0.8); }
        .activeDot {
          background: #22c55e;
          width: 26px;
        }

        /* RIGHT PANEL */
        .rightPanel {
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        .header h2 {
          margin: 0;
          font-size: 2rem;
          font-weight: 900;
          color: #111827;
        }
        .header p {
          margin-top: 10px;
          color: #64748b;
          line-height: 1.6;
          font-size: 14px;
        }
        .section { margin-top: 20px; }
        .label {
          display: block;
          margin-bottom: 12px;
          font-size: 13px;
          font-weight: 700;
          color: #374151;
        }
        .radioWrap {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .pillBtn {
          height: 42px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid #d1d5db;
          background: white;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
          color: #111827;
        }
        .pillBtn:hover { border-color: #16a34a; }
        .pillBtn.active {
          background: #16a34a;
          border-color: #16a34a;
          color: white;
        }
        .form { margin-top: 20px; }
        .input {
          width: 100%;
          height: 52px;
          border-radius: 14px;
          border: 1px solid #d1d5db;
          padding: 0 16px;
          margin-bottom: 12px;
          font-size: 14px;
          outline: none;
          transition: 0.2s ease;
          color: #111827;
        }
        .input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12);
        }
        .checkWrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 6px;
          font-size: 13px;
          color: #374151;
        }
        .checkWrap input {
          width: 18px;
          height: 18px;
          accent-color: #16a34a;
        }
        .submitBtn {
          width: 100%;
          height: 54px;
          margin-top: 18px;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.25s ease;
        }
        .submitBtn:hover { transform: translateY(-1px); }
        .trustInfo {
          margin-top: 14px;
          text-align: center;
          font-size: 12px;
          color: #64748b;
        }

        /* TABLET */
        @media (max-width: 900px) {
          .popup {
            grid-template-columns: 1fr;
            height: 95vh;
          }
          .leftPanel { height: 38%; }
          .rightPanel { height: 62%; overflow-y: auto; }
          .navArrow { width: 40px; height: 40px; font-size: 26px; }
          .slideTitle { font-size: 1.6rem; }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .overlay { padding: 0; }
          .popup {
            width: 100%;
            height: 100vh;
            border-radius: 0;
          }
          .leftPanel { height: 34%; }
          .rightPanel { padding: 22px 18px; }
          .slide { padding: 22px; }
          .slideTitle { font-size: 1.4rem; }
          .header h2 { font-size: 1.6rem; }
          .closeBtn {
            top: 14px;
            right: 14px;
            width: 44px;
            height: 44px;
            font-size: 28px;
            background: rgba(0, 0, 0, 0.85);
            color: #ffffff;
          }
          .navArrow {
            width: 36px;
            height: 36px;
            font-size: 22px;
          }
          .navArrow--left { left: 10px; }
          .navArrow--right { right: 10px; }
        }
      `}</style>
    </>
  );
}
