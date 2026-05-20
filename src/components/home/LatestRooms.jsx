"use client";

import { useEffect, useState } from "react";

import RoomCard from "../rooms/RoomCard";

export default function LatestRooms() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/latest`)
      .then((res) => res.json())
      .then((data) => {

        console.log(data);

        // SAFE ARRAY CHECK
        if (Array.isArray(data)) {
          setRooms(data);
        }

        else if (Array.isArray(data.rooms)) {
          setRooms(data.rooms);
        }

        else {
          setRooms([]);
        }

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);
        setRooms([]);
        setLoading(false);
      });

  }, []);

  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-14">

          <div>

            <p className="text-yellow-400 mb-3">
              Recently Added
            </p>

            <h2 className="text-5xl font-bold text-white">
              Available Study Rooms
            </h2>

          </div>

        </div>

        {/* LOADING */}
        {
          loading && (
            <div className="text-center text-yellow-400">
              Loading rooms...
            </div>
          )
        }

        {/* EMPTY */}
        {
          !loading && rooms.length === 0 && (
            <div className="text-center text-gray-400">
              No rooms found
            </div>
          )
        }

        {/* ROOMS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            rooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
              />
            ))
          }

        </div>

      </div>

    </section>
  );
}