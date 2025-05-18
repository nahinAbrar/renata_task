// src/app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Renata PLC Frontend Task</h1>
      <div className="space-x-4">
        <Link href="/task1">
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            Task 1
          </button>
        </Link>
        <Link href="/login">
          <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
            Task 2
          </button>
        </Link>
      </div>
    </div>
  );
}
