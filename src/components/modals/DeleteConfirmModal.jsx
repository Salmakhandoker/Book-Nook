"use client";

import toast from "react-hot-toast";

export default function DeleteConfirmModal({ roomId, onClose, onDeleted }) {

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:5000/api/rooms/${roomId}`,
      {
        method: "DELETE",
        credentials: "include", // 🔥 FIX
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Room deleted successfully");
      onDeleted();
      onClose();
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-[#1c211e] p-6 rounded-xl w-[400px] text-center">

        <h2 className="text-xl font-bold mb-4">
          Are you sure?
        </h2>

        <p className="text-gray-400 mb-6">
          This action cannot be undone
        </p>

        <button
          onClick={handleDelete}
          className="bg-red-500 px-5 py-2 rounded mr-3"
        >
          Delete
        </button>

        <button
          onClick={onClose}
          className="bg-gray-700 px-5 py-2 rounded"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}