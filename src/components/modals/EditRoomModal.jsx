"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const ALL_AMENITIES = [
  "Wi-Fi",
  "Projector",
  "Whiteboard",
  "Quiet Zone",
  "Power Outlets",
  "Air Conditioning",
];

export default function EditRoomModal({ room, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    roomName: room.roomName || "",
    description: room.description || "",
    image: room.image || "",
    floor: room.floor || "",
    capacity: room.capacity || "",
    hourlyRate: room.hourlyRate || "",
    // ✅ pre-fill amenities from room
    amenities: Array.isArray(room.amenities) ? room.amenities : [],
  });

  /* ==========================================
  HANDLE TEXT/NUMBER INPUTS
  ========================================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ==========================================
  HANDLE AMENITY CHECKBOXES
  ========================================== */
  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => {
      const already = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: already
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  /* ==========================================
  SUBMIT UPDATE
  ========================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { roomName, image, hourlyRate, capacity } = formData;

    if (!roomName || !image || !hourlyRate || !capacity) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${room._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            // ✅ include ownerEmail so backend can verify ownership
            ownerEmail: room.ownerEmail,
            hourlyRate: Number(formData.hourlyRate),
            capacity: Number(formData.capacity),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast.success("Room updated successfully!");
      onUpdated(); // re-fetch the room in parent
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    console.log(room)
  };

  return (
    // BACKDROP
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8"
      onClick={onClose}
    >
      {/* MODAL BOX */}
      <div
        className="bg-[#1a1c1e] border border-[#333537] rounded-3xl p-8 w-full max-w-xl mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">✏️ Edit Room</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ROOM NAME */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Room Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              placeholder="e.g. Focus Room A"
              className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the room..."
              rows={3}
              className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white resize-none focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* IMAGE URL */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Image URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* FLOOR + CAPACITY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Floor</label>
              <input
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="e.g. 3rd Floor"
                className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Capacity <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="capacity"
                min={1}
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g. 6"
                className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          {/* HOURLY RATE */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Hourly Rate ($) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="hourlyRate"
              min={1}
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="e.g. 10"
              className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* AMENITIES */}
          <div>
            <label className="text-sm text-gray-400 mb-3 block">Amenities</label>
            <div className="grid grid-cols-2 gap-3">
              {ALL_AMENITIES.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    formData.amenities.includes(amenity)
                      ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                      : "border-[#444] bg-[#2a2d30] text-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="hidden"
                  />
                  <span>{formData.amenities.includes(amenity) ? "✅" : "⬜"}</span>
                  <span className="text-sm font-medium">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-[#2a2d30] hover:bg-[#33363a] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}