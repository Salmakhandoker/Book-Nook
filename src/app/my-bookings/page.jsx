"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bookings = [
  {
    id: 1,
    title: "The Oakwood Library",
    date: "Oct 24, 2024",
    time: "10:00 - 12:00",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    status: "Confirmed",
  },
  {
    id: 2,
    title: "Zen Research Pod",
    date: "Nov 02, 2024",
    time: "09:00 - 11:30",
    price: "$32",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    status: "Confirmed",
  },
];

export default function MyBookingsPage() {
  return (
    <div className="min-h-screen bg-[#0f1412] text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-32">
        
        {/* Heading */}
        <div className="mb-14">
          <h1 className="text-5xl font-bold text-yellow-400 mb-4">
            My Bookings
          </h1>

          <p className="text-gray-400 text-lg">
            View and manage all your booked study rooms.
          </p>
        </div>

        {/* Booking Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-[#1c211e] border border-[#4f4633]/20 rounded-3xl overflow-hidden hover:border-yellow-400/40 transition duration-300"
            >
              
              {/* Image */}
              <div className="relative">
                <img
                  src={booking.image}
                  alt={booking.title}
                  className="h-64 w-full object-cover"
                />

                <div className="absolute top-4 right-4 bg-yellow-500 text-black text-sm font-bold px-4 py-1 rounded-full">
                  {booking.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                
                <h2 className="text-2xl font-bold mb-4">
                  {booking.title}
                </h2>

                <div className="space-y-2 text-gray-400 mb-6">
                  <p>📅 {booking.date}</p>

                  <p>⏰ {booking.time}</p>
                </div>

                <div className="flex items-center justify-between">
                  
                  <span className="text-2xl font-bold text-yellow-400">
                    {booking.price}
                  </span>

                  <button className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-xl font-semibold transition">
                    Cancel
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="text-center py-32">
            <h2 className="text-4xl font-bold text-gray-500 mb-4">
              No Bookings Yet
            </h2>

            <p className="text-gray-400">
              Start booking premium study rooms now.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}