"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteConfirmModal({
  roomId,
  roomOwnerEmail,
  onClose,
  onDeleted,
}) {
  const [deleting, setDeleting] = useState(false);

  /* ==========================================
  BUG FIX #1 — ownerEmail sent as QUERY PARAM
  HTTP DELETE requests often have their body stripped
  by proxies/servers. Query param is always safe.
  ========================================== */
  const handleDelete = async () => {
    if (!roomOwnerEmail) {
      toast.error("Owner email missing — cannot delete");
      return;
    }

    try {
      setDeleting(true);

      const url = `http://localhost:5000/api/rooms/${roomId}?ownerEmail=${encodeURIComponent(
        roomOwnerEmail
      )}`;

      const res = await fetch(url, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      toast.success("Room deleted successfully!");
      onDeleted();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1c1e] border border-[#333537] rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-3xl">
            🗑️
          </div>
        </div>

        {/* TEXT */}
        <h2 className="text-2xl font-bold text-white text-center mb-3">
          Delete Room?
        </h2>
        <p className="text-gray-400 text-center mb-8">
          This action is permanent. The room and all its bookings will be
          deleted and cannot be recovered.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            disabled={deleting}
            className="flex-1 bg-[#2a2d30] hover:bg-[#333537] text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}