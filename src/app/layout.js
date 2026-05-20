import "./globals.css";

import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    default: "StudyNook",
    template: "%s | StudyNook",
  },

  description:
    "Premium library study room booking platform for students, researchers, and professionals.",

  keywords: [
    "Study Room Booking",
    "Library Booking",
    "StudyNook",
    "Next.js",
    "Room Reservation",
    "Student Workspace",
  ],

  authors: [
    {
      name: "StudyNook Team",
    },
  ],

  creator: "StudyNook",

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="dark scroll-smooth"
      suppressHydrationWarning
    >
      <body className="bg-[#0f1412] text-[#dfe4e0] antialiased">

        {/* APP CONTENT */}
        <main>
          {children}
        </main>

        {/* TOAST */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,

            style: {
              background: "#1c211e",
              color: "#dfe4e0",
              border:
                "1px solid rgba(255, 193, 7, 0.2)",
              padding: "16px",
              borderRadius: "14px",
            },

            success: {
              iconTheme: {
                primary: "#facc15",
                secondary: "#0f1412",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#0f1412",
              },
            },
          }}
        />

      </body>
    </html>
  );
}