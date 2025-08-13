import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return Response.json({ error: "Not signed in" }, { status: 401 });
    }

    await connectDB();

    await User.findOneAndUpdate(
      { clerkId: clerkUser.id },
      {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        avatarUrl: clerkUser.imageUrl,
      },
      { upsert: true, new: true }
    );

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Unexpected error", details: err }, { status: 500 });
  }
}
