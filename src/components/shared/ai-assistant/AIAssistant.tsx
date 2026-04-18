"use client";
import { useState } from "react";

export function AIAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-600 text-white shadow-2xl flex items-center justify-center text-2xl hover:bg-green-700 transition-colors"
        aria-label="AI Assistant"
      >
        💬
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-green-700 text-white p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">PropVista AI</div>
              <div className="text-xs text-green-200">Investment advisor</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-green-200">✕</button>
          </div>
          <div className="p-4 text-sm text-gray-600">
            Hi! Ask me about NA plots, investment areas, or property prices in Nashik 🏡
          </div>
        </div>
      )}
    </>
  );
}
