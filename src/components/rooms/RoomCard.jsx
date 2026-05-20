"use client";

import Link from "next/link";

export default function RoomCard({ room }) {
  return (
    <Link href={`/rooms/${room._id}`}>
      <div className="bg-[#1c211e] rounded-2xl overflow-hidden border border-[#4f4633]/10 hover:-translate-y-2 transition duration-300 cursor-pointer">

        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={room.image}
            alt={room.roomName}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* TITLE + PRICE */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-white">
              {room.roomName}
            </h3>

            <span className="text-yellow-400 font-bold">
              ${room.hourlyRate}/hr
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-400 mb-6 line-clamp-3">
            {room.description}
          </p>

          {/* BUTTON */}
          <button className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition">
            View Details
          </button>

        </div>
      </div>
    </Link>
  );
}