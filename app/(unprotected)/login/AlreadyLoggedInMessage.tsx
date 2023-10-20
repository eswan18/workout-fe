"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, LogOut } from "lucide-react";
import Link from "next/link";

export default function AlreadyLoggedInMessage() {
  const initiateSignOut = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <p>You are already logged in.</p>
      <Link href="/dashboard">
        <Button className="flex flex-row justify-center gap-2">
          <p>Proceed to Dashboard</p>
          <ArrowRightCircle />
        </Button>
      </Link>
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm">or</p>
        <Button onClick={initiateSignOut} variant='outline' className="flex flex-row justify-center gap-2">
          Sign Out <LogOut size={18} />
        </Button>
      </div>
    </div>
  );
}
