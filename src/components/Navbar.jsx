"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // ✅ LOAD USER
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();

    // 🔥 listen for changes (important fix)
    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // ✅ LOGOUT FIXED
  const handleLogout = async () => {
    try {
      // optional if using backend auth
      await fetch("/api/auth/sign-out", {
        method: "POST",
      }).catch(() => {});

      localStorage.removeItem("user");
      setUser(null);

      toast.success("Logged out successfully");

      // ✅ go HOME (your requirement)
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f1412]/80 backdrop-blur-md border-b border-[#4f4633]/20">

      <nav className="flex justify-between items-center h-20 px-6 md:px-16 max-w-7xl mx-auto">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-yellow-400 text-2xl">📚</span>
          <h1 className="text-2xl font-bold text-yellow-400">StudyNook</h1>
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/add-room">Add Room</Link>
          <Link href="/my-bookings">My Bookings</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {user ? (
            <>
              <img
                src={user.photo}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
              />

              <span className="hidden md:block text-sm text-gray-300">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-yellow-500 text-black px-5 py-2 rounded-lg">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="border border-yellow-500 text-yellow-400 px-5 py-2 rounded-lg">
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