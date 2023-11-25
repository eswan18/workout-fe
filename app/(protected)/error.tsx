"use client";

import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { toast } = useToast();
  // Checking the contents of this string seems like a hack, but since server errors
  // are serialized I don't think there's any other way to capture data about error
  // type.
  if (error.message.includes("Could not validate credentials")) {
    toast({
      title: "You've been logged out",
      description: "Redirecting to login page.",
    });
    signOut().then(() => redirect("/login"));
  }

  return (
    <div className="m-16">
      <h1 className="text-4xl">Error</h1>
      <div className="my-8">
      <p className="">Something went wrong!</p>
        <div className="m-4 p-4 border border-muted-foreground">
          <pre><code>{error.message}</code></pre>
        </div>
      </div>
    </div>
  );
}
