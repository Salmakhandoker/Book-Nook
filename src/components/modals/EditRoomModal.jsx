"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function EditRoomModal({
  room,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    roomName: room?.roomName || "",
    image: room?.image || "",
    description: room?.description || "",
    hourlyRate: room?.hourlyRate || "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "hourlyRate"
          ? Number(value)
          : value,
    }));
  };

  // UPDATE ROOM
  const handleUpdate = async () => {
    if (!form.roomName || !form.image) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/rooms/${room._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Room updated successfully");

        if (onUpdated) {
          onUpdated();
        }

        if (onClose) {
          onClose();
        }
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-[#1c211e] w-full max-w-lg rounded-2xl p-6 space-y-4 border border-yellow-500/20">

        <h2 className="text-2xl font-bold text-yellow-400">
          Edit Room
        </h2>

        {/* ROOM NAME */}
        <input
          type="text"
          name="roomName"
          value={form.roomName}
          onChange={handleChange}
          placeholder="Room Name"
          className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none"
        />

        {/* IMAGE */}
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Room Description"
          rows={4}
          className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none"
        />

        {/* HOURLY RATE */}
        <input
          type="number"
          name="hourlyRate"
          value={form.hourlyRate}
          onChange={handleChange}
          placeholder="Hourly Rate"
          className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 focus:outline-none"
        />

        {/* BUTTONS */}
        <div className="flex gap-3 pt-2">

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-bold transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Room"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}