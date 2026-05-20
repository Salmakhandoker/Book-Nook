"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  // LOAD USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");

    setUser(null);

    toast.success("Logged out successfully");

    router.push("/login");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f1412]/80 backdrop-blur-md border-b border-[#4f4633]/20">

      <nav className="flex justify-between items-center h-20 px-6 md:px-16 max-w-7xl mx-auto">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">

          <span className="text-yellow-400 text-2xl">
            📚
          </span>

          <h1 className="text-2xl font-bold text-yellow-400">
            StudyNook
          </h1>

        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8">

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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              {/* USER IMAGE */}
              <img
                src={user.photo}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
              />

              {/* USER NAME */}
              <span className="hidden md:block text-sm text-gray-300">
                {user.name}
              </span>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <Link href="/login">

                <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold transition">
                  Login
                </button>

              </Link>

              {/* REGISTER */}
              <Link href="/register">

                <button className="border border-yellow-500 text-yellow-400 px-5 py-2 rounded-lg hover:bg-yellow-500/10 transition">
                  Register
                </button>

              </Link>
            </>
          )}

        </div>

      </nav>

    </header>
  );
}