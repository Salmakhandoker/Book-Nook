"use client";

import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";

const RoomsContainer = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [amenities, setAmenities] = useState([]);

  // FETCH ROOMS
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/rooms?`;

        if (search) {
          url += `search=${search}&`;
        }

        if (amenities.length > 0) {
          url += `amenities=${amenities.join(",")}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        setRooms(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRooms();
  }, [search, amenities]);

  // HANDLE CHECKBOX
  const handleAmenityChange = (value) => {
    setAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((a) => a !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search rooms..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 mb-6 rounded-xl bg-slate-900 border border-slate-700"
      />

      {/* FILTER CHECKBOX */}
      <div className="flex gap-6 mb-8 text-gray-300">
        {["wifi", "projector", "ac", "whiteboard"].map((item) => (
          <label key={item} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={amenities.includes(item)}
              onChange={() => handleAmenityChange(item)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* ROOMS */}
      {rooms.length === 0 ? (
        <p className="text-center text-gray-400">No rooms found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsContainer;