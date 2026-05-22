"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function DeleteConfirmModal({
  roomId,
  roomOwnerEmail,
  onClose,
  onDeleted,
}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ GET SESSION USER (SAFE WAY)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`
        );

        const data = await res.json();
        setUser(data?.user || null);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // ❌ NOT LOGGED IN
      if (!user) {
        return toast.error("Please login first");
      }

      // ❌ NOT OWNER
      if (user.email !== roomOwnerEmail) {
        return toast.error("You are not allowed");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        return toast.error(data.message || "Delete failed");
      }

      toast.success("Room deleted successfully");

      onDeleted?.();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1c211e] rounded-2xl p-8 text-center">

        <div className="text-5xl mb-4">🗑️</div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Delete Room?
        </h2>

        <p className="text-gray-400 mb-6">
          This action cannot be undone.
        </p>

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={onClose}
            disabled={loading}
            className="py-3 rounded-xl border border-gray-600 text-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="py-3 rounded-xl bg-red-500 text-white font-bold"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}