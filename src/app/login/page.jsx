"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return toast.error(data.message);
      }

      toast.success("Login successful");

      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-10 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-4xl font-bold mb-8 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl mb-4 bg-slate-800"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl mb-6 bg-slate-800"
          required
        />

        <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold">
          Login
        </button>
      </form>
    </div>
  );
}