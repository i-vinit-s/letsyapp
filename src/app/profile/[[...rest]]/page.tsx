"use client"
import {
  UserProfile,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/nextjs";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      // Send user data to backend
      fetch(`${process.env.BACKEND_URL || "http://localhost:5000"}/auth/clerk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUser: {
            id: user.id,
            username: user.username,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.emailAddresses[0]?.emailAddress,
            image_url: user.imageUrl,
            last_sign_in_at: user.lastSignInAt,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("User synced:", data))
        .catch((err) => console.error("Error syncing user:", err));
    }
  }, [isSignedIn, user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-28">
      <SignedIn>
        <UserProfile
          appearance={{
            elements: {
              rootBox: "max-w-2xl",
              card: "shadow-lg border border-gray-200 rounded-xl",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
