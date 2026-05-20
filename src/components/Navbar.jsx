"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f1412]/80 backdrop-blur-md border-b border-[#4f4633]/20">

      <nav className="flex justify-between items-center h-20 px-6 md:px-16 max-w-7xl mx-auto">

        {/* LOGO */}
        <div className="flex items-center gap-2">

          <span className="text-yellow-400 text-2xl">
            📚
          </span>

          <h1 className="text-2xl font-bold text-yellow-400">
            StudyNook
          </h1>

        </div>

        {/* MENU */}
        <div className="hidden md:flex gap-8">

          <Link
            href="/"
            className="hover:text-yellow-400 transition"
          >
            Home
          </Link>

          <Link
            href="/rooms"
            className="hover:text-yellow-400 transition"
          >
            Rooms
          </Link>

          <Link
            href="/add-room"
            className="hover:text-yellow-400 transition"
          >
            Add Room
          </Link>

          <Link
            href="/my-bookings"
            className="hover:text-yellow-400 transition"
          >
            My Bookings
          </Link>

        </div>

        {/* BUTTON */}
        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold transition">
          Login
        </button>

      </nav>

    </header>
  );
}