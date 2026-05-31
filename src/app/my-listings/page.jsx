// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// import EditRoomModal from "@/components/modals/EditRoomModal";
// import { useAuth } from "@/providers/AuthProvider";

// export default function MyListingsPage() {
//   const router = useRouter();

//   const { user: currentUser, loading: authLoading } = useAuth();

//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [editingRoom, setEditingRoom] = useState(null);

//   /* ==========================================
//      FETCH MY ROOMS
//   ========================================== */
//   const fetchMyRooms = async () => {
//     if (!currentUser?.email) return;

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `${
//           process.env.NEXT_PUBLIC_API_URL
//         }/api/rooms/my/${encodeURIComponent(currentUser.email)}`,
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to load rooms");
//       }

//       setRooms(Array.isArray(data) ? data : []);

//     } catch (error) {
//       toast.error(error.message);

//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ==========================================
//      CHECK LOGIN
//   ========================================== */
//   useEffect(() => {
//     if (!authLoading && !currentUser) {
//       toast.error("Please login first");
//       router.push("/login");
//     }
//   }, [authLoading, currentUser, router]);

//   /* ==========================================
//      LOAD MY ROOMS
//   ========================================== */
//   useEffect(() => {
//     if (currentUser?.email) {
//       fetchMyRooms();
//     }
//   }, [currentUser]);

//   /* ==========================================
//      DELETE ROOM
//   ========================================== */
//   const handleDelete = async (room) => {
//     const proceed = confirm(
//       `Are you sure you want to delete "${room.roomName}"?`
//     );

//     if (!proceed) return;

//     try {
//       const token = localStorage.getItem("token");

//       const url = `${
//         process.env.NEXT_PUBLIC_API_URL
//       }/api/rooms/${room._id}?ownerEmail=${encodeURIComponent(
//         currentUser.email
//       )}`;

//       const res = await fetch(url, {
//         method: "DELETE",
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Delete failed");
//       }

//       toast.success("Room deleted successfully!");

//       // REMOVE ROOM FROM UI
//       setRooms((prev) =>
//         prev.filter((r) => r._id !== room._id)
//       );

//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   /* ==========================================
//      LOADING
//   ========================================== */
//   if (loading || authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#121416] text-yellow-400 text-2xl">
//         Loading your listings...
//       </div>
//     );
//   }

//   /* ==========================================
//      UI
//   ========================================== */
//   return (
//     <div className="min-h-screen bg-[#121416] text-white">
//       <div className="max-w-7xl mx-auto px-6 py-20">

//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-12">
//           <h1 className="text-5xl font-bold">
//             My Listings
//           </h1>

//           <button
//             onClick={() => router.push("/add-room")}
//             className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl transition"
//           >
//             + Add New Room
//           </button>
//         </div>

//         {/* EMPTY STATE */}
//         {rooms.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-32 text-center">

//             <div className="text-6xl mb-6">
//               🏠
//             </div>

//             <h2 className="text-2xl font-bold text-gray-300 mb-3">
//               No listings yet
//             </h2>

//             <p className="text-gray-500 mb-8">
//               You haven't added any rooms yet.
//             </p>

//             <button
//               onClick={() => router.push("/add-room")}
//               className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-xl transition"
//             >
//               Add a Room
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

//             {rooms.map((room) => (
//               <div
//                 key={room._id}
//                 className="bg-[#1a1c1e] border border-[#333537] rounded-3xl overflow-hidden hover:border-yellow-400/40 transition"
//               >

//                 {/* IMAGE */}
//                 <div className="relative h-52 overflow-hidden">
//                   <img
//                     src={room.image}
//                     alt={room.roomName}
//                     className="w-full h-full object-cover"
//                   />

//                   <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
//                     ${room.hourlyRate}/hr
//                   </div>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-6">

//                   <h2 className="text-xl font-bold mb-2 truncate">
//                     {room.roomName}
//                   </h2>

//                   <p className="text-gray-500 text-sm mb-2">
//                     📍 {room.floor} · 👥 {room.capacity} people
//                   </p>

//                   <p className="text-gray-400 text-sm mb-5 line-clamp-2">
//                     {room.description}
//                   </p>

//                   <div className="flex items-center justify-between mb-5 text-sm text-gray-400">
//                     <span>
//                       📚 {room.bookingCount || 0} bookings
//                     </span>

//                     <span>
//                       {room.amenities?.length || 0} amenities
//                     </span>
//                   </div>

//                   {/* ACTION BUTTONS */}
//                   <div className="flex gap-3">

//                     {/* EDIT */}
//                     <button
//                       onClick={() => setEditingRoom(room)}
//                       className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-xl transition text-sm"
//                     >
//                       ✏️ Edit
//                     </button>

//                     {/* DELETE */}
//                     <button
//                       onClick={() => handleDelete(room)}
//                       className="flex-1 bg-red-500/10 hover:bg-red-500 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-white font-bold py-3 rounded-xl transition text-sm"
//                     >
//                       🗑️ Delete
//                     </button>

//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* EDIT MODAL */}
//       {editingRoom && (
//         <EditRoomModal
//           room={editingRoom}
//           onClose={() => setEditingRoom(null)}
//           onUpdated={() => {
//             setEditingRoom(null);
//             fetchMyRooms();
//           }}
//         />
//       )}
//     </div>
//   );
// }