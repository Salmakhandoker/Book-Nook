"use client";

import { useEffect, useState } from "react";
import RoomCard from "../rooms/RoomCard";

export default function LatestRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/rooms`
        );

        const data = await res.json();

        // TAKE ONLY LATEST 6 ROOMS (CLIENT SIDE)
        if (Array.isArray(data)) {
          const latest = data
            .sort(
              (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
            )
            .slice(0, 6);

          setRooms(latest);
        } else {
          setRooms([]);
        }
      } catch (error) {
        console.log(error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-14">
          <p className="text-yellow-400 mb-3">
            Recently Added
          </p>

          <h2 className="text-5xl font-bold text-white">
            Available Study Rooms
          </h2>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-yellow-400">
            Loading rooms...
          </div>
        )}

        {/* EMPTY */}
        {!loading && rooms.length === 0 && (
          <div className="text-center text-gray-400">
            No rooms found
          </div>
        )}

        {/* ROOMS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}