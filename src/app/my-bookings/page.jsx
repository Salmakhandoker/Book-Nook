"use client";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyBookingsPage() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState(null);

  /*
  ==========================================
  GET USER + FETCH BOOKINGS
  ==========================================
  */

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      const parsedUser =
        JSON.parse(storedUser);

      setUser(parsedUser);

      fetchBookings(
        parsedUser.email
      );
    } else {
      setLoading(false);
    }
  }, []);

  /*
  ==========================================
  FETCH BOOKINGS
  ==========================================
  */

  const fetchBookings =
    async (email) => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/bookings/my/${email}`
        );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch bookings"
          );
        }

        setBookings(data);
      } catch (error) {
        toast.error(
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

  /*
  ==========================================
  CANCEL BOOKING
  ==========================================
  */

  const handleCancel =
    async (id) => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookings/${id}/cancel`,
          {
            method: "PATCH",
          }
        );

        const data =
          await res.json();

        if (!res.ok) {
          throw new Error(
            data.message ||
              "Cancel failed"
          );
        }

        toast.success(
          "Booking cancelled"
        );

        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id
              ? {
                  ...booking,
                  status:
                    "cancelled",
                }
              : booking
          )
        );
      } catch (error) {
        toast.error(
          error.message
        );
      }
    };

  /*
  ==========================================
  LOADING
  ==========================================
  */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1412] text-yellow-400 text-2xl">
        Loading...
      </div>
    );
  }

  /*
  ==========================================
  PAGE
  ==========================================
  */

  return (
    <div className="min-h-screen bg-[#0f1412] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-32">
        {/* HEADING */}
        <div className="mb-14">
          <h1 className="text-5xl font-bold text-yellow-400 mb-4">
            My Bookings
          </h1>

          <p className="text-gray-400 text-lg">
            View and manage your booked study rooms.
          </p>
        </div>

        {/* EMPTY */}
        {bookings.length === 0 ? (
          <div className="text-center py-32">
            <h2 className="text-4xl font-bold text-gray-500 mb-4">
              No Bookings Yet
            </h2>

            <p className="text-gray-400">
              Start booking premium study rooms now.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map(
              (booking) => (
                <div
                  key={
                    booking._id
                  }
                  className="bg-[#1c211e] border border-[#4f4633]/20 rounded-3xl overflow-hidden"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      booking
                        .room
                        ?.image
                    }
                    alt={
                      booking
                        .room
                        ?.roomName
                    }
                    className="h-64 w-full object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">
                        {
                          booking
                            .room
                            ?.roomName
                        }
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status ===
                          "confirmed"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {
                          booking.status
                        }
                      </span>
                    </div>

                    <div className="space-y-2 text-gray-400 mb-6">
                      <p>
                        📅{" "}
                        {
                          booking.date
                        }
                      </p>

                      <p>
                        ⏰{" "}
                        {
                          booking.startTime
                        }{" "}
                        -{" "}
                        {
                          booking.endTime
                        }
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-yellow-400">
                        $
                        {
                          booking.totalCost
                        }
                      </span>

                      {booking.status ===
                        "confirmed" && (
                        <button
                          onClick={() =>
                            handleCancel(
                              booking._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-xl font-semibold transition"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}