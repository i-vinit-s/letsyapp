"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

type ConfessionPageType = {
  userId: string;
  username: string;
  displayName: string;
  avatar?: string;
};

export default function CreateConfessionPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [page, setPage] = useState<ConfessionPageType | null>(null);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch existing confession page for logged-in user
  useEffect(() => {
    const fetchPage = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/c/page/${user.id}`
        );
        if (res.ok) {
          const data = await res.json();
          setPage(data);
        }
      } catch (err) {
        console.error("No existing confession page found.", err);
      }
    };

    fetchPage();
  }, [user?.id]);

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <p>Please log in to create your confession page.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!username.trim() || !displayName.trim()) {
      setError("Username and display name are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/c/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          username: username.trim().toLowerCase(),
          displayName: displayName.trim(),
          avatar: avatar.trim() || user.imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      router.push(`/c/${username.trim().toLowerCase()}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ If user already has a page, show info instead of form
  if (page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-md border border-gray-200 bg-gray-50 text-center">
          <Image
            src={page.avatar || "/default-avatar.png"}
            alt={page.displayName || "User avatar"}
            width={80}
            height={80}
            className="mx-auto rounded-full border mb-4"
          />
          <h1 className="text-2xl font-bold">{page.displayName}</h1>
          <p className="text-gray-600">@{page.username}</p>
          <button
            onClick={() => router.push(`/c/${page.username}`)}
            className="bg-black text-white py-3 px-6 rounded-2xl font-semibold hover:bg-gray-800 transition mt-6"
          >
            View Your Confession Page
          </button>
        </div>
      </div>
    );
  }

  // ✅ Otherwise show create form
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-md border border-gray-200 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Confession Page
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 mb-1">
              Username (URL slug)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. john_doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">
              Avatar URL (optional)
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="Leave empty to use your profile image"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition mt-2"
          >
            {loading ? "Saving..." : "Create Page"}
          </button>
        </form>
      </div>
    </div>
  );
}
