"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditRoomModal({
  room,
  onClose,
  onUpdated,
}) {
  const [loading, setLoading] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const [formData, setFormData] =
    useState({
      roomName:
        room?.roomName || "",

      image:
        room?.image || "",

      hourlyRate:
        room?.hourlyRate || "",

      description:
        room?.description || "",

      floor:
        room?.floor || "",

      capacity:
        room?.capacity || "",

      amenities:
        room?.amenities?.join(
          ", "
        ) || "",
    });

  // GET USER
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]:
        e.target.value,
    }));
  };

  // UPDATE ROOM
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      // LOGIN CHECK
      if (!user) {
        toast.error(
          "Please login first"
        );

        return;
      }

      // OWNER CHECK
      if (
        user.email
          .trim()
          .toLowerCase() !==
        room.ownerEmail
          .trim()
          .toLowerCase()
      ) {
        toast.error(
          "You are not allowed"
        );

        return;
      }

      const updatedRoom = {
        ownerEmail:
          user.email,

        roomName:
          formData.roomName,

        image:
          formData.image,

        description:
          formData.description,

        floor:
          formData.floor,

        hourlyRate:
          Number(
            formData.hourlyRate
          ),

        capacity:
          Number(
            formData.capacity
          ),

        amenities:
          formData.amenities
            .split(",")
            .map((item) =>
              item.trim()
            )
            .filter(Boolean),
      };

      const res = await fetch(
        `http://localhost:5000/api/rooms/${room._id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            updatedRoom
          ),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Update failed"
        );
      }

      toast.success(
        "Room updated successfully"
      );

      onUpdated?.();

      onClose?.();
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#1c211e] rounded-2xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            Edit Room
          </h2>

          <button
            onClick={onClose}
            className="text-white text-xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            type="text"
            name="roomName"
            placeholder="Room Name"
            value={
              formData.roomName
            }
            onChange={
              handleChange
            }
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={
              formData.image
            }
            onChange={
              handleChange
            }
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="number"
              name="hourlyRate"
              placeholder="Hourly Rate"
              value={
                formData.hourlyRate
              }
              onChange={
                handleChange
              }
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={
                formData.capacity
              }
              onChange={
                handleChange
              }
              className="w-full p-3 rounded bg-gray-800 text-white"
            />

          </div>

          <input
            type="text"
            name="floor"
            placeholder="Floor"
            value={
              formData.floor
            }
            onChange={
              handleChange
            }
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <input
            type="text"
            name="amenities"
            placeholder="Wi-Fi, AC"
            value={
              formData.amenities
            }
            onChange={
              handleChange
            }
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <textarea
            rows={5}
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          <div className="grid grid-cols-2 gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="py-3 rounded border border-gray-600 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="py-3 rounded bg-yellow-400 text-black font-bold"
            >
              {loading
                ? "Updating..."
                : "Update"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}