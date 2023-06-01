import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const user = await getCurrentUser();
  if (!user) {
    return redirect('/login');
  }

  return children;
}