"use client";

import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";

export default function RoomsContainer() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [amenities, setAmenities] = useState([]);

  const fetchRooms = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?`;

    if (search) url += `search=${search}&`;
    if (amenities.length > 0) url += `amenities=${amenities.join(",")}`;

    const res = await fetch(url);
    const data = await res.json();

    setRooms(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchRooms();
  }, [search, amenities]);

  const handleCheckbox = (value) => {
    setAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((a) => a !== value)
        : [...prev, value]
    );
  };

  return (
    <div>

      {/* SEARCH */}
      <input
        placeholder="Search rooms..."
        className="w-full p-3 mb-4 bg-slate-900 text-white"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <div className="flex gap-4 mb-6">
        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckbox("wifi")}
          />
          WiFi
        </label>

        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckbox("ac")}
          />
          AC
        </label>

        <label>
          <input
            type="checkbox"
            onChange={() => handleCheckbox("projector")}
          />
          Projector
        </label>
      </div>

      {/* ROOMS */}
      <div className="grid md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}