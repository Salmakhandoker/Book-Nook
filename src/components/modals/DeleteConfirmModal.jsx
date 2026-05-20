"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteConfirmModal({
  roomId,
  onClose,
  onDeleted,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // GET USER FROM LOCAL STORAGE
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userEmail: user?.email,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Room deleted successfully");

        onDeleted?.();

        onClose();
      } else {
        toast.error(
          data.message || "Delete failed"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-[#1c211e] border border-[#4f4633]/20 rounded-2xl p-8 text-center">

        {/* ICON */}
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">

          <span className="text-4xl">
            🗑️
          </span>

        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Delete Room?
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          This action cannot be undone.
          The room and all related bookings
          will be permanently removed.
        </p>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-4">

          {/* CANCEL */}
          <button
            onClick={onClose}
            disabled={loading}
            className="py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 transition disabled:opacity-50"
          >
            Cancel
          </button>

          {/* DELETE */}
          <button
            onClick={handleDelete}
            disabled={loading}
            className="py-3 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold transition disabled:opacity-50"
          >
            {
              loading
                ? "Deleting..."
                : "Delete"
            }
          </button>

        </div>

      </div>

    </div>
  );
}