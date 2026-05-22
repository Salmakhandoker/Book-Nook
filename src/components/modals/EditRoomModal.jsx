"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function EditRoomModal({
  room,
  onClose,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    roomName: room.roomName || "",
    image: room.image || "",
    hourlyRate: room.hourlyRate || "",
    description: room.description || "",
    floor: room.floor || "",
    capacity: room.capacity || "",
    amenities: room.amenities?.join(", ") || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedRoom = {
        ...formData,

        hourlyRate: Number(formData.hourlyRate),
        capacity: Number(formData.capacity),

        amenities: formData.amenities
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${room._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRoom),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(
          data.message || "Update failed"
        );
      }

      toast.success("Room updated successfully");

      onUpdated?.();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">

      <div className="w-full max-w-2xl bg-[#1c211e] border border-[#4f4633]/20 rounded-2xl p-8">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            Edit Room
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="roomName"
            value={formData.roomName}
            onChange={handleChange}
            className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white"
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              type="number"
              className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white"
            />

            <input
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              type="number"
              className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white"
            />

          </div>

          <input
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white"
          />

          <input
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white resize-none"
          />

          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 rounded-xl bg-yellow-400 text-black font-bold"
            >
              {loading ? "Updating..." : "Update Room"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}