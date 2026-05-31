"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // INPUT CHANGE
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

    const validationError = validatePassword(form.password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      setLoading(true);

      // ✅ FIXED: better-auth { data, error } return করে, .json() না
      const { data, error } = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.image,
      });

      if (error) {
        toast.error(error.message || "Signup failed");
        return;
      }

      toast.success("Registration successful!");
      router.push("/login");

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1412] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1c211e] p-8 rounded-2xl border border-yellow-500/20">

        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 outline-none"
          />

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

          {/* IMAGE */}
          <input
            type="text"
            name="image"
            placeholder="Photo URL (optional)"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 outline-none"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black text-white border border-gray-700 outline-none"
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-lg font-bold transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}