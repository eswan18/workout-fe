import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const user = await getCurrentUser();
  if (!user) {
    console.log("User is not logged in. Redirecting to login page.");
    // In the long run, it would be nice for this to return the user to the specific page they requested.
    redirect("api/auth/signin?callbackUrl=/dashboard");
  }

  return <>{children}</>;
}
