"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // PASSWORD VALIDATION
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain one lowercase letter";
    }

    return "";
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();

    const validationError = validatePassword(
      form.password
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(
          "Registration successful! Please login."
        );

        router.push("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE REGISTER
  const handleGoogleRegister = () => {
    toast.success("Google Login Coming Soon");
  };

  return (
    <div className="min-h-screen bg-[#0f1412] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#1c211e] p-8 rounded-2xl border border-yellow-500/20">

        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700"
          />

          <input
            type="text"
            name="photo"
            required
            placeholder="Photo URL"
            value={form.photo}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700"
          />

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700"
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-bold"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 border border-yellow-500 text-yellow-400 py-3 rounded-lg"
        >
          signup with Google
        </button>

        {/* LOGIN */}
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}

          <Link
            href="/login"
            className="text-yellow-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}