import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-[#2b332e] bg-[#0f1412] text-[#dfe4e0] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        {/* LOGO + DESCRIPTION */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            StudyNook
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Premium library study room booking platform for
            students, researchers, and professionals.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Useful Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">
            <Link
              href="/"
              className="hover:text-yellow-400 transition"
            >
              Home
            </Link>

            <Link
              href="/rooms"
              className="hover:text-yellow-400 transition"
            >
              Rooms
            </Link>

            <Link
              href="/about"
              className="hover:text-yellow-400 transition"
            >
              About
            </Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">
            <p>Email: support@studynook.com</p>
            <p>Phone: +880 1234-567890</p>
            <p>Location: Chattogram, Bangladesh</p>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-[#2b332e] flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-[#2b332e] flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
            >
              <FaXTwitter />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-[#2b332e] flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full border border-[#2b332e] flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#2b332e] py-5 text-center text-sm text-gray-500">
        © 2026 StudyNook — All Rights Reserved
      </div>
    </footer>
  );
}