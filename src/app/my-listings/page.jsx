"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyListingsPage() {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/my-rooms/test@gmail.com`
    )
      .then(res => res.json())
      .then(data => {
        setRooms(data);
      });

  }, []);

  const handleDelete = async (id) => {

    const proceed = confirm("Delete this room?");

    if (!proceed) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.deletedCount > 0) {

      toast.success("Room deleted successfully");

      const remaining = rooms.filter(
        room => room._id !== id
      );

      setRooms(remaining);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-5xl font-bold text-center mb-12">
        My Listings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {
          rooms.map(room => (
            <div
              key={room._id}
              className="bg-slate-900 rounded-3xl overflow-hidden"
            >

              <img
                src={room.image}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold mb-4">
                  {room.roomName}
                </h2>

                <p className="text-gray-400 mb-4">
                  {room.description.slice(0, 100)}
                </p>

                <div className="flex justify-between mb-6">

                  <span>
                    ${room.hourlyRate}/hr
                  </span>

                  <span>
                    {room.bookingCount} bookings
                  </span>

                </div>

                <div className="flex gap-4">

                  <button className="flex-1 bg-blue-600 py-3 rounded-xl">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(room._id)}
                    className="flex-1 bg-red-600 py-3 rounded-xl"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  );
}