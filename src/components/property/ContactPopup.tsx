// src/components/property/ContactPopup.tsx

"use client";

import React, { useEffect, useState } from "react";

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

export default function ContactPopup({
  open,
  onClose,
}: Props) {
  const [selected, setSelected] =
    useState("Buy");

  const [activeSlide, setActiveSlide] =
    useState(0);

  useEffect(() => {
    if (!open) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) =>
        prev === showcaseSlides.length - 1
          ? 0
          : prev + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="overlay">
        <div className="popup">

          {/* CLOSE BUTTON */}

          <button
            onClick={onClose}
            className="closeBtn"
          >
            ×
          </button>

          {/* LEFT PANEL */}

          <div className="leftPanel">

            <div className="slider">

              {showcaseSlides.map(
                (slide, index) => (
                  <div
                    key={index}
                    className={`slide ${
                      activeSlide === index
                        ? "active"
                        : ""
                    }`}
                style={{
  backgroundImage: `linear-gradient(rgba(255,255,255,.08), rgba(255,255,255,.18)), url(${slide.image})`,
}}
                  >
                    <div className="slideContent">

                      <span className="brandBadge">
                        MAHAPROPERTY
                      </span>

                      <h2>
                        {slide.title}
                      </h2>

                      <p>
                        {slide.desc}
                      </p>

                      {/* FEATURES */}

                      <div className="featureScroller">

                        <div className="featureCard">
                          <span>✅</span>
                          <p>Verified</p>
                        </div>

                        <div className="featureCard">
                          <span>📍</span>
                          <p>Prime Areas</p>
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
                )
              )}

              {/* DOTS */}

              <div className="dots">
                {showcaseSlides.map(
                  (_, index) => (
                    <button
                      key={index}
                      className={`dot ${
                        activeSlide === index
                          ? "activeDot"
                          : ""
                      }`}
                      onClick={() =>
                        setActiveSlide(index)
                      }
                    />
                  )
                )}
              </div>

            </div>
          </div>

          {/* RIGHT PANEL */}

          <div className="rightPanel">

            <div className="header">

              <h2>
                Contact Property Owner
              </h2>

              <p>
                Get pricing details,
                property brochure,
                site visit assistance
                and expert consultation.
              </p>

            </div>

            {/* INTEREST */}

            <div className="section">

              <label className="label">
                I am interested in
              </label>

              <div className="radioWrap">

                {[
                  "Buy",
                  "Rent",
                  "Investment",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setSelected(item)
                    }
                    className={
                      selected === item
                        ? "pillBtn active"
                        : "pillBtn"
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
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="input"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="input"
              />

            </div>

            {/* WHATSAPP */}

            <label className="checkWrap">

              <input
                type="checkbox"
                checked
                readOnly
              />

              <span>
                Get instant updates on
                WhatsApp
              </span>

            </label>

            {/* BUTTON */}

            <button className="submitBtn">
              Get Contact Details
            </button>

            <div className="trustInfo">
              🔒 Your information is safe &
              secure with MahaProperty
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 14px;
          z-index: 9999;
          backdrop-filter: blur(8px);
        }

        .popup {
          width: 100%;
          max-width: 1180px;
          height: 88vh;
          background: white;
          border-radius: 24px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.02fr 0.98fr;
          position: relative;
          animation: popup 0.3s ease;
        }

        @keyframes popup {
          from {
            opacity: 0;
            transform: scale(0.96)
              translateY(10px);
          }

          to {
            opacity: 1;
            transform: scale(1)
              translateY(0);
          }
        }

        .closeBtn {
          position: absolute;
          top: 18px;
          left: 18px;

          width: 46px;
          height: 46px;

          border-radius: 50%;
          border: none;

          background: rgba(
            255,
            255,
            255,
            0.2
          );

          backdrop-filter: blur(10px);

          color: white;
          font-size: 30px;

          cursor: pointer;
          z-index: 100;
        }

        /* LEFT */

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
  transition: 0.4s ease;

  background-size: cover;
  background-position: center;

  display: flex;
  align-items: flex-end;

  padding: 38px;
}
        .slide.active {
          opacity: 1;
        }

        .slideContent {
          width: 100%;
          max-width: 520px;
          color: white;
        }

        .brandBadge {
          display: inline-flex;

          padding: 9px 16px;

          border-radius: 999px;

          background: rgba(
            255,
            255,
            255,
            0.16
          );

          backdrop-filter: blur(10px);

          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .slideContent h2 {
          margin-top: 20px;
          margin-bottom: 14px;

          font-size: 2.5rem;
          line-height: 1.1;
          font-weight: 900;
        }

        .slideContent p {
          font-size: 14px;
          line-height: 1.7;

          color: rgba(
            255,
            255,
            255,
            0.92
          );
        }

        /* FEATURES */

        .featureScroller {
          margin-top: 24px;

          display: flex;
          gap: 12px;

          overflow-x: auto;

          padding-bottom: 4px;

          scrollbar-width: none;
        }

        .featureScroller::-webkit-scrollbar {
          display: none;
        }

        .featureCard {
          min-width: 165px;

          background: rgba(
            255,
            255,
            255,
            0.14
          );

          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.14
            );

          backdrop-filter: blur(10px);

          border-radius: 18px;

          padding: 16px 18px;

          display: flex;
          align-items: center;
          gap: 10px;

          flex-shrink: 0;
        }

        .featureCard span {
          font-size: 18px;
        }

        .featureCard p {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.2;
          color: white;
        }

        .dots {
          position: absolute;

          bottom: 18px;
          left: 50%;

          transform: translateX(-50%);

          display: flex;
          gap: 10px;

          z-index: 20;
        }

        .dot {
          width: 10px;
          height: 10px;

          border-radius: 999px;
          border: none;

          background: rgba(
            255,
            255,
            255,
            0.4
          );

          cursor: pointer;
        }

        .activeDot {
          background: white;
        }

        /* RIGHT */

        .rightPanel {
          padding: 42px;
          overflow-y: auto;

          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .header h2 {
          margin: 0;

          font-size: 2.2rem;
          font-weight: 900;

          color: #111827;
        }

        .header p {
          margin-top: 14px;

          color: #64748b;

          line-height: 1.7;
          font-size: 14px;
        }

        .section {
          margin-top: 28px;
        }

        .label {
          display: block;

          margin-bottom: 14px;

          font-size: 14px;
          font-weight: 700;

          color: #374151;
        }

        .radioWrap {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .pillBtn {
          height: 48px;

          padding: 0 22px;

          border-radius: 999px;

          border: 1px solid #d1d5db;

          background: white;

          font-weight: 700;
          cursor: pointer;
        }

        .pillBtn.active {
          background: #16a34a;
          border-color: #16a34a;
          color: white;
        }

        .form {
          margin-top: 28px;
        }

        .input {
          width: 100%;
          height: 58px;

          border-radius: 16px;
          border: 1px solid #d1d5db;

          padding: 0 18px;

          margin-bottom: 16px;

          font-size: 14px;
          outline: none;
        }

        .input:focus {
          border-color: #16a34a;

          box-shadow: 0 0 0 4px
            rgba(34, 197, 94, 0.12);
        }

        .checkWrap {
          display: flex;
          align-items: center;

          gap: 10px;

          margin-top: 4px;

          font-size: 14px;
          color: #374151;
        }

        .checkWrap input {
          width: 18px;
          height: 18px;

          accent-color: #16a34a;
        }

        .submitBtn {
          width: 100%;
          height: 58px;

          margin-top: 24px;

          border: none;
          border-radius: 18px;

          background: linear-gradient(
            135deg,
            #16a34a,
            #22c55e
          );

          color: white;

          font-size: 15px;
          font-weight: 900;

          cursor: pointer;
        }

        .trustInfo {
          margin-top: 16px;

          text-align: center;

          font-size: 13px;
          color: #64748b;
        }

        /* TABLET */

        @media (max-width: 1024px) {

          .popup {
            max-width: 960px;
            height: 92vh;
          }

          .slideContent h2 {
            font-size: 2rem;
          }

          .rightPanel {
            padding: 34px;
          }
        }

        /* MOBILE */

        @media (max-width: 768px) {

          .overlay {
            padding: 0;
          }

          .popup {
            width: 100%;
            height: 100vh;

            border-radius: 0;

            grid-template-columns: 1fr;
          }

          .leftPanel {
            height: 42vh;
          }

          .slide {
            padding: 24px;
          }

          .slideContent {
            max-width: 100%;
          }

          .slideContent h2 {
            font-size: 1.8rem;
          }

          .slideContent p {
            font-size: 13px;
          }

          .featureScroller {
            margin-top: 18px;
            gap: 10px;
          }

          .featureCard {
            min-width: 145px;
            padding: 14px;
          }

          .featureCard p {
            font-size: 12px;
          }

          .rightPanel {
            height: 58vh;
            padding: 24px 18px;
          }

          .header h2 {
            font-size: 1.7rem;
          }

          .radioWrap {
            flex-direction: row;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 4px;
          }

          .pillBtn {
            flex-shrink: 0;
          }

          .closeBtn {
            top: 16px;
            left: 16px;
          }
        }

        /* SMALL MOBILE */

        @media (max-width: 480px) {

          .leftPanel {
            height: 38vh;
          }

          .slideContent h2 {
            font-size: 1.5rem;
          }

          .rightPanel {
            padding: 20px 16px;
          }

          .header h2 {
            font-size: 1.45rem;
          }

          .featureCard {
            min-width: 135px;
          }

          .closeBtn {
            width: 42px;
            height: 42px;
            font-size: 26px;
          }
        }

      `}</style>
    </>
  );
}