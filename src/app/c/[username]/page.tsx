"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { X, Trash, Upload } from "lucide-react";

type Confession = { _id: string; text: string; createdAt: string };

type ConfessionPageType = {
  userId: string;
  username: string;
  displayName: string;
  avatar?: string;
  totalConfessions: number;
  confessions: Confession[];
};

export default function UserConfessionPage() {
  const { user } = useUser();
  const params = useParams();
  const router = useRouter();

  const [page, setPage] = useState<ConfessionPageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    avatar: "",
  });

  const [selectedConfession, setSelectedConfession] =
    useState<Confession | null>(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!params?.username) return;

    const fetchPage = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/c/${params.username}`
        );
        if (!res.ok) throw new Error("Failed to fetch page");
        const data = await res.json();

        data.confessions.sort(
          (a: Confession, b: Confession) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPage(data);
        setForm({
          displayName: data.displayName,
          username: data.username,
          avatar: data.avatar || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [params?.username]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!page) {
    return <p className="text-center mt-10 text-gray-500">Page not found</p>;
  }

  const handleSendConfession = () => {
    router.push(`/c/${params.username}/confess`);
  };

  const isOwner = user?.id === page.userId;

  const handleSave = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/c/${params.username}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?.id,
            displayName: form.displayName,
            username: form.username,
            avatar: form.avatar,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update profile");
      }

      const data = await res.json();
      setPage(data);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  // ---- Handle avatar upload ----
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/c/${params.username}/avatar`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      setForm((prev) => ({ ...prev, avatar: data.url })); // update form with new Cloudinary URL
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Avatar upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteConfession = async (confession: Confession) => {
    if (!isOwner) return;
    if (
      !confirm(
        `Are you sure you want to delete this confession?`
      )
    )
      return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/c/${params.username}/${confession._id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete confession");

      setPage((prev) =>
        prev
          ? {
              ...prev,
              confessions: prev.confessions.filter(
                (c) => c._id !== confession._id
              ),
              totalConfessions: Math.max(prev.totalConfessions - 1, 0),
            }
          : prev
      );

      setSelectedConfession(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete confession");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 py-28">
      {/* Profile Section */}
      <div className="w-full max-w-2xl bg-white border rounded-xl p-6 shadow-md border-black">
        <div className="flex items-center gap-4">
          <Image
            src={form.avatar || page.avatar || "/default-avatar.png"}
            alt={page.displayName}
            width={64}
            height={64}
            className="rounded-full border"
          />

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                {/* Display Name Input */}
                <input
                  className="block w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none border-black"
                  value={form.displayName}
                  onChange={(e) =>
                    setForm({ ...form, displayName: e.target.value })
                  }
                  placeholder="Display name"
                />

                {/* Username Input */}
                <input
                  className="block w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none border-black"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  placeholder="Username"
                />

                {/* Avatar Upload */}
                <label
                  className={`flex items-center justify-center gap-2 w-full px-4 py-2 border rounded-lg cursor-pointer text-sm font-medium transition ${
                    uploading
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {uploading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 
                0 0 5.373 0 12h4zm2 
                5.291A7.962 7.962 0 014 12H0c0 
                3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Avatar
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
            ) : (
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">
                  {page.displayName}
                </h1>
                <p className="text-sm md:text-base text-gray-500">
                  @{page.username}
                </p>
                <p className="text-sm text-gray-600">
                  {page.totalConfessions} confessions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          {isOwner &&
            (isEditing ? (
              <>
                <button
                  className="flex-1 px-4 py-2 border border-black rounded-md text-gray-800 hover:bg-black hover:text-white transition-all"
                  onClick={handleSave}
                  disabled={uploading}
                >
                  Save
                </button>
                <button
                  className="flex-1 px-4 py-2 border border-black rounded-md text-gray-800 hover:bg-black hover:text-white transition-all"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({
                      displayName: page.displayName,
                      username: page.username,
                      avatar: page.avatar || "",
                    });
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="flex-1 px-4 py-2 border border-black rounded-md text-gray-800 hover:bg-black hover:text-white transition-all"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ))}
          <button
            onClick={handleSendConfession}
            className="flex-1 px-4 py-2 border border-black rounded-md text-gray-800 hover:bg-black hover:text-white transition-all"
          >
            Send Confession
          </button>
        </div>
      </div>

      {/* Confessions List */}
      <div className="mt-6 w-full max-w-2xl space-y-4">
        {page.confessions.map((conf, index) => (
          <div
            key={index}
            className="p-4 bg-white border rounded-xl shadow hover:shadow-lg cursor-pointer transition-all border-black"
            onClick={() => setSelectedConfession(conf)}
          >
            <p className="text-gray-900 whitespace-pre-wrap break-words line-clamp-3">
              {conf.text}
            </p>
            <span className="text-xs text-gray-500">
              {new Date(conf.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedConfession && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="relative bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Confession</span>
              <div className="flex items-center gap-3">
                {isOwner && (
                  <button
                    onClick={() => handleDeleteConfession(selectedConfession)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedConfession(null)}
                  className="text-gray-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-gray-900 whitespace-pre-wrap break-words leading-relaxed">
              {selectedConfession.text}
            </p>
            <span className="text-xs text-gray-500 block mt-3">
              {new Date(selectedConfession.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
