import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  let evt;

  try {
    evt = await verifyWebhook(req);
  } catch (err) {
    console.error("Clerk webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const eventType = evt.type;

  try {
    await dbConnect();

    if (eventType === "user.created" || eventType === "user.updated") {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
        image_url,
      } = evt.data as {
        id: string;
        email_addresses: { email_address: string; id: string }[];
        first_name: string | null;
        last_name: string | null;
        image_url: string;
      };

      const primaryEmail = email_addresses[0]?.email_address ?? "";

      await User.findOneAndUpdate(
        { clerkId: id },
        {
          clerkId: id,
          email: primaryEmail,
          firstName: first_name ?? "",
          lastName: last_name ?? "",
          imageUrl: image_url ?? "",
          isDeleted: false,
          deletedAt: undefined,
        },
        { upsert: true, new: true }
      );

      console.log(`[clerk-webhook] ${eventType}: synced user ${id} (${primaryEmail})`);
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data as { id: string };

      await User.findOneAndUpdate(
        { clerkId: id },
        { isDeleted: true, deletedAt: new Date() }
      );

      console.log(`[clerk-webhook] user.deleted: soft-deleted user ${id}`);
    }
  } catch (error) {
    console.error(`[clerk-webhook] Failed to process ${eventType}:`, error);
    // Return 500 so Clerk retries the webhook
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
