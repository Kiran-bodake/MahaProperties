"use client";

import { useState } from "react";

export default function PropertyImageSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const openFullscreen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFullscreen(true);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
  };

  return (
    <>
      <div
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      >
        <img
          src={images[current]}
          alt={title}
          onClick={openFullscreen}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* LEFT BUTTON */}
        <button
          onClick={prevImage}
          style={{
            ...navBtnLeft,
            opacity: showArrows ? 1 : 0,
            pointerEvents: showArrows ? "auto" : "none",
          }}
        >
          ❮
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextImage}
          style={{
            ...navBtnRight,
            opacity: showArrows ? 1 : 0,
            pointerEvents: showArrows ? "auto" : "none",
          }}
        >
          ❯
        </button>

        {/* IMAGE COUNT */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "14px",
            background: "rgba(0,0,0,.65)",
            color: "white",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
            backdropFilter: "blur(4px)",
          }}
        >
          {current + 1} / {images.length}
        </div>
      </div>

      {/* FULLSCREEN MODAL */}
      {fullscreen && (
        <div
          onClick={closeFullscreen}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.96)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={images[current]}
            alt={title}
            style={{
              maxWidth: "95vw",
              maxHeight: "95vh",
              objectFit: "contain",
              borderRadius: "20px",
            }}
          />

          {/* CLOSE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeFullscreen();
            }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(255,255,255,.15)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "28px",
              fontWeight: 700,
              backdropFilter: "blur(6px)",
            }}
          >
            ×
          </button>

          {/* FULLSCREEN LEFT */}
          <button
            onClick={prevImage}
            style={fullscreenLeft}
          >
            ❮
          </button>

          {/* FULLSCREEN RIGHT */}
          <button
            onClick={nextImage}
            style={fullscreenRight}
          >
            ❯
          </button>
        </div>
      )}
    </>
  );
}

const navBtnLeft: React.CSSProperties = {
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: "none",
  background: "rgba(0,0,0,0.25)", // more transparent
  color: "rgba(255,255,255,0.7)", // transparen
  fontSize: "18px",
  cursor: "pointer",
  backdropFilter: "blur(4px)",
  transition: "all .25s ease",
};

const navBtnRight: React.CSSProperties = {
  ...navBtnLeft,
  left: "auto",
  right: "14px",
};

const fullscreenLeft: React.CSSProperties = {
  position: "absolute",
  left: "30px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "58px",
  height: "58px",
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,.15)",
  color: "#fff",
  fontSize: "30px",
  cursor: "pointer",
  backdropFilter: "blur(6px)",
};

const fullscreenRight: React.CSSProperties = {
  ...fullscreenLeft,
  left: "auto",
  right: "30px",
};