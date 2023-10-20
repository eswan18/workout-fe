"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";

export default function AlreadyLoggedInMessage() {
  const initiateSignOut = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <p>You are already logged in.</p>
      <div className="flex flex-col items-center gap-1">
        <p>If you want to create a new user, log out first.</p>
        <Button onClick={initiateSignOut} variant='outline' size='lg' className="flex flex-row gap-2">
          <p>Sign out</p>
          <LogOut />
        </Button>
      </div>
    </div>
  );
}
