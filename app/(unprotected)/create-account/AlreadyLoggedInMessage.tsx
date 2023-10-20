"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AlreadyLoggedInMessage() {
  const initiateSignOut = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <div className="m-3">
        <p>
          You are already logged in. Log out first if you wish to create a new
          user.
        </p>
      </div>
      <Button onClick={initiateSignOut}>
        Sign Out
      </Button>
    </>
  );
}
