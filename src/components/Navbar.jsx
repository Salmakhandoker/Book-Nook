"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "@/providers/AuthProvider";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();

  // ✅ REAL AUTH USER
  const { user, loading } = useAuth();

  /* ==========================================
     LOGOUT
  ========================================== */
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logged out successfully");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f1412]/80 backdrop-blur-md border-b border-[#4f4633]/20">
      <nav className="flex justify-between items-center h-20 px-6 md:px-16 max-w-7xl mx-auto">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-yellow-400 text-2xl">📚</span>

          <h1 className="text-2xl font-bold text-yellow-400">
            StudyNook
          </h1>
        </Link>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">

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

          {user && (
            <>
              <Link
                href="/add-room"
                className="hover:text-yellow-400 transition"
              >
                Add Room
              </Link>

              <Link
                href="/my-listings"
                className="hover:text-yellow-400 transition"
              >
                My Listings
              </Link>

              <Link
                href="/my-bookings"
                className="hover:text-yellow-400 transition"
              >
                My Bookings
              </Link>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {loading ? (
            <div className="text-sm text-gray-400">
              Loading...
            </div>
          ) : user ? (
            <>
              <img
                src={
                  user.image ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
              />

              <div className="hidden md:block">
                <p className="text-sm font-semibold">
                  {user.name}
                </p>

                <p className="text-xs text-gray-400">
                  {user.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-xl font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2 rounded-xl font-semibold transition">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-5 py-2 rounded-xl font-semibold transition">
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