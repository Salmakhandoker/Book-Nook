"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import EditRoomModal from "@/components/modals/EditRoomModal";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";

const amenitiesIcons = {
  "Wi-Fi": "📶",
  Projector: "📽️",
  Whiteboard: "📝",
  "Quiet Zone": "🤫",
  "Power Outlets": "🔌",
  "Air Conditioning": "❄️",
};

export default function RoomDetailsPage() {
  const { id } = useParams();

  const router = useRouter();

  const [room, setRoom] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [currentUser, setCurrentUser] =
    useState(null);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  // BOOKING STATES
  const [date, setDate] =
    useState("");

  const [startTime, setStartTime] =
    useState("09:00");

  const [endTime, setEndTime] =
    useState("11:00");

  const [note, setNote] =
    useState("");

  const [bookingLoading, setBookingLoading] =
    useState(false);

  /*
  ==========================================
  GET USER
  ==========================================
  */

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setCurrentUser(
        JSON.parse(storedUser)
      );
    }
  }, []);

  /*
  ==========================================
  FETCH ROOM
  ==========================================
  */

  const fetchRoom = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/rooms/${id}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to load room"
        );
      }

      setRoom(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRoom();
    }
  }, [id]);

  /*
  ==========================================
  OWNER CHECK
  ==========================================
  */

  const isOwner = useMemo(() => {
    if (!currentUser)
      return false;

    if (!room)
      return false;

    if (
      !currentUser.email
    )
      return false;

    if (
      !room.ownerEmail
    )
      return false;

    return (
      currentUser.email
        .trim()
        .toLowerCase() ===
      room.ownerEmail
        .trim()
        .toLowerCase()
    );
  }, [currentUser, room]);

  /*
  ==========================================
  TOTAL COST
  ==========================================
  */

  const totalCost = useMemo(() => {
    if (!room) return 0;

    const startHour = Number(
      startTime.split(":")[0]
    );

    const endHour = Number(
      endTime.split(":")[0]
    );

    const total =
      (endHour - startHour) *
      room.hourlyRate;

    return total > 0 ? total : 0;
  }, [room, startTime, endTime]);

  /*
  ==========================================
  HANDLE BOOKING
  ==========================================
  */

  const handleBooking = async () => {
    if (!currentUser) {
      toast.error(
        "Please login first"
      );

      router.push("/login");

      return;
    }

    if (!date) {
      return toast.error(
        "Please select booking date"
      );
    }

    const startHour = Number(
      startTime.split(":")[0]
    );

    const endHour = Number(
      endTime.split(":")[0]
    );

    if (endHour <= startHour) {
      return toast.error(
        "Invalid time slot"
      );
    }

    try {
      setBookingLoading(true);

      const bookingData = {
        roomId: room._id,

        date,
        startTime,
        endTime,

        note,

        userEmail:
          currentUser.email,
      };

      const res = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            bookingData
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Booking failed"
        );
      }

      toast.success(
        "Room booked successfully!"
      );

      // RESET
      setDate("");

      setStartTime("09:00");

      setEndTime("11:00");

      setNote("");

      // UPDATE COUNT
      setRoom((prev) => ({
        ...prev,

        bookingCount:
          (prev.bookingCount || 0) +
          1,
      }));

      router.push(
        "/my-bookings"
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBookingLoading(false);
    }
  };

  /*
  ==========================================
  LOADING
  ==========================================
  */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121416] text-yellow-400 text-2xl">
        Loading...
      </div>
    );
  }

  /*
  ==========================================
  ROOM NOT FOUND
  ==========================================
  */

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121416] text-white text-2xl">
        Room not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121416] text-white">

      <Navbar />

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden mt-20">

        <img
          src={room.image}
          alt={room.roomName}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#121416] via-[#121416aa] to-transparent flex items-end">

          <div className="max-w-7xl mx-auto w-full px-6 pb-16">

            <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full mb-6">

              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>

              Available Today

            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-5">
              {room.roomName}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-300">

              <p>
                📍 {room.floor}
              </p>

              <p>
                👥 {room.capacity} People
              </p>

              <p>
                📚 {room.bookingCount || 0} Bookings
              </p>

            </div>

            {/* OWNER BUTTONS */}
            {isOwner && (
              <div className="flex gap-4 mt-8">

                <button
                  onClick={() =>
                    setShowEditModal(
                      true
                    )
                  }
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl transition"
                >
                  Edit Room
                </button>

                <button
                  onClick={() =>
                    setShowDeleteModal(
                      true
                    )
                  }
                  className="bg-red-500 hover:bg-red-400 text-white font-bold px-6 py-3 rounded-xl transition"
                >
                  Delete Room
                </button>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-14">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-16">

          {/* DESCRIPTION */}
          <section>

            <h2 className="text-3xl font-bold text-yellow-400 mb-6">
              Room Description
            </h2>

            <p className="text-lg text-gray-300 leading-8">
              {room.description}
            </p>

          </section>

          {/* AMENITIES */}
          <section>

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold text-yellow-400">
                Amenities
              </h2>

              <span className="text-sm text-gray-400 uppercase tracking-widest">
                {room.amenities?.length ||
                  0}{" "}
                Features
              </span>

            </div>

            <div className="grid sm:grid-cols-2 gap-5">

              {room.amenities?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-[#1e2022] border border-[#333537] rounded-2xl p-5"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-xl bg-[#2a2d30] flex items-center justify-center text-2xl">

                        {amenitiesIcons[
                          item
                        ] || "📚"}

                      </div>

                      <div>

                        <h4 className="font-semibold text-lg">
                          {item}
                        </h4>

                        <p className="text-sm text-gray-400">
                          Premium
                          study
                          experience
                        </p>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </section>

        </div>

        {/* BOOKING CARD */}
        <div className="lg:col-span-4">

          <div className="sticky top-28 bg-[#1a1c1e] border border-[#333537] rounded-3xl overflow-hidden">

            <div className="p-8">

              {/* PRICE */}
              <div className="mb-8">

                <h2 className="text-5xl font-bold text-yellow-400">

                  $
                  {room.hourlyRate}

                  <span className="text-lg text-gray-400">
                    {" "}
                    /hour
                  </span>

                </h2>

              </div>

              {/* FORM */}
              <div className="space-y-5">

                {/* DATE */}
                <input
                  type="date"
                  min={
                    new Date()
                      .toISOString()
                      .split(
                        "T"
                      )[0]
                  }
                  value={date}
                  onChange={(e) =>
                    setDate(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4"
                />

                {/* TIME */}
                <div className="grid grid-cols-2 gap-4">

                  {/* START */}
                  <select
                    value={startTime}
                    onChange={(e) =>
                      setStartTime(
                        e.target
                          .value
                      )
                    }
                    className="bg-[#2a2d30] border border-[#444] rounded-xl p-4"
                  >

                    {Array.from(
                      {
                        length: 13,
                      },
                      (_, i) =>
                        i + 8
                    ).map(
                      (hour) => (
                        <option
                          key={
                            hour
                          }
                          value={`${hour}:00`}
                        >
                          {
                            hour
                          }
                          :00
                        </option>
                      )
                    )}

                  </select>

                  {/* END */}
                  <select
                    value={endTime}
                    onChange={(e) =>
                      setEndTime(
                        e.target
                          .value
                      )
                    }
                    className="bg-[#2a2d30] border border-[#444] rounded-xl p-4"
                  >

                    {Array.from(
                      {
                        length: 13,
                      },
                      (_, i) =>
                        i + 9
                    ).map(
                      (hour) => (
                        <option
                          key={
                            hour
                          }
                          value={`${hour}:00`}
                          disabled={
                            hour <=
                            Number(
                              startTime.split(
                                ":"
                              )[0]
                            )
                          }
                        >
                          {
                            hour
                          }
                          :00
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* NOTE */}
                <textarea
                  placeholder="Special note..."
                  value={note}
                  onChange={(e) =>
                    setNote(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#2a2d30] border border-[#444] rounded-xl p-4 h-28 resize-none"
                />

              </div>

              {/* TOTAL */}
              <div className="mt-8 border-t border-[#333] pt-6">

                <div className="flex justify-between items-center">

                  <p className="text-gray-400">
                    Total Cost
                  </p>

                  <h3 className="text-3xl font-bold text-yellow-400">

                    $
                    {totalCost}

                  </h3>

                </div>

              </div>

              {/* BOOK BUTTON */}
              <button
                onClick={
                  handleBooking
                }
                disabled={
                  bookingLoading
                }
                className="w-full mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-2xl transition disabled:opacity-50"
              >

                {currentUser
                  ? bookingLoading
                    ? "Processing..."
                    : "Book Now"
                  : "Login to Book"}

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditRoomModal
          room={room}
          onClose={() =>
            setShowEditModal(
              false
            )
          }
          onUpdated={fetchRoom}
        />
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <DeleteConfirmModal
          roomId={room._id}
          roomOwnerEmail={
            room.ownerEmail
          }
          onClose={() =>
            setShowDeleteModal(
              false
            )
          }
          onDeleted={() =>
            router.push("/rooms")
          }
        />
      )}

      <Footer />

    </div>
  );
}