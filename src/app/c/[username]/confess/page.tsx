"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function SubmitConfession() {
  const params = useParams();
  const username = params.username;
  const [confessionText, setConfessionText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confessionText) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/c/${username}/confess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: confessionText }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Confession submitted!");
      setConfessionText("");
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full p-8 border border-gray-200 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">
          Share Your Truth
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Write your anonymous confession and let your voice be heard.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={confessionText}
            onChange={(e) => setConfessionText(e.target.value)}
            placeholder="Type your anonymous confession here..."
            className="border border-gray-300 rounded-lg p-3 w-full text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
            rows={6}
            required
          />

          <button
            type="submit"
            className="bg-black text-white p-3 rounded-lg hover:bg-gray-900 transition"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="text-green-600 mt-4 text-center font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
