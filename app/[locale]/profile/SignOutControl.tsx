"use client";

import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

// Clerk v7 (Core 3) removed sign-out redirect props from <UserButton>, but
// <SignOutButton redirectUrl> is still supported and wins over the provider's
// afterSignOutUrl.
export default function SignOutControl({ label }: { label: string }) {
  return (
    <SignOutButton redirectUrl="/">
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-red-600 border border-border hover:border-red-300 px-4 py-2 rounded-xl transition-colors cursor-pointer"
      >
        <LogOut className="h-4 w-4" />
        {label}
      </button>
    </SignOutButton>
  );
}
