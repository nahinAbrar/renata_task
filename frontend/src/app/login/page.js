"use client";

import MagicBorderButton from "@/components/MagicBorderButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fakeUsers = [
  { username: "admin", password: "admin123", role: "Admin" },
  { username: "sales", password: "sales123", role: "SalesRep" },
];

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ user: "", pass: "" });
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const found = fakeUsers.find(
      u => u.username === form.user && u.password === form.pass
    );
    if (found) {
      // store role in sessionStorage and redirect
      sessionStorage.setItem("realRole", found.role);
      sessionStorage.setItem("role", found.role);
      sessionStorage.setItem("username", found.username);
      router.push("/dashboard/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <h1 className="text-4xl font-bold mb-6">Task 2</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-slate-400 rounded-xl shadow-md space-y-4 w-80"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <div className="text-red-600">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded-xl"
          value={form.user}
          onChange={e => setForm({ ...form, user: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-xl"
          value={form.pass}
          onChange={e => setForm({ ...form, pass: e.target.value })}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-300 hover:text-black text-white rounded"
        >
          Login
        </button>
      </form>

      <div className="mt-6 flex gap-2">
        <Link href="/task1">
          <MagicBorderButton>
            Task 1
          </MagicBorderButton>
        </Link>

        <Link href="/">
          <MagicBorderButton>
            Home
          </MagicBorderButton>
        </Link>
      </div>
    </div>
  );
}
