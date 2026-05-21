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

  /*
  |--------------------------------------------------------------------------
  | HANDLE INPUT CHANGE
  |--------------------------------------------------------------------------
  */
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

  /*
  |--------------------------------------------------------------------------
  | UPDATE ROOM
  |--------------------------------------------------------------------------
  */
  const handleUpdate = async () => {

    // VALIDATION
    if (
      !form.roomName ||
      !form.image ||
      !form.description ||
      !form.hourlyRate
    ) {
      return toast.error(
        "Please fill all required fields"
      );
    }

    try {

      setLoading(true);

      // GET LOGGED USER
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      // API REQUEST
      const res = await fetch(
        `http://localhost:5000/api/rooms/${room._id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...form,
            ownerEmail: user?.email,
          }),
        }
      );

      const data = await res.json();

      // SUCCESS
      if (data.success) {

        toast.success(
          "Room updated successfully"
        );

        onUpdated?.();

        onClose?.();

      } else {

        toast.error(
          data.message || "Update failed"
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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-[#1c211e] border border-yellow-500/20 rounded-2xl p-6 space-y-5">

        {/* TITLE */}
        <div>

          <h2 className="text-2xl font-bold text-yellow-400">
            Edit Room
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Update your room information
          </p>

        </div>

        {/* ROOM NAME */}
        <div className="space-y-2">

          <label className="text-sm text-gray-300">
            Room Name
          </label>

          <input
            type="text"
            name="roomName"
            value={form.roomName}
            onChange={handleChange}
            placeholder="Enter room name"
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
          />

        </div>

        {/* IMAGE URL */}
        <div className="space-y-2">

          <label className="text-sm text-gray-300">
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
          />

        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">

          <label className="text-sm text-gray-300">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter room description"
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
          />

        </div>

        {/* HOURLY RATE */}
        <div className="space-y-2">

          <label className="text-sm text-gray-300">
            Hourly Rate
          </label>

          <input
            type="number"
            name="hourlyRate"
            value={form.hourlyRate}
            onChange={handleChange}
            placeholder="Enter hourly rate"
            className="w-full p-3 rounded-xl bg-black text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
          />

        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 pt-2">

          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition disabled:opacity-50"
          >
            {
              loading
                ? "Updating..."
                : "Update Room"
            }
          </button>

        </div>

      </div>

    </div>
  );
}