"use client";

import Link from "next/link";

export default function RoomCard({ room }) {
  return (
    <div className="bg-[#1c211e] rounded-2xl overflow-hidden border border-[#4f4633]/10 hover:-translate-y-2 transition duration-300">

      {/* IMAGE (no Link wrapping whole card — safer for edit/delete buttons later) */}
      <Link href={`/rooms/${room._id}`}>
        <div className="relative h-56 overflow-hidden">
          <img
            src={room.image}
            alt={room.roomName}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-6">

        {/* TITLE + PRICE */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-2xl font-semibold text-white">
            {room.roomName}
          </h3>

          <span className="text-yellow-400 font-bold">
            ${room.hourlyRate}/hr
          </span>
        </div>

        {/* FLOOR + CAPACITY */}
        <div className="flex gap-4 text-sm text-gray-400 mb-3">
          {room.floor && <span>Floor: {room.floor}</span>}
          {room.capacity && <span>Capacity: {room.capacity}</span>}
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-400 mb-5 line-clamp-3">
          {room.description}
        </p>

        {/* AMENITIES */}
        {room.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {room.amenities.map((item, index) => (
              <span
                key={index}
                className="text-xs bg-[#2a2d30] text-gray-300 px-3 py-1 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <Link href={`/rooms/${room._id}`}>
          <button className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition">
            View Details
          </button>
        </Link>

      </div>
    </div>
  );
}