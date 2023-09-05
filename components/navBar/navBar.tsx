import Link from "next/link";
import NavBarRight from "./navBarRight";
import { getCurrentUser } from "@/lib/session";
import Logo from "../branding/Logo";

export default async function NavBar() {
  const user = await getCurrentUser();
  const userEmail = user?.email as string | undefined;
  return SyncNavBar({ userEmail });
}

function NavBarLeft() {
  return (
    <Link
      href="/"
      className="flex flex-row justify-start items-center text-sm lg:text-lg px-2 lg:px-3"
    >
      <Logo />
    </Link>
  );
}

// This synchronous version is used for Storybook.
export function SyncNavBar({ userEmail }: { userEmail: String | undefined }) {
  return (
    <div className="flex flex-row justify-between bg-white dark:bg-gray-950 text-gray-800 border-b-[1px] border-gray-300 dark:border-0 h-12 sm:h-14">
      <NavBarLeft />
      <NavBarRight userEmail={userEmail} />
    </div>
  );
}
