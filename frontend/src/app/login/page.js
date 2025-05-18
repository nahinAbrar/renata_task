// src/app/login/page.js
"use client";

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
      sessionStorage.setItem("role", found.role);
      router.push("/dashboard/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md space-y-4 w-80"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <div className="text-red-600">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={form.user}
          onChange={e => setForm({ ...form, user: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={form.pass}
          onChange={e => setForm({ ...form, pass: e.target.value })}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
