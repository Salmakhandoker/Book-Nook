"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function EditRoomModal({
  room,
  onClose,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ GET SESSION USER (SAFE WAY)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`)
      .then((res) => res.json())
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null));
  }, []);

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ❌ NOT LOGGED IN
      if (!user) {
        return toast.error("Please login first");
      }

      // ❌ NOT OWNER
      if (user.email !== room.ownerEmail) {
        return toast.error("You are not allowed");
      }

      const updatedRoom = {
        ownerEmail: user.email,

        roomName: formData.roomName,
        image: formData.image,
        floor: formData.floor,
        description: formData.description,

        hourlyRate: Number(formData.hourlyRate),
        capacity: Number(formData.capacity),

        amenities: formData.amenities
          ? formData.amenities
              .split(",")
              .map((i) => i.trim())
              .filter(Boolean)
          : [],
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${room._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRoom),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        return toast.error(data.message || "Update failed");
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
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#1c211e] rounded-2xl p-8">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Edit Room
          </h2>

          <button onClick={onClose} className="text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="roomName"
            value={formData.roomName}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              name="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

            <input
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

          </div>

          <input
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <input
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded border text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded bg-yellow-400 font-bold"
            >
              {loading ? "Updating..." : "Update"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}