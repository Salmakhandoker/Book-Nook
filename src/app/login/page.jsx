"use client";

import { authClient } from "@/lib/auth-client";
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

  // INPUT HANDLER
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ FIXED: better-auth { data, error } return করে, .json() না
      const { data, error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });

      if (error) {
        toast.error(error.message || "Login failed");
        return;
      }

      toast.success("Login successful!");
      router.push("/");

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.log(err);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1412] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1c211e] p-8 rounded-2xl border border-yellow-500/20">

        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 outline-none"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 outline-none"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-bold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 border border-yellow-500 text-yellow-400 py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition"
        >
          Sign in with Google
        </button>

        {/* REGISTER LINK */}
        <p className="text-gray-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-yellow-400 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}