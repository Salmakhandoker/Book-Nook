"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RoomsPage() {

  const [rooms, setRooms] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    fetch(`http://localhost:5000/api/rooms?search=${search}`)
      .then((res) => res.json())
      .then((data) => {

        setRooms(Array.isArray(data) ? data : []);

        setLoading(false);
      });

  }, [search]);

  return (
    <main className="min-h-screen bg-[#0f1412] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE HEADER */}
      <section className="pt-32 pb-10 px-6 md:px-16 max-w-7xl mx-auto">

        <div className="mb-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c211e] border border-[#4f4633]/20 mb-6">
            <span className="text-yellow-400">📚</span>

            <span className="text-sm text-gray-300">
              Premium Study Spaces
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect{" "}
            <span className="text-yellow-400 italic">
              Study Room
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl">
            Browse peaceful, fully-equipped study environments
            designed for focus, productivity, and collaboration.
          </p>

        </div>

        {/* SEARCH */}
        <div className="mb-12">

          <input
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[420px] bg-[#1c211e] border border-[#4f4633]/20 rounded-2xl px-6 py-4 outline-none focus:border-yellow-400 transition"
          />

        </div>

        {/* LOADING */}
        {
          loading ? (
            <div className="flex justify-center items-center py-24">

              <span className="loading loading-spinner loading-lg text-yellow-400"></span>

            </div>
          ) : rooms.length === 0 ? (

            /* EMPTY */
            <div className="text-center py-24 bg-[#1c211e] rounded-3xl border border-[#4f4633]/20">

              <h2 className="text-3xl font-bold text-gray-300 mb-4">
                No Rooms Found
              </h2>

              <p className="text-gray-500">
                Try searching with another keyword.
              </p>

            </div>

          ) : (

            /* ROOM GRID */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {
                rooms.map((room) => (

                  <div
                    key={room._id}
                    className="bg-[#1c211e] rounded-3xl overflow-hidden border border-[#4f4633]/10 hover:border-yellow-400/40 hover:-translate-y-2 transition duration-300 shadow-xl"
                  >

                    {/* IMAGE */}
                    <div className="overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.roomName}
                        className="h-64 w-full object-cover hover:scale-105 duration-500"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                      <div className="flex justify-between items-start mb-4">

                        <div>
                          <h2 className="text-2xl font-bold mb-2">
                            {room.roomName}
                          </h2>

                          <div className="flex gap-4 text-sm text-gray-400">
                            <p>📍 Floor {room.floor}</p>

                            <p>👥 {room.capacity} Seats</p>
                          </div>
                        </div>

                        <span className="text-yellow-400 font-bold text-lg">
                          ${room.hourlyRate}/hr
                        </span>

                      </div>

                      {/* DESCRIPTION */}
                      <p className="text-gray-400 mb-6 line-clamp-3">
                        {room.description}
                      </p>

                      {/* AMENITIES */}
                      <div className="flex flex-wrap gap-2 mb-6">

                        {
                          room.amenities?.map((item, index) => (

                            <span
                              key={index}
                              className="bg-[#2a2d2b] text-gray-300 px-3 py-1 rounded-full text-sm border border-[#4f4633]/10"
                            >
                              {item}
                            </span>

                          ))
                        }

                      </div>

                      {/* BUTTON */}
                      <Link href={`/rooms/${room._id}`}>

                        <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-bold transition">
                          View Details
                        </button>

                      </Link>

                    </div>

                  </div>

                ))
              }

            </div>

          )
        }

      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}