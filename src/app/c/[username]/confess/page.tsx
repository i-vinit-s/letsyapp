"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type PageInfo = {
  displayName: string;
  avatar?: string;
  username: string;
};

export default function SubmitConfession() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;

  const [confessionText, setConfessionText] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch page info (avatar, displayName)
  useEffect(() => {
    const fetchPageInfo = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/c/${username}`
        );
        if (!res.ok) throw new Error("Failed to load page");
        const data = await res.json();
        setPageInfo(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (username) fetchPageInfo();
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confessionText) return;
    setLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/c/${username}/confess`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: confessionText }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      setMessage({
        type: "success",
        text: "Your confession has been submitted anonymously!",
      });
      setConfessionText("");
    } else {
      setMessage({
        type: "error",
        text: data.error || "Something went wrong.",
      });
    }

    setLoading(false);
  };

  const handleNewConfession = () => {
    setMessage(null);
    setConfessionText("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-10">
      <div className="max-w-xl w-full p-8 border border-gray-200 rounded-xl shadow-md">
        {/* Profile Info */}
        {pageInfo && (
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={pageInfo.avatar || "/default-avatar.png"}
              alt={pageInfo.displayName}
              width={60}
              height={60}
              className="rounded-full border"
            />
            <div>
              <h2 className="text-xl font-bold text-black">
                {pageInfo.displayName}
              </h2>
              <p className="text-gray-600">@{pageInfo.username}</p>
            </div>
          </div>
        )}

        {!message ? (
          <>
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

              <Button
                type="submit"
                className="bg-black text-white p-3 rounded-lg hover:bg-gray-900 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />{" "}
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </>
        ) : (
          <>
            {/* Alert */}
            <div className="mt-4">
              <Alert
                className={`flex items-start gap-2 ${
                  message.type === "success"
                    ? "bg-green-100 border-green-300 text-green-800"
                    : "bg-red-100 border-red-300 text-red-800"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 mt-1 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 mt-1 text-red-600" />
                )}
                <div>
                  <AlertTitle>
                    {message.type === "success" ? "Success" : "Error"}
                  </AlertTitle>
                  <AlertDescription>{message.text}</AlertDescription>
                </div>
              </Alert>
            </div>

            {/* Actions after submission */}
            <div className="flex gap-4 mt-6">
              <Button
                className="bg-black text-white hover:bg-gray-900"
                // variant="outline"
                onClick={handleNewConfession}
              >
                Submit Another
              </Button>
              <Button
                className="bg-black text-white hover:bg-gray-900"
                onClick={() => router.push(`/c/${username}`)}
              >
                See All Confessions
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
