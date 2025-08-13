import {
  UserProfile,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";

export default function ProfilePage() {
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
