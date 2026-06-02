# 📚 StudyNook – Library Study Room Booking

> **Find Your Perfect Study Room** — Browse and book quiet, private study rooms in your library. List your own room and earn.

🌐 **Live Site:** [https://your-live-site-url.vercel.app](https://your-live-site-url.vercel.app)

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Email/password and Google OAuth login with session management via Better Auth. Fully protected private routes that persist on page reload.
- 🏫 **Room Listings & Management** — Any registered user can list, edit, and delete their own study rooms with details like floor, capacity, hourly rate, and amenities.
- 📅 **Smart Booking System** — Book rooms by selecting date and time slots with real-time cost calculation. Automatic conflict detection prevents double-bookings.
- 🔍 **Search & Filter** — Search rooms by name and filter by amenities (Whiteboard, Projector, Wi-Fi, etc.) on the All Rooms page for a seamless browsing experience.
- 📋 **Personal Dashboard** — Every user gets a My Bookings page to view, track, and cancel their bookings, and a My Listings page to manage their own rooms.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | React framework |
| Tailwind CSS | Styling & responsiveness |
| Better Auth | Authentication (client) |
| React Hot Toast | Toast notifications |
| Axios | API requests |

### Backend
| Technology | Purpose |
|---|---|
| Next.js API Routes | Server-side API |
| MongoDB (Atlas) | Database |
| Better Auth | Authentication (server) |
| Mongoose | ODM for MongoDB |

---

## 📄 Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page with hero & latest 6 rooms |
| `/rooms` | Public | All rooms with search & filter |
| `/rooms/:id` | Public | Room details & booking |
| `/login` | Public | Email/Google login |
| `/register` | Public | User registration |
| `/add-room` | Private | Add a new room listing |
| `/my-listings` | Private | Manage your own rooms |
| `/my-bookings` | Private | View & cancel your bookings |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google OAuth credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/studynook-client.git

# Go into the project directory
cd studynook-client

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
studynook/
├── app/
│   ├── (public)/
│   │   ├── page.jsx          # Home
│   │   ├── rooms/            # All Rooms & Room Details
│   │   ├── login/            # Login Page
│   │   └── register/         # Register Page
│   ├── (private)/
│   │   ├── add-room/         # Add Room
│   │   ├── my-listings/      # My Listings
│   │   └── my-bookings/      # My Bookings
│   └── api/
│       ├── auth/             # Better Auth API
│       ├── rooms/            # Rooms CRUD API
│       └── bookings/         # Bookings API
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── RoomCard.jsx
│   └── BookingModal.jsx
├── lib/
│   ├── auth.js               # Better Auth config
│   ├── auth-client.js        # Better Auth client
│   └── dbConnect.js          # MongoDB connection
└── models/
    ├── Room.js
    └── Booking.js
```

---

## 🎯 Core Functionalities

### 🔐 Authentication
- Email & password registration with validation (min 6 chars, uppercase, lowercase)
- Google OAuth one-click login
- Protected routes redirect unauthenticated users to login
- Logged-in users stay authenticated on page reload

### 🏫 Room Management (CRUD)
- **Create** — Add rooms with name, description, image, floor, capacity, hourly rate & amenities
- **Read** — Browse all rooms or view full details of a specific room
- **Update** — Edit your own room listings
- **Delete** — Remove your own rooms with confirmation modal

### 📅 Booking System
- Date picker (today or future dates only)
- Hourly time slot selection (08:00 – 20:00)
- Real-time total cost calculation
- Server-side conflict detection prevents overlapping bookings
- Cancel confirmed future bookings anytime

---

## 📱 Responsive Design

Fully responsive across all devices:
- 📱 **Mobile** — 1 column grid layout
- 📟 **Tablet** — 2 column grid layout
- 🖥️ **Desktop** — 3 column grid layout

---

## 📦 NPM Packages Used

```json
{
  "better-auth": "^1.x",
  "mongoose": "^8.x",
  "react-hot-toast": "^2.x",
  "axios": "^1.x",
  "tailwindcss": "^3.x"
}
```

---

## 🌐 Deployment

- **Frontend + Backend:** [Vercel](https://vercel.com)
- **Database:** [MongoDB Atlas](https://mongodb.com/atlas)

---

## 👨‍💻 Author

**Your Name**
- GitHub: [Salmakhandoker](https://github.com/salmakhandoker)
- Email: Salmakhandoker001@email.com

---

## 📝 License

This project is for educational purposes as part of an assignment (CAT_12).

---

<p align="center">Made with ❤️ for StudyNook – CAT_12 Assignment</p>