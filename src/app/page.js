"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {

  const featuredRooms = [
    {
      id: 1,
      name: "Atrium Reading Nook",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      price: 6,
      description:
        "Quiet plant-filled study environment with natural lighting.",
    },

    {
      id: 2,
      name: "Innovation Lab B",
      image:
        "https://images.unsplash.com/photo-1497366412874-3415097a27e7",
      price: 15,
      description:
        "Tech-friendly room with projector and collaboration tools.",
    },

    {
      id: 3,
      name: "Silent Carrel 12",
      image:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
      price: 3,
      description:
        "Single-person silent study space for deep focus sessions.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f1412] text-[#dfe4e0]">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-36 px-6 md:px-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c211e] border border-[#4f4633]/20 mb-6">

            <span className="text-yellow-400">✔</span>

            <span className="text-sm text-gray-300">
              Welcome back to StudyNook
            </span>

          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">

            Find Your Perfect{" "}

            <span className="text-yellow-400 italic">
              Study Room
            </span>

          </h1>

          <p className="text-lg text-gray-400 mb-8 max-w-xl">
            Browse and book quiet, private study rooms
            in your library by the hour.
          </p>

          <div className="flex gap-4 flex-wrap">

            <Link href="/rooms">

              <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold transition">

                Explore Rooms

              </button>

            </Link>

            <Link href="/add-room">

              <button className="border border-yellow-500 text-yellow-400 px-8 py-4 rounded-lg hover:bg-yellow-500/10 transition">

                Add Room

              </button>

            </Link>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-[#4f4633]/20">

            <div>

              <h3 className="text-3xl font-bold text-yellow-400">
                120+
              </h3>

              <p className="text-gray-400 text-sm">
                Active Rooms
              </p>

            </div>

            <div>

              <h3 className="text-3xl font-bold text-yellow-400">
                8K
              </h3>

              <p className="text-gray-400 text-sm">
                Hours Booked
              </p>

            </div>

            <div>

              <h3 className="text-3xl font-bold text-yellow-400">
                4.9★
              </h3>

              <p className="text-gray-400 text-sm">
                Avg Rating
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div>

          <div className="rounded-3xl overflow-hidden border border-[#4f4633]/20">

            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
              alt="study room"
              className="w-full h-[650px] object-cover"
            />

          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold mb-4">
            Why Choose StudyNook?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience distraction-free premium study
            environments designed for productivity and focus.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-[#1c211e] p-8 rounded-2xl border border-[#4f4633]/20">

            <div className="text-5xl mb-6">📶</div>

            <h3 className="text-2xl font-bold mb-4">
              High-Speed WiFi
            </h3>

            <p className="text-gray-400">
              Ultra-fast internet connectivity for research,
              meetings, and uninterrupted study sessions.
            </p>

          </div>

          <div className="bg-[#1c211e] p-8 rounded-2xl border border-[#4f4633]/20">

            <div className="text-5xl mb-6">☕</div>

            <h3 className="text-2xl font-bold mb-4">
              Premium Comfort
            </h3>

            <p className="text-gray-400">
              Ergonomic seating, peaceful environments,
              and complimentary coffee stations.
            </p>

          </div>

          <div className="bg-[#1c211e] p-8 rounded-2xl border border-[#4f4633]/20">

            <div className="text-5xl mb-6">🔒</div>

            <h3 className="text-2xl font-bold mb-4">
              Secure Booking
            </h3>

            <p className="text-gray-400">
              JWT authentication and secure room booking
              with conflict prevention system.
            </p>

          </div>

        </div>

      </section>

      {/* FEATURED ROOMS */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">

        <div className="flex justify-between items-end mb-14">

          <div>

            <h2 className="text-4xl font-bold mb-3">
              Featured Rooms
            </h2>

            <p className="text-gray-400">
              Hand-picked premium study environments.
            </p>

          </div>

          <Link href="/rooms">

            <button className="text-yellow-400 hover:underline">
              View all rooms
            </button>

          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {
            featuredRooms.map((room) => (

              <div
                key={room.id}
                className="bg-[#1c211e] rounded-2xl overflow-hidden border border-[#4f4633]/10 hover:-translate-y-2 transition duration-300"
              >

                <img
                  src={room.image}
                  className="h-64 w-full object-cover"
                  alt={room.name}
                />

                <div className="p-6">

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-2xl font-semibold">
                      {room.name}
                    </h3>

                    <span className="text-yellow-400 font-bold">
                      ${room.price}/hr
                    </span>

                  </div>

                  <p className="text-gray-400 mb-6">
                    {room.description}
                  </p>

                  <Link href={`/rooms/${room.id}`}>

                    <button className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold transition">

                      View Details

                    </button>

                  </Link>

                </div>

              </div>

            ))
          }

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16">

        <div className="max-w-5xl mx-auto bg-[#1c211e] border border-[#4f4633]/20 rounded-3xl p-12 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Ready To Focus Better?
          </h2>

          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Book your ideal study room today and experience
            productivity like never before.
          </p>

          <Link href="/rooms">

            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-xl font-bold transition">

              Book A Room Now

            </button>

          </Link>

        </div>

      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}