// import { NextResponse } from 'next/server'

 
// // This function can be marked `async` if using `await` inside
// export async function proxy(request) {
//     const session = await auth.api.getsession({
//         headers: await header ()
//     })

//     if (!session) {
    

//   return NextResponse.redirect(new URL('/login', request.url))
// }
// }
 
// export const config = {
//   matcher: ['/my-bookings','/add-room','/rooms/:path'],
// }
const API_BASE = "/api/proxy";

/* =========================
CORE REQUEST HANDLER
========================= */
async function request(url, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Request failed",
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

/* =========================
ROOMS API
========================= */

// GET ALL ROOMS (search + filter supported)
export const getRooms = (query = "") =>
  request(`/api/rooms${query ? `?${query}` : ""}`);

// GET SINGLE ROOM
export const getRoomById = (id) =>
  request(`/api/rooms/${id}`);

// CREATE ROOM
export const createRoom = (data) =>
  request("/api/rooms", {
    method: "POST",
    body: data,
  });

// UPDATE ROOM
export const updateRoom = (id, data) =>
  request(`/api/rooms/${id}`, {
    method: "PATCH",
    body: data,
  });

// DELETE ROOM
export const deleteRoom = (id, userEmail) =>
  request(`/api/rooms/${id}`, {
    method: "DELETE",
    body: { userEmail },
  });

/* =========================
BOOKINGS API
========================= */

// CREATE BOOKING
export const createBooking = (data) =>
  request("/api/bookings", {
    method: "POST",
    body: data,
  });

// MY BOOKINGS
export const getMyBookings = (email) =>
  request(`/api/bookings/my/${email}`);

// CANCEL BOOKING
export const cancelBooking = (id) =>
  request(`/api/bookings/${id}/cancel`, {
    method: "PATCH",
  });