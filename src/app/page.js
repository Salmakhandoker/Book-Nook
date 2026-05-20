"use client";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LatestRooms from "@/components/home/LatestRooms";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0f1412] text-[#dfe4e0] overflow-x-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4f4633]/20 bg-[#1c211e] mb-6">
              <span className="text-yellow-400">●</span>

              <span className="text-sm text-gray-300">
                Quiet • Comfortable • Productive
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Find Your Perfect{" "}
              <span className="text-yellow-400 italic">
                Study Room
              </span>
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed max-w-xl mb-10">
              Browse and book modern study rooms built for
              focus, research, collaboration, and deep work.
              Discover peaceful spaces designed to help you
              stay productive.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/rooms">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl transition duration-300">
                  Explore Rooms
                </button>
              </Link>

              <Link href="/add-room">
                <button className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 px-8 py-4 rounded-xl transition duration-300">
                  Add Room
                </button>
              </Link>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-[#4f4633]/20">
              <div>
                <h3 className="text-3xl font-bold text-yellow-400">
                  120+
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Active Rooms
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-yellow-400">
                  8K+
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Hours Booked
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-yellow-400">
                  4.9★
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  User Rating
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <div className="rounded-3xl overflow-hidden border border-[#4f4633]/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1400&auto=format&fit=crop"
                alt="Study Room"
                className="w-full h-[650px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LATEST ROOMS */}
      <LatestRooms />

      {/* WHY CHOOSE US */}
      <section className="py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* TITLE */}
          <div className="text-center mb-16">
            <p className="text-yellow-400 mb-3">
              Why Choose StudyNook
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Designed For Better Focus
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Premium study environments crafted for students,
              researchers, and professionals who need peaceful
              and productive workspaces.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="bg-[#1c211e] border border-[#4f4633]/20 rounded-2xl p-8 hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-6">📶</div>

              <h3 className="text-2xl font-bold mb-4">
                Fast WiFi
              </h3>

              <p className="text-gray-400 leading-relaxed">
                High-speed internet connection for online
                classes, meetings, research, and uninterrupted
                study sessions.
              </p>
            </div>

            {/* CARD 2 */}
            <div className="bg-[#1c211e] border border-[#4f4633]/20 rounded-2xl p-8 hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-6">☕</div>

              <h3 className="text-2xl font-bold mb-4">
                Comfortable Spaces
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Ergonomic seating, quiet environments, and
                premium interiors designed for long productive
                study hours.
              </p>
            </div>

            {/* CARD 3 */}
            <div className="bg-[#1c211e] border border-[#4f4633]/20 rounded-2xl p-8 hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-6">🛡️</div>

              <h3 className="text-2xl font-bold mb-4">
                Smart Booking
              </h3>

              <p className="text-gray-400 leading-relaxed">
                Advanced booking system with automatic conflict
                prevention for smooth room reservations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto bg-[#1c211e] border border-[#4f4633]/20 rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready To Study Smarter?
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            Reserve your perfect study environment today and
            improve your productivity with StudyNook.
          </p>

          <Link href="/rooms">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-4 rounded-xl transition duration-300">
              Book A Room
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}