"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

type Confession = { text: string; createdAt: string };
type ConfessionPageType = {
  username: string;
  displayName: string;
  avatar?: string;
  totalConfessions: number;
  confessions: Confession[];
};

export default function UserConfessionPage() {
  const params = useParams();
  const username = params.username;
  const [page, setPage] = useState<ConfessionPageType | null>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!username) return;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/c/${username}`)
      .then((res) => res.json())
      .then((data) => setPage(data))
      .catch((err) => console.error(err));
  }, [username]);

  if (!page)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-black px-4 py-28 flex flex-col items-center">
      {/* Page width ~80% */}
      <div className="w-full max-w-[80%] flex flex-col gap-8">
        {/* Top profile section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6 rounded-3xl border border-gray-300 shadow-sm">
          <Image
            src={page.avatar || "/default-avatar.png"}
            alt="avatar"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-400"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{page.displayName}</h1>
            <p className="text-gray-600">@{page.username}</p>
            <p className="text-gray-500">{page.totalConfessions} confessions</p>
          </div>
        </div>

        {/* Submit confession button */}
        <div className="flex justify-center sm:justify-start">
          <button
            onClick={() => router.push(`/c/${username}/confess`)}
            className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold hover:bg-gray-800 transition shadow-sm"
          >
            Submit an Anonymous Confession
          </button>
        </div>

        {/* Confessions grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
            Confessions
          </h2>
          {page.confessions.length === 0 ? (
            <p className="text-gray-500 text-center">No confessions yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.confessions.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-4 rounded-2xl border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    setExpandedIdx(expandedIdx === idx ? null : idx)
                  }
                >
                  {expandedIdx === idx ? (
                    <div>
                      <p className="break-words">{c.text}</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <p>
                      {c.text.slice(0, 120)}
                      {c.text.length > 120 ? "..." : ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
