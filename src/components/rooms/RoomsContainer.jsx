
"use client";

import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";

const RoomsContainer = () => {

  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`)
      .then(res => res.json())
      .then(data => {
        setRooms(data);
      });

  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-5xl font-bold text-center mb-10">
        Available Rooms
      </h1>

      <div className="mb-10">

        <input
          type="text"
          placeholder="Search room..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700"
        />
      </div>

      {
        rooms.length === 0 ? (
          <div className="text-center text-2xl text-gray-400">
            No rooms found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {
              rooms.map(room => (
                <RoomCard
                  key={room._id}
                  room={room}
                />
              ))
            }

          </div>
        )
      }
    </div>
  );
};

export default RoomsContainer;