"use client";

import { useEffect } from "react";

export default function Bookings({
  isOpen,
  onClose,
  children,
}) {

  // CLOSE ON ESC
  useEffect(() => {

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };

  }, [onClose]);

  // DON'T RENDER
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >

      {/* MODAL BOX */}
      <div
        className="w-full max-w-2xl bg-[#1c211e] border border-[#4f4633]/20 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#4f4633]/20">

          <h2 className="text-2xl font-bold text-yellow-400">
            Booking Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-400 text-2xl transition"
          >
            ✕
          </button>

        </div>

        {/* BODY */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">

          {children}

        </div>

      </div>

    </div>
  );
}