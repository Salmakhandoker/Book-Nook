"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

export default function AddRoomPage() {

  const [loading, setLoading] = useState(false);

  const handleAddRoom = async (e) => {

    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const roomData = {
      roomName: form.roomName.value,

      description: form.description.value,

      image: form.image.value,

      floor: form.floor.value,

      capacity: parseInt(form.capacity.value),

      hourlyRate: parseInt(form.hourlyRate.value),

      amenities: [
        ...form.querySelectorAll(
          "input[name='amenities']:checked"
        ),
      ].map((item) => item.value),

      bookingCount: 0,
    };

    try {

      const res = await fetch(
        "http://localhost:5000/api/rooms",
        {
          method: "POST",

          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify(roomData),
        }
      );

      const data = await res.json();

      if (data.insertedId) {

        toast.success("Room added successfully");

        form.reset();
      }

    } catch (error) {

      toast.error("Failed to add room");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0f1412] text-white">

      <Navbar />

      <section className="pt-32 pb-20 px-6">

        <div className="max-w-3xl mx-auto bg-[#1c211e] p-10 rounded-3xl border border-[#4f4633]/20">

          <h1 className="text-4xl font-bold mb-10 text-yellow-400">
            Add Study Room
          </h1>

          <form
            onSubmit={handleAddRoom}
            className="space-y-6"
          >

            <input
              name="roomName"
              placeholder="Room Name"
              className="w-full p-4 bg-black/40 border border-[#4f4633]/20 rounded-xl"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-4 bg-black/40 border border-[#4f4633]/20 rounded-xl h-36"
              required
            />

            <input
              name="image"
              placeholder="Image URL"
              className="w-full p-4 bg-black/40 border border-[#4f4633]/20 rounded-xl"
              required
            />

            <input
              name="floor"
              placeholder="Floor"
              className="w-full p-4 bg-black/40 border border-[#4f4633]/20 rounded-xl"
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              className="w-full p-4 bg-black/40 border border-[#4f4633]/20 rounded-xl"
            />

            <input
              type="number"
              name="hourlyRate"
              placeholder="Hourly Rate"
              className="w-full p-4 bg-black/40 border border-[#4f4633]/20 rounded-xl"
            />

            {/* AMENITIES */}
            <div>

              <h3 className="text-xl font-semibold mb-4">
                Amenities
              </h3>

              <div className="grid grid-cols-2 gap-4">

                {[
                  "Wi-Fi",
                  "Projector",
                  "Whiteboard",
                  "Quiet Zone",
                  "Power Outlets",
                  "Air Conditioning",
                ].map((item) => (

                  <label
                    key={item}
                    className="flex items-center gap-3 bg-[#0f1412] p-3 rounded-xl border border-[#4f4633]/10"
                  >

                    <input
                      type="checkbox"
                      name="amenities"
                      value={item}
                    />

                    {item}

                  </label>

                ))}

              </div>

            </div>

            <button
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-bold transition"
            >

              {
                loading
                  ? "Adding..."
                  : "Add Room"
              }

            </button>

          </form>

        </div>

      </section>

      <Footer />

    </main>
  );
}