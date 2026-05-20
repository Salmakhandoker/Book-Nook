"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function EditRoomModal({ room, onClose, onUpdated }) {
  const [form, setForm] = useState(room);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch(
      `http://localhost:5000/api/rooms/${room._id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        credentials: "include", // 🔥 FIX
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Room updated successfully");
      onUpdated();
      onClose();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-[#1c211e] p-6 rounded-xl w-[500px] space-y-4">

        <h2 className="text-2xl text-yellow-400 font-bold">
          Edit Room
        </h2>

        <input
          name="roomName"
          value={form.roomName}
          onChange={handleChange}
          className="w-full p-3 bg-black rounded"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full p-3 bg-black rounded"
        />

        <button
          onClick={handleUpdate}
          className="bg-yellow-500 w-full py-3 rounded font-bold"
        >
          Update
        </button>

        <button onClick={onClose} className="text-red-400 w-full">
          Cancel
        </button>

      </div>
    </div>
  );
}