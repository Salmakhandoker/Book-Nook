"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/signin",
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
        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        toast.success("Login successful");

        router.push("/");
      } else {
        toast.error(
          data.message || "Invalid email or password"
        );
      }
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = () => {
    toast.success("Google Login Coming Soon");
  };

  return (
    <div className="min-h-screen bg-[#0f1412] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-[#1c211e] p-8 rounded-2xl border border-yellow-500/20">

        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

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
            type="password"
            name="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-bold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 border border-yellow-500 text-yellow-400 py-3 rounded-lg"
        >
          Continue with Google
        </button>

        {/* REGISTER */}
        <p className="text-gray-400 text-center mt-6">
          Don&apos;t have an account?{" "}

          <Link
            href="/register"
            className="text-yellow-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}