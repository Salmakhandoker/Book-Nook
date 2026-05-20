"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function BookingModal({ room, onClose }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const total =
    room &&
    (parseInt(endTime) - parseInt(startTime)) * room.hourlyRate;

  const handleBooking = async () => {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include", // 🔥 IMPORTANT
      body: JSON.stringify({
        roomId: room._id,
        roomName: room.roomName,
        image: room.image,
        date,
        startTime,
        endTime,
      }),
    });

    const data = await res.json();

    if (data.insertedId || data.success) {
      toast.success("Room booked successfully");
      onClose();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-[#1c211e] p-6 rounded-xl w-[500px] space-y-4">

        <h2 className="text-2xl font-bold text-yellow-400">
          Book Room
        </h2>

        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 bg-black rounded"
        />

        <select
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-3 bg-black rounded"
        >
          <option>08:00</option>
          <option>09:00</option>
          <option>10:00</option>
        </select>

        <select
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-3 bg-black rounded"
        >
          <option>09:00</option>
          <option>10:00</option>
          <option>11:00</option>
        </select>

        <p className="text-yellow-400">
          Total: ${total || 0}
        </p>

        <button
          onClick={handleBooking}
          className="bg-yellow-500 w-full py-3 rounded font-bold"
        >
          Confirm Booking
        </button>

        <button onClick={onClose} className="text-red-400 w-full">
          Cancel
        </button>

      </div>
    </div>
  );
}