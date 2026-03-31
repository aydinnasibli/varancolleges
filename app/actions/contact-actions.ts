"use server";

import connectToDatabase from "@/lib/db";
import Contact from "@/models/Contact";
import { revalidatePath } from "next/cache";

export async function getInquiries() {
  try {
    await connectToDatabase();

    // Fetch all inquiries sorted by newest first
    const inquiries = await Contact.find({}).sort({ createdAt: -1 }).lean();

    // Convert ObjectIds to strings and format dates for Client Components
    return {
      success: true,
      inquiries: inquiries.map(inquiry => ({
        _id: inquiry._id.toString(),
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message,
        isRead: inquiry.isRead || false,
        createdAt: inquiry.createdAt.toISOString()
      }))
    };
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return { success: false, error: "Failed to fetch inquiries" };
  }
}

export async function markInquiryAsRead(id: string) {
  try {
    await connectToDatabase();

    const updated = await Contact.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return { success: false, error: "Inquiry not found" };
    }

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error marking inquiry as read:", error);
    return { success: false, error: "Failed to mark as read" };
  }
}

export async function getUnreadInquiriesCount() {
  try {
    await connectToDatabase();
    const count = await Contact.countDocuments({ isRead: false });
    return count;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return 0;
  }
}
