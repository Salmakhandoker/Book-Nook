"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import RoomCard from "../rooms/RoomCard";

const LatestRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestRooms = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/latest`
        );

        const data = await res.json();

        setRooms(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRooms();
  }, []);

  return (
    <section className="py-24 bg-[#0f1412] text-[#dfe4e0]">
      <div className="max-w-7xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-yellow-400 uppercase tracking-[4px] mb-3 text-sm">
              Recently Added
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Available Study Rooms
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl">
              Discover quiet, modern, and fully equipped study
              rooms designed for productivity and focus.
            </p>
          </div>

          <Link
            href="/rooms"
            className="inline-flex items-center justify-center px-6 py-3 border border-yellow-400 text-yellow-400 rounded-xl hover:bg-yellow-400 hover:text-black transition duration-300"
          >
            Explore All Rooms
          </Link>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[420px] rounded-2xl bg-[#1c211e] animate-pulse"
              />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-20 border border-[#2b332e] rounded-2xl bg-[#151916]">
            <h3 className="text-2xl font-semibold mb-3">
              No Rooms Found
            </h3>

            <p className="text-gray-400">
              No study rooms are available right now.
            </p>
          </div>
        ) : (
          /* ROOM GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestRooms;