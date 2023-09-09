"use client";

import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // Checking the contents of this string seemsl like a hack, but since server errors
  // are serialized I don't think there's any other way to capture data about error
  // type.
  if (error.message.includes("Could not validate credentials")) {
    toast.error("You've been logged out... redirecting to login page.");
    signOut().then(() => redirect("/login"));
  }

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
