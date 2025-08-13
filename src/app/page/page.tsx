"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function CreateConfessionPage() {
  const { user, isSignedIn } = useUser();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState(user?.firstName || "");
  const [avatar, setAvatar] = useState(user?.imageUrl || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/c/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        username,
        displayName,
        avatar,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(
        `Your confession page is created! URL: letsyapp.fun/u/${username}`
      );
    } else {
      setMessage(`Error: ${data.error}`);
    }
  };

  if (!isSignedIn) return <p>Please sign in to create your page.</p>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white text-black shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Create Your Confession Page</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Username (for URL):
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            required
            className="border p-2 w-full rounded"
            placeholder="e.g. cooluser"
          />
        </label>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="border p-2 w-full rounded"
            placeholder="Your display name"
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Optional"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Page
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
