"use client";

import { useEffect, useState } from "react";

export default function StatusPage() {
  const [status, setStatus] = useState<null | "online" | "offline">(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("https://api.letsyapp.fun");
        if (res.ok) {
          const data = await res.json();
          setStatus(data.status || "online");
        } else {
          setStatus("offline");
        }
      } catch {
        setStatus("offline");
      }
      setLoading(false);
    }
    fetchStatus();

    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full p-6 rounded-2xl bg-white border border-gray-200 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">API Status</h1>

        {loading ? (
          <p className="text-center text-gray-500">Checking status...</p>
        ) : (
          <div
            className={`p-4 rounded-xl text-center font-semibold text-lg transition-all duration-300 ${
              status === "online"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            {status === "online" ? "Online" : "Offline"}
          </div>
        )}
      </div>
    </div>
  );
}
