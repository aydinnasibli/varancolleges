import { auth, currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

/**
 * Belt-and-suspenders guard: called on every authenticated page load.
 * Fast path: user already exists in DB → single cheap findOne, done.
 * Slow path: user missing → fetch from Clerk API and upsert.
 * Errors are swallowed so a DB blip never breaks the page render.
 */
export async function ensureUserInDb(): Promise<void> {
  try {
    const { userId } = await auth();
    if (!userId) return;

    await dbConnect();

    const existing = await User.findOne({ clerkId: userId, isDeleted: false })
      .select("_id")
      .lean();

    if (existing) return;

    // User missing from DB — fetch full profile from Clerk and upsert
    const clerkUser = await currentUser();
    if (!clerkUser) return;

    const email = clerkUser.primaryEmailAddress?.emailAddress ?? "";

    await User.findOneAndUpdate(
      { clerkId: userId },
      {
        clerkId: userId,
        email,
        firstName: clerkUser.firstName ?? "",
        lastName: clerkUser.lastName ?? "",
        imageUrl: clerkUser.imageUrl ?? "",
        isDeleted: false,
        deletedAt: undefined,
      },
      { upsert: true, new: true }
    );
  } catch {
    // Never let a sync failure crash the page
  }
}
